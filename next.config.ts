import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/** One next.config.ts for both deployments. Cloudflare is detected by its adapter config file, so nothing is set by hand. */
const isCloudflare = fs.existsSync(path.join(process.cwd(), "open-next.config.ts"));

/** Local development and `LOCAL_DB=1` builds use the Node libSQL client (supports `file:` databases); production uses the HTTP client. */
const localDb = process.env.LOCAL_DB === "1" || isDev;

/** Old equipment/buyer's-guide articles that were archived: Gone (410) rather than a soft 404, so search engines drop them. */
const goneArticles = ["blood-centrifuge-bkc-tl4bii", "re-2012-rotary-evaporator", "soil-compaction-tester-bk-sct750", "trinocular-inverted-microscope-bk-tim37xc"];

// Next.js injects small inline bootstrap scripts, so 'unsafe-inline' is needed unless every page is rendered
// dynamically with per-request nonces (which would defeat CDN caching). Residual risk is documented in README.md.
// Google AdSense needs its own domains. They are added only when AdSense is switched on (see src/components/ads/config.ts).
// Verify this list against Google's current AdSense documentation before switching AdSense on.
const adsense = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${adsense ? " https://pagead2.googlesyndication.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // Article images may be hosted anywhere over HTTPS (images cannot run code); nothing else is allowed off-site.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self'${adsense ? " https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net" : ""}`,
  `frame-src https://www.youtube-nocookie.com${adsense ? " https://googleads.g.doubleclick.net https://tpc.googlesyndication.com" : ""}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/**
 * Public pages are rendered from the database on request. The CDN reuses a rendering for 5 minutes and may keep serving an older one
 * for a day while it refreshes in the background, so readers still get pages when the database or the function is slow or briefly
 * unavailable, and a traffic spike costs a handful of function invocations instead of one per visit. A publish is live within ~5 minutes
 * (the Cloudflare deployment uses the same window).
 */
const publicCache = "public, max-age=0, s-maxage=300, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: { LOCAL_DB: localDb ? "1" : "0" },
  // The Cloudflare build skips the type check inside `next build` (it needs a lot of memory). Run `npm run typecheck` separately.
  typescript: { ignoreBuildErrors: isCloudflare },
  // Local database mode only: keep the Node libSQL client (and its native SQLite binding) out of the bundle.
  ...(localDb ? { serverExternalPackages: ["@libsql/client", "libsql"] } : {}),
  // The HTTP database client pulls in @libsql/isomorphic-ws. Next's file tracing copies only its Node entry, but the Cloudflare
  // bundler resolves the `workerd` entry (web.mjs), so every file of that package is included explicitly.
  outputFileTracingIncludes: { "/**": ["./node_modules/@libsql/isomorphic-ws/**/*"] },
  images: {
    unoptimized: true, // images are served as stored (article images are already resized when uploaded)
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 640, 828, 1080, 1280],
    imageSizes: [96, 160, 256, 384],
  },
  async rewrites() {
    const beforeFiles = [
      // /sitemap.xml is the sitemap INDEX (route handler at /sitemap-index.xml); the shards live at /sitemap/<id>.xml.
      { source: "/sitemap.xml", destination: "/sitemap-index.xml" },
      ...goneArticles.map((slug) => ({ source: `/articles/${slug}`, destination: "/gone" })),
      // the retired procurement catalogue's HTML sitemap and quotation endpoint: Gone, so search engines drop them
      { source: "/sitemap-html", destination: "/gone" },
      { source: "/sitemap-html/:path*", destination: "/gone" },
      { source: "/api/inquiry", destination: "/gone" },
    ];
    return { beforeFiles, afterFiles: [], fallback: [] };
  },
  async redirects() {
    return [
      { source: "/articles/category/:slug", destination: "/topics/:slug", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "vierapparatus.vercel.app" }], destination: "https://vierapparatus.com/:path*", permanent: true },
    ];
  },
  async headers() {
    const pages = ["/", "/articles", "/articles/:slug", "/topics", "/topics/:slug", "/about", "/contact", "/contribute", "/privacy", "/rss.xml"];
    // /products and /products/:slug carry visitor comments and are rendered on request; they are not given the shared CDN window
    return [
      { source: "/:path*", headers: securityHeaders },
      ...pages.map((source) => ({ source, headers: [{ key: "Cache-Control", value: publicCache }] })),
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
      { source: "/admin/:path*", headers: [{ key: "Cache-Control", value: "no-store" }, { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
    ];
  },
};

export default nextConfig;

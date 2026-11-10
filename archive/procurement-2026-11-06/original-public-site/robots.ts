import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Query-string URLs are rendered on demand (a serverless execution per crawl) and duplicate content that is
      // already available as static pages: filters/search -> /products/category/<slug>, quotation prefill -> /contact.
      disallow: ["/api/", "/products?", "/contact?"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

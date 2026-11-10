import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /admin and /api are private or machine-only; search results (?q=) are for readers, not for the index.
      disallow: ["/admin", "/api/", "/articles?q="],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

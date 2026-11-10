import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Pre-rendered pages (products, categories, articles) are read from the Worker's static assets. This cache is
// read-only, which suits this site: every page that is pre-rendered uses `revalidate = false`, so nothing needs to be
// re-generated at runtime. It needs no R2 bucket, KV namespace or other add-on service.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

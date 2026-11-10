import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Images here are WebP files the site itself produced and stores (small thumbnails in admin tables, curriculum covers);
    // next/image would add nothing (images are served as stored) and its sizing rules do not suit a table cell.
    files: ["src/components/admin/**", "src/components/modules/Cover.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  globalIgnores(["archive/**", ".next/**", ".open-next/**", ".wrangler/**", ".data/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"]),
]);

import { defineConfig } from "vitest/config";
import path from "node:path";

// TEST_WEB_CLIENT=1 runs the suite through the PRODUCTION database client (@libsql/client/web over HTTP) against the local
// stand-in server in scripts/mock-turso.mjs (start it first), one test file at a time. By default the Node client is used so a
// throw-away `file:` database works with no server.
const webClient = process.env.TEST_WEB_CLIENT === "1";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      ...(webClient ? {} : { "@libsql/client/web": "@libsql/client" }),
    },
  },
  test: { include: ["tests/**/*.test.ts"], environment: "node", testTimeout: 60000, fileParallelism: !webClient },
});

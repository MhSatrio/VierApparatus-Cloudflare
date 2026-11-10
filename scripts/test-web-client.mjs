// Runs the whole test suite through the PRODUCTION database client (@libsql/client/web over HTTP) against the local Turso
// stand-in (scripts/mock-turso.mjs), which it starts and stops itself.   npm run test:web-client
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = 8099 + Math.floor(Math.random() * 500);
const dbFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "mock-turso-")), "test.db");
const mock = spawn(process.execPath, ["--no-warnings", path.join(root, "scripts/mock-turso.mjs"), String(port), dbFile], { stdio: "ignore" });

async function waitUp() {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${port}/health`)).ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("The Turso stand-in did not start");
}

let code = 1;
try {
  await waitUp();
  const r = spawnSync(process.execPath, [path.join(root, "node_modules/vitest/vitest.mjs"), "run", ...process.argv.slice(2)], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, TEST_WEB_CLIENT: "1", MOCK_TURSO_URL: `http://127.0.0.1:${port}` },
  });
  code = r.status ?? 1;
} finally {
  mock.kill();
}
process.exit(code);

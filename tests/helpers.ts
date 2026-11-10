import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { __resetDb } from "@/lib/db/client";

/**
 * Points the app at a fresh database for one test file.
 * Default: a throw-away SQLite file (Node client). With TEST_WEB_CLIENT=1: the shared local stand-in for Turso
 * (scripts/mock-turso.mjs), wiped first, reached through the production HTTP client.
 */
export function tempDb() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vier-test-"));
  if (process.env.TEST_WEB_CLIENT === "1") {
    const base = process.env.MOCK_TURSO_URL ?? "http://127.0.0.1:8099";
    execFileSync(process.execPath, ["-e", `fetch(${JSON.stringify(base + "/__reset")}, { method: "POST" }).then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))`]);
    process.env.TURSO_DATABASE_URL = base;
  } else {
    process.env.TURSO_DATABASE_URL = `file:${path.join(dir, "test.db").replace(/\\/g, "/")}`;
  }
  process.env.AUTH_SECRET = "test-secret-test-secret-test-secret-0123456789";
  __resetDb();
  return () => {
    __resetDb();
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* Windows keeps the SQLite file locked until the worker exits; the OS temp folder is cleaned up later. */
    }
  };
}

export const PNG_1X1 = Uint8Array.from(
  atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="),
  (c) => c.charCodeAt(0),
);

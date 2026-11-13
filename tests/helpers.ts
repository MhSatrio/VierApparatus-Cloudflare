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

/** A reference used by the tests: a placeholder paper that exists nowhere, so only the test's stand-in lookup can confirm it. */
export const TEST_REFERENCE = "Placeholder Author. (2020). A reference written for this automated test only. Journal of Tests, 1(1), 1-2. https://doi.org/10.1234/test.2020.1";

/**
 * Runs the real reference check on an article or module, with a stand-in for Crossref that agrees with the reference text, so that
 * the publish tests can publish. The check itself is what is tested elsewhere (tests/refcheck.test.ts); this only supplies a pass.
 */
export async function markReferencesChecked(entity: "article" | "module", id: string, actorId: string | null = null, text = TEST_REFERENCE): Promise<void> {
  const { saveRefcheck } = await import("@/lib/store/refcheck");
  const title = text.match(/\((\d{4})[a-z]?\)\.\s*([^.]+)\./)?.[2] ?? "";
  const year = Number(text.match(/\((\d{4})/)?.[1] ?? 0);
  const work = { doi: "10.1234/test.2020.1", title, year, authors: [text.split(",")[0].trim()], container: "Journal of Tests" };
  const lookup = { byDoi: async () => work, search: async () => [work] };
  const r = await saveRefcheck(entity, id, text, actorId, lookup);
  if (r.status !== "pass") throw new Error(`test helper: the reference check did not pass: ${JSON.stringify(r.items)}`);
}

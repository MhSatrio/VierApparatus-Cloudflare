import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createClient } from "@libsql/client";
import { afterAll, describe, expect, it } from "vitest";
import { MIGRATIONS, migrate } from "@/lib/db/migrations";

/**
 * Several processes start at once (the build's prerender workers, or the first requests after a deploy). Each opens its own
 * connection and runs the migrations. Before the fix, two of them both ran "ALTER TABLE ... ADD COLUMN refs" and the second failed
 * with "duplicate column name". This test starts several connections on one file at the same moment.
 */
describe("migrations run safely from several connections at once", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vier-mig-race-"));
  const file = path.join(dir, "race.db").replace(/\\/g, "/");
  const clients = Array.from({ length: 4 }, () => createClient({ url: `file:${file}` }));
  afterAll(() => {
    for (const c of clients) c.close();
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* a locked file on Windows is cleaned up by the OS later */
    }
  });

  it("all connections finish, the schema is complete and the version is the latest", async () => {
    const results = await Promise.allSettled(clients.map((c) => migrate(c)));
    const failed = results.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason);
    expect(failed).toEqual([]);

    const v = (await clients[0].execute("SELECT value FROM meta WHERE key = 'schema_version'")).rows[0];
    expect(Number(v.value)).toBe(MIGRATIONS[MIGRATIONS.length - 1].version);
    const cols = (await clients[0].execute("PRAGMA table_info(articles)")).rows.map((r) => r.name);
    expect(cols).toContain("refs");
    expect(cols).toContain("refcheck_status");
  });

  it("running again on a finished database changes nothing", async () => {
    await expect(migrate(clients[1])).resolves.toBeUndefined();
  });
});

/* Full JSON backup of the Turso database, written to .data/backups/turso-live-full-<timestamp>.json.
 * Every table is dumped with its column list and all rows. Run it before a deploy or a live import:
 *
 *   npx tsx --env-file-if-exists=.env.local --tsconfig scripts/tsconfig.json scripts/turso-backup.ts
 *
 * Reads TURSO_DATABASE_URL and TURSO_AUTH_TOKEN from the environment (or .env.local). Writes nothing to the database.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) throw new Error("TURSO_DATABASE_URL is not set");
  const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN || undefined });
  const started = new Date().toISOString();
  const tables = await client.execute("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name");
  const dump: Record<string, { columns: string[]; rows: Record<string, unknown>[] }> = {};
  let total = 0;
  for (const row of tables.rows) {
    const name = String(row.name);
    const res = await client.execute(`SELECT * FROM "${name}"`);
    dump[name] = { columns: res.columns, rows: res.rows.map((r) => Object.fromEntries(res.columns.map((c) => [c, r[c] as unknown]))) };
    total += res.rows.length;
  }
  const dir = path.resolve(__dirname, "../.data/backups");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `turso-live-full-${started.replace(/[:.]/g, "-")}.json`);
  fs.writeFileSync(file, JSON.stringify({ takenAt: started, tables: dump }, null, 1), "utf8");
  console.log(`Backed up ${tables.rows.length} tables, ${total} rows.`);
  console.log(`Written: ${file}`);
  client.close();
}

main().catch((e) => {
  console.error("Backup failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});

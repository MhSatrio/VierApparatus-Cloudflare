/* Brings the catalogue that existed before the Product Manager (data/products.json, 10,319 records) into the database, once and
 * without loss. BIOBASE records stay published; every other record is ARCHIVED (kept, hidden, restorable in the Product Manager).
 * Old addresses are kept. Safe to run again: a record that is already imported is left exactly as it is.
 *   npm run products:legacy            (add --dry-run to count only)
 * Needs TURSO_DATABASE_URL (and TURSO_AUTH_TOKEN for a Turso database) in the environment or in .env.local.
 */
import "./_local-client";
import fs from "node:fs";
import path from "node:path";
import { dbConfigured, ensureSchema } from "../src/lib/db/client";
import { importLegacyCatalogue, type LegacyProduct } from "../src/lib/store/products";

const KEEP = "BIOBASE";

async function main() {
  const file = path.join(process.cwd(), "data", "products.json");
  const all = JSON.parse(fs.readFileSync(file, "utf8")) as LegacyProduct[];
  const keep = all.filter((p) => (p.manufacturer ?? "").trim().toLowerCase() === KEEP.toLowerCase()).length;
  console.log(`${all.length} records in data/products.json: ${keep} by ${KEEP} (stay published), ${all.length - keep} others (will be archived).`);
  if (process.argv.includes("--dry-run")) return;
  if (!dbConfigured()) {
    console.error("TURSO_DATABASE_URL is not set. Put it in .env.local or the environment, then run again.");
    process.exit(1);
  }
  await ensureSchema();
  const r = await importLegacyCatalogue(all, KEEP, (done, total) => {
    if (done % 1000 === 0 || done === total) process.stdout.write(`\r  ${done} / ${total}`);
  });
  console.log(`\nInserted ${r.inserted} (${r.published} published, ${r.archived} archived), ${r.existing} were already there, ${r.categories} categories created.`);
}

main().catch((e) => {
  console.error("Failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});

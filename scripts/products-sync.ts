/* Adds and updates products from every CSV file in the product-sync folder (see product-sync/README.md).
 *
 * Dry run (writes nothing, shows what would happen):
 *   npm run products:sync -- --target local
 *   npm run products:sync -- --target live
 * Write it:
 *   npm run products:sync -- --target local --commit
 *   npm run products:sync -- --target live --commit
 *
 * The local target is the PC copy of the database (.data/modules-local.db). The live target is the Turso database the Cloudflare
 * site reads, so a live run changes the site at once: no redeploy is needed for product data.
 *
 * Images are NOT uploaded here. A row's picture must already be a link on our R2 domain (IMAGE_PUBLIC_BASE_URL). Any other address
 * is ignored with a note, so no picture is ever kept anywhere except R2.
 */
import "./_local-client";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SYNC_DIR = path.join(ROOT, "product-sync");
const LOCAL_DB = path.join(ROOT, ".data", "modules-local.db");
const DEFAULT_BASE = "https://images.vierapparatus.com";

const args = process.argv.slice(2);
const targetArg = args.includes("--target") ? args[args.indexOf("--target") + 1] : "local";
const target = targetArg === "live" ? "live" : "local";
const commit = args.includes("--commit");

if (target === "local") {
  // The PC copy. Set before the database module opens anything.
  process.env.TURSO_DATABASE_URL = "file:" + LOCAL_DB.replace(/\\/g, "/");
  process.env.TURSO_AUTH_TOKEN = "";
} else if (!process.env.TURSO_DATABASE_URL) {
  console.error("The live target needs TURSO_DATABASE_URL in .env.local.");
  process.exit(1);
}

// Column names in the CSV (normalised: lower case, no spaces or punctuation) and what they mean here.
const COLUMN_ALIASES: Record<string, string[]> = {
  name: ["name", "productname"],
  slug: ["slug"],
  manufacturer: ["company", "manufacturer", "brand"],
  category: ["category", "productcategory"],
  model: ["modelnumber", "model", "modelno"],
  description: ["feature", "features", "description", "overview"],
  shortDescription: ["shortdescription", "summary"],
  image: ["r2link", "r2image", "imageurl"],
  status: ["publicationstatus", "status"],
};
const norm = (h: string) => h.toLowerCase().replace(/[^a-z0-9]/g, "");

function summarise(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  const m = flat.match(/^.{1,300}?[.!?](\s|$)/);
  return (m ? m[0] : flat.slice(0, 300)).trim();
}

async function main() {
  const { detectDelimiter, parseDelimited } = await import("../src/lib/products/table");
  const { productRef, productSlug } = await import("../src/lib/products/shared");
  const { duplicateKey } = await import("../src/lib/products/import");
  const { conn, ensureSchema } = await import("../src/lib/db/client");
  const { runImport } = await import("../src/lib/store/products");

  await ensureSchema();
  const db = await conn();
  const owner = (await db.execute("SELECT id, name FROM users WHERE role = 'owner' LIMIT 1")).rows[0];
  if (!owner) {
    console.error("No owner account in this database. Create it first (npm run admin:bootstrap).");
    process.exit(1);
  }
  const actor = { id: String(owner.id), name: String(owner.name), role: "owner" as const, permissions: [] as string[] };

  const base = (process.env.IMAGE_PUBLIC_BASE_URL || DEFAULT_BASE).replace(/\/+$/, "");
  const files = fs.existsSync(SYNC_DIR) ? fs.readdirSync(SYNC_DIR).filter((f) => /\.csv$/i.test(f)).sort() : [];
  if (!files.length) {
    console.log(`No CSV files in ${path.relative(ROOT, SYNC_DIR)}. Add one and run again.`);
    return;
  }

  // What is already in the database, by address, so a row can update its product instead of adding a copy.
  type Known = { ref: string; status: string; category: string; manufacturer: string };
  const bySlug = new Map<string, Known>();
  const byKey = new Map<string, Known>(); // the importer's own key: maker and model, or name when there is no model
  for (const r of (await db.execute("SELECT p.num, p.slug, p.name, p.status, p.manufacturer, p.model_number, c.name AS category FROM products p LEFT JOIN product_categories c ON c.id = p.category_id")).rows) {
    const info: Known = { ref: productRef(Number(r.num)), status: String(r.status), category: String(r.category ?? ""), manufacturer: String(r.manufacturer ?? "") };
    bySlug.set(String(r.slug).toLowerCase(), info);
    byKey.set(duplicateKey({ name: String(r.name), manufacturer: info.manufacturer, modelNumber: String(r.model_number ?? "") }), info);
  }

  const records: Record<string, string>[] = [];
  const report = { file: "", rows: 0, withoutName: 0, duplicatesInFile: 0, matchedExisting: 0, newProducts: 0, withR2Image: 0, withoutR2Image: 0, ignoredImageAddresses: 0, unknownColumns: [] as string[] };
  const seen = new Set<string>();

  for (const file of files) {
    report.file = file;
    const text = fs.readFileSync(path.join(SYNC_DIR, file), "utf8");
    const delimiter = detectDelimiter(text);
    const all = parseDelimited(text, delimiter).filter((r) => r.some((c) => c.trim() !== "") && !(r[0] ?? "").trim().startsWith("#"));
    const headers = (all[0] ?? []).map((h) => h.trim());
    const col: Record<string, number> = {};
    for (const [key, aliases] of Object.entries(COLUMN_ALIASES)) {
      const i = headers.findIndex((h) => aliases.includes(norm(h)));
      if (i >= 0) col[key] = i;
    }
    report.unknownColumns = headers.filter((h, i) => !Object.values(col).includes(i) && h).slice(0, 40);
    if (col.name === undefined) {
      console.error(`${file}: no "name" column found. Columns: ${headers.join(", ")}`);
      process.exit(1);
    }

    for (const row of all.slice(1)) {
      report.rows++;
      const get = (k: string) => (col[k] === undefined ? "" : (row[col[k]] ?? "").replace(/\s+$/g, "").trim());
      const name = get("name");
      if (!name) {
        report.withoutName++;
        continue;
      }
      const model = get("model");
      const key = (get("slug") || productSlug(name, model)).toLowerCase();
      if (seen.has(key)) {
        report.duplicatesInFile++;
        continue;
      }
      seen.add(key);
      const rowName = { name, manufacturer: get("manufacturer"), modelNumber: model };
      const match = bySlug.get(key) ?? byKey.get(duplicateKey(rowName));
      const image = get("image");
      const hasR2Image = image.startsWith(base + "/");
      if (hasR2Image) report.withR2Image++;
      else report.withoutR2Image++;
      if (image && !hasR2Image) report.ignoredImageAddresses++;

      const description = get("description").slice(0, 8000);
      const manufacturer = get("manufacturer") || match?.manufacturer || "";
      const isBio = manufacturer.toLowerCase() === "biobase";
      const rec: Record<string, string> = {
        name,
        manufacturer,
        category: get("category") || match?.category || "Uncategorised",
        model_number: model,
        short_description: (get("shortDescription") || summarise(description)).slice(0, 400),
        description,
        // A row that names no status: existing products keep theirs; new BIOBASE products are published; others start as drafts.
        publication_status: get("status") || (match ? match.status : isBio ? "published" : "draft"),
      };
      if (hasR2Image) rec.image_url = image;
      if (match) {
        rec.product_id = match.ref;
        report.matchedExisting++;
      } else report.newProducts++;
      records.push(rec);
    }
  }

  const summary = (r: Awaited<ReturnType<typeof runImport>>) => ({ rows: r.total, added: r.added, updated: r.updated, skipped: r.skipped, failed: r.failed, newCategories: r.newCategories.length });
  console.log(JSON.stringify({ target, mode: commit ? "COMMIT" : "dry run", csvFiles: files, ...report, rowsToImport: records.length }, null, 1));

  const preview = await runImport(actor, records, { onDuplicate: "update", source: "csv", filename: files.join(", ") }, false);
  console.log("preview:", JSON.stringify(summary(preview)));
  const problems = preview.rows.filter((r) => r.action === "error").slice(0, 12).map((r) => `row ${r.row} ${r.name}: ${r.errors.join("; ")}`);
  if (problems.length) console.log("first problems:\n  " + problems.join("\n  "));

  if (commit) {
    const done = await runImport(actor, records, { onDuplicate: "update", source: "csv", filename: files.join(", ") }, true);
    console.log("written:", JSON.stringify(summary(done)));
  } else {
    console.log("Nothing was written. Add --commit to write to the " + target + " database.");
  }
}

main().catch((e) => {
  console.error("Failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});

/* Product CSV import. Preview by default; add --publish to write data/products*.json.
 * Usage: npm run import:preview -- [file.csv] [--mapping data/import-mappings/...]
 *        npm run import:publish -- [file.csv] [--archive-missing] [--allow-errors] [--force]
 *        (--data-dir <dir> overrides where products*.json are read/written; used by tests)
 */
import fs from "node:fs";
import path from "node:path";
import { mappingSchema, mergeCatalogues, parseCatalogue } from "../src/lib/import/normalize";
import { productSchema, type Product, type ProductSummary } from "../src/lib/product-types";

const args = process.argv.slice(2);
const flag = (n: string) => args.includes(n);
const opt = (n: string) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : undefined;
};
const positional = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--mapping" && args[i - 1] !== "--data-dir");

const root = path.resolve(__dirname, "..");
const csvPath = path.resolve(root, positional[0] ?? "data/imports/catalog_import.csv");

// Automatically match mapping file name to CSV file name if --mapping isn't explicitly provided
const defaultMappingFilename = path.basename(csvPath, path.extname(csvPath)) + ".json";
const inferredMappingPath = path.resolve(root, "data/import-mappings", defaultMappingFilename);
const fallbackMappingPath = path.resolve(root, "data/import-mappings/biobase.json");
const targetMappingPath = fs.existsSync(inferredMappingPath) ? inferredMappingPath : fallbackMappingPath;

const mappingPath = path.resolve(root, opt("--mapping") ?? targetMappingPath);
const dataDir = path.resolve(root, opt("--data-dir") ?? "data");
const outFull = path.join(dataDir, "products.json");
const outIndex = path.join(dataDir, "products-index.json");
const publish = flag("--publish");

function fail(msg: string): never {
  console.error(`\n✖ ${msg}\nNothing was written. The existing catalogue is untouched.`);
  process.exit(1);
}

if (!fs.existsSync(csvPath)) fail(`CSV not found: ${csvPath}`);
if (!fs.existsSync(mappingPath)) fail(`Mapping file not found: ${mappingPath}`);

const mapping = mappingSchema.parse(JSON.parse(fs.readFileSync(mappingPath, "utf8")));
const now = new Date().toISOString();
const parsed = parseCatalogue(fs.readFileSync(csvPath, "utf8"), mapping, now);

const existing: Product[] = fs.existsSync(outFull) ? JSON.parse(fs.readFileSync(outFull, "utf8")) : [];
const existingPublished = existing.filter((p) => p.status === "published").length;
const result = mergeCatalogues(existing, parsed.products, { archiveMissing: flag("--archive-missing"), now });

// Final schema gate on the merged result.
const schemaErrors: string[] = [];
for (const p of result.products) {
  const r = productSchema.safeParse(p);
  if (!r.success) schemaErrors.push(`${p.name}: ${r.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
}

const errors = parsed.issues.filter((i) => i.level === "error");
const warnings = parsed.issues.filter((i) => i.level === "warning");
const noImage = warnings.filter((w) => /No image/.test(w.message)).length;

console.log(`\nSource:  ${path.relative(root, csvPath)}  (${parsed.totalRows} data rows)`);
console.log(`Mapping: ${path.relative(root, mappingPath)}`);
if (parsed.unmappedHeaders.length) console.log(`Unmapped columns (ignored): ${parsed.unmappedHeaders.join(", ")}`);
console.log(`\nValid rows:   ${parsed.products.length}`);
console.log(`Added:        ${result.added.length}`);
console.log(`Updated:      ${result.updated.length}`);
console.log(`Unchanged:    ${result.unchanged}`);
console.log(`Restored:     ${result.restored.length}`);
console.log(`Archived:     ${result.archived.length}${flag("--archive-missing") ? "" : "  (archiving is off; use --archive-missing)"}`);
console.log(`Errors:       ${errors.length}`);
console.log(`Warnings:     ${warnings.length}`);
for (const e of errors.slice(0, 25)) console.log(`  ERROR   row ${e.row}: ${e.message}`);
if (errors.length > 25) console.log(`  ... ${errors.length - 25} more errors`);
for (const w of warnings.filter((x) => !/No image/.test(x.message)).slice(0, 15)) console.log(`  warning row ${w.row}: ${w.message}`);
if (noImage) console.log(`  warning: ${noImage} row(s) have no image`);
for (const s of schemaErrors.slice(0, 10)) console.log(`  SCHEMA  ${s}`);

if (!publish) {
  console.log("\nPreview only. Run `npm run import:publish` to write the catalogue.");
  process.exit(errors.length || schemaErrors.length ? 1 : 0);
}

if (parsed.products.length === 0) fail("No valid rows found.");
if (schemaErrors.length) fail("Merged catalogue failed schema validation.");
if (errors.length && !flag("--allow-errors")) {
  fail(`${errors.length} invalid row(s). Fix the CSV, or re-run with --allow-errors to publish the valid rows only.`);
}
if (existingPublished > 0 && parsed.products.length < existingPublished * 0.5 && !flag("--force")) {
  fail(`New file has ${parsed.products.length} valid products vs ${existingPublished} published (a >50% drop). Re-run with --force if intended.`);
}

const summaries: ProductSummary[] = result.products
  .filter((p) => p.status === "published")
  .map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    manufacturer: p.manufacturer,
    shortDescription: p.shortDescription,
    imageUrl: p.imageUrl,
    modelCode: p.modelCode,
    sku: p.sku,
    search: [p.name, p.modelCode, p.sku, p.manufacturer, p.category, ...p.keywords].filter(Boolean).join(" ").toLowerCase(),
  }));

// Atomic write: temp files first, then rename, so a crash never leaves a half-written catalogue.
const writeAtomic = (file: string, data: string) => {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, data, "utf8");
  fs.renameSync(tmp, file);
};
if (existing.length) fs.copyFileSync(outFull, outFull + ".bak");
writeAtomic(outFull, JSON.stringify(result.products));
writeAtomic(outIndex, JSON.stringify(summaries));
// Record what changed so `npm run indexnow -- --import` can notify search engines after the deploy is live.
writeAtomic(
  path.join(dataDir, "indexnow-last-import.json"),
  JSON.stringify(
    {
      at: now,
      added: result.added.map((p) => p.slug),
      updated: result.updated.map((p) => p.slug),
      restored: result.restored.map((p) => p.slug),
      archived: result.archived.map((p) => p.slug),
    },
    null,
    1,
  ),
);
console.log(`\n✔ Published ${summaries.length} products (${result.products.length} records including archived).`);
console.log(`  IndexNow queue: ${result.added.length + result.updated.length + result.restored.length + result.archived.length} changed URL(s) saved to data/indexnow-last-import.json`);
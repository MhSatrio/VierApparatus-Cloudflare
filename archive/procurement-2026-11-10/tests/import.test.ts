import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { extractModelCode, legacyProductId, mappingSchema, mergeCatalogues, parseCatalogue, slugify } from "@/lib/import/normalize";
import type { Product } from "@/lib/product-types";

const root = path.resolve(__dirname, "..");
const mapping = mappingSchema.parse(JSON.parse(fs.readFileSync(path.join(root, "data/import-mappings/biobase.json"), "utf8")));
const NOW = "2026-01-01T00:00:00.000Z";

const csv = (rows: string[][]) =>
  ["image,name,supply,feature", ...rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))].join("\n");

describe("parseCatalogue", () => {
  it("handles quoted commas, escaped quotes and multiline descriptions", () => {
    const text = csv([
      ["https://img.example.com/a.jpg", 'Centrifuge, "Pro" BKC-X1', "Factory", "Introduction：\n\nLine one, with comma.\nSpeed: 4000 rpm\nCapacity：6 x 50 mL"],
    ]);
    const r = parseCatalogue(text, mapping, NOW);
    expect(r.issues.filter((i) => i.level === "error")).toHaveLength(0);
    const p = r.products[0];
    expect(p.name).toBe('Centrifuge, "Pro" BKC-X1');
    expect(p.modelCode).toBe("BKC-X1");
    expect(p.description).toContain("Line one, with comma.");
    expect(p.specifications).toEqual([
      { label: "Speed", value: "4000 rpm" },
      { label: "Capacity", value: "6 x 50 mL" },
    ]);
    expect(p.category).toBe("Centrifuges");
    expect(p.price).toBeNull(); // never fabricated
  });

  it("reports missing names and keeps going; warns on bad URLs and duplicates", () => {
    const text = csv([
      ["https://img.example.com/a.jpg", "Good Item", "x", "desc"],
      ["javascript:alert(1)", "Bad Image Item", "x", "desc"],
      ["", "", "x", "no name"],
      ["https://img.example.com/c.jpg", "good item", "x", "duplicate by name"],
    ]);
    const r = parseCatalogue(text, mapping, NOW);
    expect(r.products.map((p) => p.name)).toEqual(["Good Item", "Bad Image Item"]);
    expect(r.products[1].imageUrl).toBeNull();
    expect(r.issues.some((i) => i.level === "error" && i.row === 4)).toBe(true);
    expect(r.issues.some((i) => /Duplicate/.test(i.message))).toBe(true);
    expect(r.issues.some((i) => /Invalid image URL/.test(i.message))).toBe(true);
  });

  it("strips HTML and control characters", () => {
    const r = parseCatalogue(csv([["", "<b>Safe</b> Name\u0007", "x", "<script>alert(1)</script>Text"]]), mapping, NOW);
    expect(r.products[0].name).toBe("Safe Name");
    expect(r.products[0].description).not.toContain("<");
  });

  it("errors when no name column exists", () => {
    const r = parseCatalogue("foo,bar\n1,2", mapping, NOW);
    expect(r.products).toHaveLength(0);
    expect(r.issues[0].level).toBe("error");
  });

  it("supports alternative headers and a supplier SKU", () => {
    const r = parseCatalogue('SKU,Title,Brand\nAB-1,"Widget",Acme\n', mapping, NOW);
    expect(r.products[0]).toMatchObject({ sku: "AB-1", name: "Widget", manufacturer: "Acme" });
  });

  it("reads the Company column as brand and supplier, not the mapping default", () => {
    const catalog = mappingSchema.parse(JSON.parse(fs.readFileSync(path.join(root, "data/import-mappings/catalog_import.json"), "utf8")));
    for (const m of [mapping, catalog]) {
      const r = parseCatalogue("name,Company,feature\nMéCour ULT Freezer,MéCour,Storage\nNo Company Item,,Storage\n", m, NOW);
      expect(r.products[0]).toMatchObject({ manufacturer: "MéCour", supplier: "MéCour" });
      expect(r.unmappedHeaders).not.toContain("Company");
    }
    // Rows that name no company keep the mapping default as a last resort.
    const r = parseCatalogue("name,Company\nNo Company Item,\n", catalog, NOW);
    expect(r.products[0]).toMatchObject({ manufacturer: null, supplier: "UNIVERSAL" });
  });

  it("prefers an explicit supplier column over the company for Supplier", () => {
    const r = parseCatalogue("name,Company,Supplier\nWidget,Acme,Reseller Ltd\n", mapping, NOW);
    expect(r.products[0]).toMatchObject({ manufacturer: "Acme", supplier: "Reseller Ltd" });
  });
});

describe("mergeCatalogues", () => {
  const mk = (rows: string[][]) => parseCatalogue(csv(rows), mapping, NOW).products;
  const base = mk([
    ["", "Alpha Incubator", "x", "one"],
    ["", "Beta Centrifuge BK-1", "x", "two"],
  ]);

  it("is idempotent: a repeat import changes nothing", () => {
    const first = mergeCatalogues([], base, { archiveMissing: false, now: NOW });
    const again = mergeCatalogues(first.products, mk([["", "Alpha Incubator", "x", "one"], ["", "Beta Centrifuge BK-1", "x", "two"]]), { archiveMissing: false, now: "2027-01-01T00:00:00.000Z" });
    expect(again.added).toHaveLength(0);
    expect(again.updated).toHaveLength(0);
    expect(again.unchanged).toBe(2);
    expect(JSON.stringify(again.products)).toBe(JSON.stringify(first.products));
  });

  it("updates changed records but keeps slug and id stable", () => {
    const first = mergeCatalogues([], base, { archiveMissing: false, now: NOW });
    const changed = mk([["", "Alpha Incubator", "x", "one, revised"], ["", "Beta Centrifuge BK-1", "x", "two"]]);
    const next = mergeCatalogues(first.products, changed, { archiveMissing: false, now: "2027-01-01T00:00:00.000Z" });
    expect(next.updated).toHaveLength(1);
    const before = first.products.find((p) => p.name === "Alpha Incubator")!;
    const after = next.products.find((p) => p.name === "Alpha Incubator")!;
    expect(after.slug).toBe(before.slug);
    expect(after.id).toBe(before.id);
    expect(after.description).toBe("one, revised");
  });

  it("never deletes missing products; archives only when asked, and restores them", () => {
    const first = mergeCatalogues([], base, { archiveMissing: false, now: NOW });
    const partial = mk([["", "Alpha Incubator", "x", "one"]]);
    const keep = mergeCatalogues(first.products, partial, { archiveMissing: false, now: NOW });
    expect(keep.products).toHaveLength(2);
    expect(keep.products.every((p) => p.status === "published")).toBe(true);
    const arch = mergeCatalogues(first.products, partial, { archiveMissing: true, now: NOW });
    expect(arch.products).toHaveLength(2);
    expect(arch.archived).toHaveLength(1);
    expect(arch.products.find((p) => p.name.startsWith("Beta"))!.status).toBe("archived");
    const back = mergeCatalogues(arch.products, base, { archiveMissing: true, now: NOW });
    expect(back.restored).toHaveLength(1);
    expect(back.products.every((p) => p.status === "published")).toBe(true);
  });

  it("generates unique slugs for colliding names", () => {
    const rows = mk([
      ["", "Water Bath BK-1", "x", "a"],
      ["", "Water Bath  bk-1 ", "x", "b"], // duplicate by normalized name -> dropped
      ["", "Water-Bath BK-1", "x", "c"],
    ]);
    const m = mergeCatalogues([], rows, { archiveMissing: false, now: NOW });
    const slugs = m.products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("same name, different company", () => {
  const catalog = mappingSchema.parse(JSON.parse(fs.readFileSync(path.join(root, "data/import-mappings/catalog_import.json"), "utf8")));
  const file = "name,Company,image\nMicroplate Centrifuge,BIOBASE,https://a.example/1.jpg\nMicroplate Centrifuge,Greiner Bio-One GmbH,https://a.example/2.jpg\nMicroplate Centrifuge,biobase,https://a.example/3.jpg\nBottle Top Dispenser,Accumax,\nBottle-Top Dispenser,BIOBASE,\n";
  const merge = (existing: Product[]) => mergeCatalogues(existing, parseCatalogue(file, catalog, NOW).products, { archiveMissing: false, now: NOW });

  it("keeps one product per company, drops only a repeat from the same company", () => {
    const r = parseCatalogue(file, catalog, NOW);
    expect(r.products.map((p) => `${p.name}|${p.manufacturer}`)).toEqual([
      "Microplate Centrifuge|BIOBASE",
      "Microplate Centrifuge|Greiner Bio-One GmbH",
      "Bottle Top Dispenser|Accumax",
      "Bottle-Top Dispenser|BIOBASE",
    ]);
    expect(new Set(r.products.map((p) => p.id)).size).toBe(4);
    expect(r.issues.filter((i) => /Duplicate/.test(i.message))).toHaveLength(1); // the lower-case "biobase" repeat
  });

  it("gives each company its own URL slug", () => {
    const slugs = merge([]).products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(4);
    expect(slugs).toContain("microplate-centrifuge");
    // The second company gets its name in the URL.
    expect(slugs.filter((s) => /^microplate-centrifuge-(biobase|greiner-bio-one-gmbh)$/.test(s))).toHaveLength(1);
  });

  it("keeps the id and URL of records saved with the old name-only id, and adds the other company beside them", () => {
    const legacy: Product = { ...parseCatalogue("name,Company\nMicroplate Centrifuge,BIOBASE\n", catalog, NOW).products[0], id: legacyProductId("Microplate Centrifuge"), slug: "microplate-centrifuge" };
    const m = merge([legacy]);
    const kept = m.products.find((p) => p.id === legacy.id)!;
    expect(kept.slug).toBe("microplate-centrifuge");
    expect(kept.manufacturer).toBe("BIOBASE");
    expect(m.added.map((p) => p.manufacturer).sort()).toEqual(["Accumax", "BIOBASE", "Greiner Bio-One GmbH"]);
    expect(m.products).toHaveLength(4);
    // A second import changes nothing.
    const again = mergeCatalogues(m.products, parseCatalogue(file, catalog, NOW).products, { archiveMissing: false, now: NOW });
    expect(again.added).toHaveLength(0);
    expect(again.updated).toHaveLength(0);
    expect(again.products).toHaveLength(4);
  });
});

describe("helpers", () => {
  it("slugifies and extracts model codes", () => {
    expect(slugify("Table Top 18500rpm / High-Speed Centrifuge")).toBe("table-top-18500rpm-high-speed-centrifuge");
    expect(extractModelCode("Blood Centrifuge BKC-TL4BII")).toBe("BKC-TL4BII");
    expect(extractModelCode("Water Softener 500L 1000L")).toBeNull();
  });
});

describe("import CLI safety", () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "vier-import-"));
  });
  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

  const run = (args: string[]) =>
    spawnSync(process.execPath, [path.join(root, "node_modules/tsx/dist/cli.mjs"), "scripts/import-products.ts", ...args, "--data-dir", dir], { cwd: root, encoding: "utf8" });

  it("publishes a valid file, then a broken file cannot erase or alter the catalogue", () => {
    const good = path.join(dir, "good.csv");
    fs.writeFileSync(good, csv(Array.from({ length: 6 }, (_, i) => ["", `Item Number ${i} XY-${i}1`, "x", "desc"])));
    expect(run([good, "--publish"]).status).toBe(0);
    const before = fs.readFileSync(path.join(dir, "products.json"), "utf8");
    expect(JSON.parse(before)).toHaveLength(6);

    const badHeaders = path.join(dir, "bad.csv");
    fs.writeFileSync(badHeaders, "foo,bar\n1,2\n");
    const r1 = run([badHeaders, "--publish"]);
    expect(r1.status).not.toBe(0);

    const tiny = path.join(dir, "tiny.csv");
    fs.writeFileSync(tiny, csv([["", "Only One Item AB-1", "x", "desc"]]));
    const r2 = run([tiny, "--publish", "--archive-missing"]);
    expect(r2.status).not.toBe(0); // >50% shrink guard

    const withErrors = path.join(dir, "errors.csv");
    fs.writeFileSync(withErrors, csv([["", "", "x", "no name"], ...Array.from({ length: 6 }, (_, i) => ["", `Item Number ${i} XY-${i}1`, "x", "desc"])]));
    expect(run([withErrors, "--publish"]).status).not.toBe(0);

    expect(fs.readFileSync(path.join(dir, "products.json"), "utf8")).toBe(before);
  });

  it("preview never writes files", () => {
    const f = path.join(dir, "p.csv");
    fs.writeFileSync(f, csv([["", "Preview Item PV-11", "x", "d"]]));
    expect(run([f]).status).toBe(0);
    expect(fs.existsSync(path.join(dir, "products.json"))).toBe(false);
  });
});

// Type-level sanity so Product stays in sync with the importer output.
const _typecheck: Product[] = [];
void _typecheck;

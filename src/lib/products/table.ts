/**
 * Reading a pasted or uploaded table of products: delimiter detection, a quote-aware reader, and matching the columns of the
 * file to the columns of the Product Manager. Pure and dependency free, so the browser can do it before anything is sent.
 *
 * The same reader serves a CSV file and text copied from Excel or Google Sheets (which is tab separated).
 */

export const MAX_IMPORT_ROWS = 2000;

export type ImportColumn = {
  key: string;
  header: string;
  required: boolean;
  format: string;
  description: string;
  example1: string;
  example2: string;
  aliases: string[];
};

/** The columns of the import template, in order. `aliases` are other headers people use for the same thing (compared without case or punctuation). */
export const IMPORT_COLUMNS: ImportColumn[] = [
  { key: "product_id", header: "product_id", required: false, format: "P-00012, or leave empty", description: "The Product ID shown in the Product Manager. Fill it to UPDATE an existing product; leave it empty to add a new one.", example1: "", example2: "", aliases: ["id", "productid", "ref", "reference"] },
  { key: "name", header: "name", required: true, format: "Text, 2 to 250 characters", description: "The product name as the manufacturer names it.", example1: "Example benchtop centrifuge", example2: "Example compact water bath", aliases: ["productname", "title", "product"] },
  { key: "manufacturer", header: "manufacturer", required: true, format: "Text", description: "The manufacturer or brand.", example1: "Example Manufacturer Ltd", example2: "Example Manufacturer Ltd", aliases: ["brand", "maker", "supplier", "company"] },
  { key: "category", header: "category", required: true, format: "Text", description: "The product category. A name that does not exist yet creates the category.", example1: "Centrifuges", example2: "Incubators, Ovens & Baths", aliases: ["productcategory", "type", "group"] },
  { key: "model_number", header: "model_number", required: false, format: "Text", description: "The manufacturer's model or catalogue number.", example1: "EX-100", example2: "EX-W20", aliases: ["model", "modelnumber", "modelcode", "modelno", "partnumber"] },
  { key: "sku", header: "sku", required: false, format: "Text", description: "A stock or catalogue code, if there is one.", example1: "", example2: "", aliases: ["code", "catalogno", "catalognumber", "catno"] },
  { key: "short_description", header: "short_description", required: false, format: "Text, up to 400 characters", description: "One or two sentences saying what the product is. Required to publish.", example1: "A sentence describing the product, taken from the manufacturer's documentation.", example2: "", aliases: ["shortdescription", "summary", "excerpt", "blurb"] },
  { key: "description", header: "description", required: false, format: "Text, up to 8,000 characters", description: "The product overview.", example1: "", example2: "", aliases: ["productdescription", "overview", "details", "longdescription"] },
  { key: "technical_specifications", header: "technical_specifications", required: false, format: "Label: Value | Label: Value", description: "Manufacturer-provided specifications. Separate items with | (or a new line inside the cell); write each as Label: Value.", example1: "Rotor capacity: 24 x 1.5 mL | Speed range: 200 to 15000 rpm", example2: "", aliases: ["specifications", "specs", "technicalspecs", "technicalspecification", "technicaldata"] },
  { key: "key_features", header: "key_features", required: false, format: "Item | Item | Item", description: "Key features claimed by the manufacturer. Separate items with |.", example1: "", example2: "", aliases: ["features", "keyfeature"] },
  { key: "applications", header: "applications", required: false, format: "Item | Item | Item", description: "Intended laboratory applications. Separate items with |.", example1: "", example2: "", aliases: ["application", "intendeduse", "uses"] },
  { key: "advantages", header: "advantages", required: false, format: "Item | Item | Item", description: "Editorial assessment: advantages. Leave empty unless an editor has assessed the product.", example1: "", example2: "", aliases: ["pros", "strengths"] },
  { key: "limitations", header: "limitations", required: false, format: "Item | Item | Item", description: "Editorial assessment: limitations. Leave empty unless an editor has assessed the product.", example1: "", example2: "", aliases: ["cons", "weaknesses"] },
  { key: "certifications", header: "certifications", required: false, format: "Item | Item | Item", description: "Certifications that are documented by the manufacturer or a certifying body.", example1: "", example2: "", aliases: ["certification", "standards"] },
  { key: "image_url", header: "image_url", required: false, format: "https:// address", description: "The main product image. Upload images in the product editor to have them converted to WebP and stored in the image bucket.", example1: "", example2: "", aliases: ["image", "productimage", "imageurl", "photo", "picture"] },
  { key: "product_url", header: "product_url", required: false, format: "https:// address", description: "The product page on the manufacturer's or supplier's site.", example1: "", example2: "", aliases: ["url", "producturl", "link", "page", "sourceurl"] },
  { key: "manufacturer_url", header: "manufacturer_url", required: false, format: "https:// address", description: "The manufacturer's website.", example1: "https://www.example.org", example2: "https://www.example.org", aliases: ["manufacturerurl", "website", "brandurl", "companyurl"] },
  { key: "datasheet_url", header: "datasheet_url", required: false, format: "https:// address", description: "A technical datasheet or manual.", example1: "", example2: "", aliases: ["datasheet", "datasheeturl", "manual", "pdf"] },
  { key: "review_status", header: "review_status", required: false, format: "listed, in_review or reviewed", description: "How far the editorial review has gone. Empty means listed (manufacturer information only).", example1: "listed", example2: "listed", aliases: ["reviewstatus", "editorialstatus"] },
  { key: "publication_status", header: "publication_status", required: false, format: "draft, under_review, approved, published, archived or rejected", description: "Empty means draft. Publishing needs a name, manufacturer, category and short description.", example1: "draft", example2: "draft", aliases: ["publicationstatus", "status", "state"] },
  { key: "seo_title", header: "seo_title", required: false, format: "Text, up to 70 characters", description: "The page title for search engines. Empty: made from the name.", example1: "", example2: "", aliases: ["seotitle", "metatitle"] },
  { key: "seo_description", header: "seo_description", required: false, format: "Text, up to 200 characters", description: "The page description for search engines.", example1: "", example2: "", aliases: ["seodescription", "metadescription"] },
  { key: "editorial_notes", header: "editorial_notes", required: false, format: "Text, up to 5,000 characters", description: "Internal notes. Never shown to visitors.", example1: "", example2: "", aliases: ["notes", "internalnotes", "editornotes"] },
];

export const columnByKey = new Map(IMPORT_COLUMNS.map((c) => [c.key, c]));

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** For each header of the file, the key of the column it most likely is, or null. A column can be matched once. */
export function suggestMapping(headers: string[]): (string | null)[] {
  const used = new Set<string>();
  return headers.map((h) => {
    const n = norm(h);
    if (!n) return null;
    const hit = IMPORT_COLUMNS.find((c) => !used.has(c.key) && (norm(c.header) === n || c.aliases.includes(n)));
    if (hit) used.add(hit.key);
    return hit?.key ?? null;
  });
}

/** Tab (a paste from a spreadsheet), semicolon (some European Excel exports) or comma, whichever the first lines use most. */
export function detectDelimiter(text: string): "\t" | ";" | "," {
  const head = text.replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith("#")).slice(0, 5).join("\n");
  const count = (ch: string) => {
    let n = 0;
    let quoted = false;
    for (const c of head) {
      if (c === '"') quoted = !quoted;
      else if (!quoted && c === ch) n++;
    }
    return n;
  };
  const tabs = count("\t");
  const semis = count(";");
  const commas = count(",");
  if (tabs > 0 && tabs >= commas && tabs >= semis) return "\t";
  if (semis > commas) return ";";
  return ",";
}

/** Quote-aware reader for one delimiter: quoted cells may hold the delimiter, doubled quotes and line breaks. */
export function parseDelimited(text: string, delimiter: string): string[][] {
  const src = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += ch;
    } else if (ch === '"' && cell === "") quoted = true;
    else if (ch === delimiter) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

export type ParsedTable = { delimiter: "\t" | ";" | ","; headers: string[]; rows: string[][]; skipped: number; tooMany: boolean };

/**
 * Text -> header row and data rows. Rows whose first cell starts with # are comments (the template's instructions and examples) and
 * rows that are entirely empty are dropped; both are counted in `skipped`. The first remaining row is the header.
 */
export function parseTable(text: string): ParsedTable {
  const delimiter = detectDelimiter(text);
  const all = parseDelimited(text, delimiter);
  let skipped = 0;
  const kept = all.filter((r) => {
    const blank = r.every((c) => c.trim() === "");
    const comment = (r[0] ?? "").trim().startsWith("#");
    if (blank || comment) {
      if (comment) skipped++;
      return false;
    }
    return true;
  });
  const [headers = [], ...rows] = kept;
  return { delimiter, headers: headers.map((h) => h.trim()), rows: rows.slice(0, MAX_IMPORT_ROWS), skipped, tooMany: rows.length > MAX_IMPORT_ROWS };
}

/** Rows -> one record per row, keyed by the chosen column keys. Columns mapped to nothing are dropped. */
export function toRecords(rows: string[][], mapping: (string | null)[]): Record<string, string>[] {
  return rows.map((r) => {
    const rec: Record<string, string> = {};
    mapping.forEach((key, i) => {
      if (key) rec[key] = (r[i] ?? "").trim();
    });
    return rec;
  });
}

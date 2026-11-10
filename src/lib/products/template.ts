import { toCsv } from "../csv";
import { IMPORT_COLUMNS } from "./table";

/**
 * The downloadable product import template: a CSV that Excel and Google Sheets open directly (UTF-8 with a byte order mark, so
 * accents survive). Everything above the header row and the example rows start with # and are ignored on import, so the file
 * can be filled in without deleting them.
 */
const NOTE = (text: string) => [`# ${text}`, ...IMPORT_COLUMNS.slice(1).map(() => "")];

const rows: string[][] = [
  NOTE("VierApparatus product import template. Rows that start with # are instructions and examples: they are ignored on import. Fill in your products under the header row (the row that starts with product_id)."),
  NOTE("Required columns: name, manufacturer, category. Everything else is optional. Leave product_id empty to add a new product, or fill it with an existing Product ID (for example P-00012) to update that product."),
  NOTE("Lists (specifications, features, applications, ...) use | between items. Specifications are written Label: Value. Addresses must start with https://. Do not enter prices: this is not a shop."),
  NOTE("Write only what the manufacturer or a documented source states. Do not copy reviews or invent claims. Comments from readers are collected on the site, not here."),
  ["#Required or optional", ...IMPORT_COLUMNS.slice(1).map((c) => (c.required ? "REQUIRED" : "optional"))],
  ["#Expected format", ...IMPORT_COLUMNS.slice(1).map((c) => c.format)],
  ["#What it is", ...IMPORT_COLUMNS.slice(1).map((c) => c.description)],
  IMPORT_COLUMNS.map((c) => c.header),
  ["#EXAMPLE (ignored)", ...IMPORT_COLUMNS.slice(1).map((c) => c.example1)],
  ["#EXAMPLE (ignored)", ...IMPORT_COLUMNS.slice(1).map((c) => c.example2)],
];

/** The first column of a comment row holds its text; csvCell must not turn a leading "#" into a formula guard, and it does not. */
export const PRODUCT_TEMPLATE_CSV = "﻿" + toCsv(rows[0], rows.slice(1));

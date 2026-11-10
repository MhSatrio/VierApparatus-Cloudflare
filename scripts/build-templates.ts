// Writes the downloadable templates into public/templates. Run after changing a template: npm run templates:build
import fs from "node:fs";
import path from "node:path";
import { buildModuleTemplate } from "../src/lib/content/module-export";
import { PRODUCT_TEMPLATE_CSV } from "../src/lib/products/template";

const dir = path.join(process.cwd(), "public", "templates");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "module-template.md"), buildModuleTemplate());
fs.writeFileSync(path.join(dir, "product-import-template.csv"), PRODUCT_TEMPLATE_CSV);
console.log("Written: public/templates/module-template.md and product-import-template.csv");

# Archived procurement-era content (2026-11-06)

Everything here belongs to the original VierApparatus laboratory-equipment sourcing and procurement site. It was moved
out of the active project when the site became a science publication. **Nothing here is built, routed, indexed or
served**: this folder is excluded from TypeScript, ESLint and the tests, and it is outside `src/`, `public/` and `content/`.

| Folder / file | What it was |
|---|---|
| `content-articles/` | Four BIOBASE equipment guides (blood centrifuge, rotary evaporator, soil compaction tester, inverted microscope) and an old copy of the Word documentation. |
| `src/` | Procurement service grid, procurement copy (`procurement-content.ts`), the old Google-Sheets analytics tracker and its API route and test. |
| `original-public-site/` | The previous home, about, contact, privacy, articles pages, header, footer, `site.ts`, root layout, robots and sitemap, for reference. |

The product catalogue code itself (importer, `data/products*.json`, product pages and API) was NOT archived: it is kept in
`src/` and switched off with the `ENABLE_PRODUCTS` build flag (see README.md).

To bring an article back, copy its `.md` file into the admin "Import Markdown" page; do not copy it into `content/`.

| `docs/` | The Word documentation of the procurement-era site (Vercel and Cloudflare versions) and the Python scripts that generated it. They describe a product catalogue, importer and quotation flow that are no longer part of the public site. |

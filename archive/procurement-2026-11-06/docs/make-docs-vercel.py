"""Generates docs/VierApparatus_Website_Documentation.docx. Run: python scripts/make-docs.py"""
from pathlib import Path
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Cm

TEST_COUNT = 54  # npm test result for this folder; update when tests are added
BUILD_NOTE = "Typecheck and ESLint pass. Production build (webpack) exit 0 with 10,809 static pages; started with next start and checked: the pages above show the right brand and supplier, no page shows UNIVERSAL, search finds the MéCour products, and the sitemap shards list exactly the published products"

BLUE = RGBColor(0x45, 0x70, 0xB6)
INK = RGBColor(0x23, 0x1F, 0x20)

doc = Document()
for s in doc.sections:
    s.left_margin = s.right_margin = Cm(2)
    s.top_margin = s.bottom_margin = Cm(2)
st = doc.styles["Normal"]
st.font.name = "Calibri"
st.font.size = Pt(10.5)
st.font.color.rgb = INK
for name, size in (("Heading 1", 18), ("Heading 2", 14), ("Heading 3", 12)):
    h = doc.styles[name]
    h.font.name = "Calibri"
    h.font.size = Pt(size)
    h.font.color.rgb = BLUE
    h.font.bold = True


def shade(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_color)
    tcPr.append(shd)


def table(headers, rows, widths):
    t = doc.add_table(rows=1, cols=len(headers))
    t.style = "Table Grid"
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]
        c.text = ""
        r = c.paragraphs[0].add_run(h)
        r.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        shade(c, "4570B6")
    for row in rows:
        cells = t.add_row().cells
        for i, v in enumerate(row):
            cells[i].text = ""
            p = cells[i].paragraphs[0]
            run = p.add_run(v)
            if i == 0:
                run.font.name = "Consolas"
                run.font.size = Pt(9)
    for row in t.rows:
        for i, w in enumerate(widths):
            row.cells[i].width = Cm(w)
    doc.add_paragraph()


def para(text, bold=False):
    p = doc.add_paragraph()
    r = p.add_run(text)
    r.bold = bold
    return p


def bullets(items):
    for i in items:
        doc.add_paragraph(i, style="List Bullet")


def numbered(items):
    for i in items:
        doc.add_paragraph(i, style="List Number")


# ---------------- Title ----------------
t = doc.add_paragraph()
t.alignment = WD_ALIGN_PARAGRAPH.LEFT
r = t.add_run("VierApparatus Website")
r.font.size = Pt(28)
r.bold = True
r.font.color.rgb = BLUE
t2 = doc.add_paragraph()
r = t2.add_run("Project documentation: architecture, SEO, Vercel limits, and what every file does")
r.font.size = Pt(13)
para("Live site: https://vierapparatus.com    |    Project folder: vierapparatus/", bold=False)

# ---------------- 1 ----------------
doc.add_heading("1. The short answer: where is the HTML?", 1)
para(
    "There are no .html files in this project. The website is built with Next.js and React, so each page is a "
    ".tsx file (TypeScript + JSX, which looks like HTML with a little code). The server turns these files into "
    "real HTML for visitors. To change text you see on the site, open the .tsx file for that page and edit the "
    "words between the tags. You can do this safely as long as you keep the surrounding tags and quotes intact."
)
para("Rules of thumb:", bold=True)
bullets([
    "Page text lives in src/app/<page>/page.tsx (the home page is src/app/page.tsx).",
    "Contact details (phone, email, address, WhatsApp) live in ONE place: src/lib/site.ts. Change it there and every page updates.",
    "Reusable parts (header, footer, product card, form) live in src/components/.",
    "Colours, fonts and button styles live in src/app/globals.css.",
    "Products come from a spreadsheet (CSV), articles are Markdown files. Neither needs code edits.",
    "After any change you must publish it (see section 5) before it appears on vierapparatus.com.",
])

# ---------------- 2 ----------------
doc.add_heading("2. “I want to change X on the website” quick finder", 1)
table(
    ["Where to edit", "What it controls"],
    [
        ["src/lib/site.ts", "Phone number (display, tel: link, WhatsApp link), email, address, founder name, site name/tagline, menu links, products-per-page"],
        ["src/app/page.tsx", "Home page: hero headline/text, buttons, section titles (categories, how it works, why us, featured products, latest articles)"],
        ["src/lib/content.ts", "The 8 service cards, the 5 “how it works” steps, the 5 “why VierApparatus” points"],
        ["src/app/about/page.tsx", "About page text, founder section, approach, international sourcing"],
        ["public/assets/images/portrait.jpg", "Founder portrait (replace the file, keep the same name)"],
        ["src/app/contact/page.tsx", "Contact page headings, side panel (email, phone, WhatsApp button, location)"],
        ["src/components/InquiryForm.tsx", "Form labels, placeholder text, success/error messages, privacy sentence under the button"],
        ["src/components/InquiryCta.tsx", "The blue “Tell us what your laboratory needs” block shown near the bottom of pages"],
        ["src/lib/inquiry.ts", "Inquiry type dropdown options, validation rules, email subject and email layout"],
        ["src/components/Header.tsx / MobileNav.tsx", "Top bar and phone menu (menu items themselves are in site.ts)"],
        ["src/components/Footer.tsx", "Footer description, links, contact block, copyright line"],
        ["src/app/privacy/page.tsx", "Privacy notice text"],
        ["src/app/products/page.tsx", "Catalogue page heading, intro text, filter labels, empty-state text"],
        ["src/app/products/[slug]/page.tsx", "Layout of a single product page and its wording (e.g. “Price on request”)"],
        ["src/components/ProductCard.tsx", "The product tile in lists (button labels, what is shown)"],
        ["src/app/articles/page.tsx", "Articles list page heading and intro"],
        ["src/app/articles/[slug]/page.tsx", "Layout of a single article page"],
        ["src/app/globals.css", "Brand colours (#4570B6, #CAEBFB, #231F20), button styles, form field style, article typography"],
        ["src/app/layout.tsx", "Font (Jost), site-wide title template and description, Google structured data (organization)"],
        ["Top of each page.tsx: “metadata”", "The browser-tab title and Google description for that page"],
        ["public/brand/ and src/app/icon.svg", "Logo files (header/footer) and the browser-tab icon (favicon)"],
        ["data/imports/*.csv", "Product list (see section 5)"],
        ["content/articles/*.md", "Articles (see section 5)"],
        ["next.config.ts", "Security headers, which image websites are allowed"],
        ["Vercel → Settings → Environment Variables", "Email service key, sender address, destination inbox, website URL (never stored in files)"],
    ],
    [6.2, 10.8],
)

# ---------------- 3 ----------------
doc.add_heading("3. How the project is organised", 1)
para(
    "Think of it as four layers: pages (what visitors see), components (reusable pieces), library code (logic and data "
    "access), and content/data (products and articles)."
)

doc.add_heading("3.1 Top-level files", 2)
table(
    ["File / folder", "Purpose"],
    [
        ["package.json", "Project name, scripts (dev, build, test, import) and the list of software libraries used"],
        ["package-lock.json", "Exact versions of every library, so builds are repeatable. Generated automatically; do not edit"],
        ["tsconfig.json", "TypeScript settings"],
        ["next.config.ts", "Next.js settings: security headers (CSP, HSTS…), allowed image host, image formats and caching"],
        ["postcss.config.mjs", "Connects Tailwind CSS to the build"],
        ["eslint.config.mjs", "Code-quality (lint) rules"],
        ["vitest.config.mts", "Settings for the automated tests"],
        [".gitignore", "Files Git must never save (secrets, node_modules, build output)"],
        [".env.example", "List of environment variable NAMES with placeholder values. Real secrets go in Vercel, never here"],
        ["README.md", "Setup, deployment, import and security notes (technical)"],
        [".github/workflows/ci.yml", "Automatic checks on GitHub (typecheck, lint, tests, import preview, build) once a GitHub repo is connected"],
        ["node_modules/ (not saved)", "Downloaded libraries. Recreated by “npm install”"],
        [".next/ (not saved)", "Build output. Recreated by “npm run build”"],
        [".vercel/ and .env.local (not saved)", "Local link to the Vercel project and a Vercel-generated local file. Ignored by Git"],
    ],
    [5.2, 11.8],
)

doc.add_heading("3.2 src/app/: the pages (each folder is a web address)", 2)
table(
    ["File", "Web address / purpose"],
    [
        ["layout.tsx", "Wraps every page: font, header, footer, skip-link, default SEO, organization data for Google"],
        ["globals.css", "Brand colours, buttons, form fields, article typography (Tailwind CSS)"],
        ["page.tsx", "/  Home page"],
        ["about/page.tsx", "/about  About page"],
        ["products/page.tsx", "/products  Catalogue with search, category filter, sorting and pagination (rendered on demand because it reads the query string); also lists every category as a link"],
        ["products/category/[slug]/[[...page]]/page.tsx", "/products/category/<category> and /products/category/<category>/<page>  STATIC category hub pages (24 products per page, crawlable pagination). These are what search engines use to discover every product"],
        ["products/[slug]/page.tsx", "/products/<product-name>  One static page per product (created automatically from the catalogue); title, description and structured data come from lib/product-seo.ts"],
        ["articles/page.tsx", "/articles  Article list"],
        ["articles/[slug]/page.tsx", "/articles/<article-name>  One article, with related articles and linked product"],
        ["articles/category/[category]/page.tsx", "/articles/category/<category>  Articles filtered by category"],
        ["contact/page.tsx", "/contact  Full inquiry form and direct contact details; can pre-fill a product from the URL"],
        ["privacy/page.tsx", "/privacy  Privacy notice"],
        ["api/inquiry/route.ts", "Server endpoint that receives form submissions: checks origin, size, rate limit, validates, blocks bots, then sends the email. Not a visible page"],
        ["not-found.tsx", "The friendly 404 page"],
        ["error.tsx", "The page shown if something unexpected breaks"],
        ["sitemap.ts", "Creates the sitemap shards /sitemap/0.xml (static pages, category hubs, articles) and /sitemap/1.xml, 2.xml... (5,000 products each)"],
        ["sitemap-index.xml/route.ts", "The sitemap INDEX, served at /sitemap.xml through a rewrite in next.config.ts"],
        ["sitemap-html/page.tsx and sitemap-html/[page]/page.tsx", "/sitemap-html Product Directory index and numbered directory pages of 500 links each (human-readable sitemap)"],
        ["api/track/route.ts", "Analytics endpoint: receives page views from the browser tracker and appends them to Google Sheets. Ignores crawlers, checks origin, limits size and rate"],
        ["robots.ts", "Creates /robots.txt: allows the site, blocks /api/, /products? and /contact? (on-demand query URLs), points to the sitemap index"],
        ["opengraph-image.tsx", "The preview image used when a link is shared on social media"],
        ["icon.svg, favicon.ico, apple-icon.png", "Browser-tab icon and phone home-screen icon"],
    ],
    [6.2, 10.8],
)

doc.add_heading("3.3 src/components/: reusable building blocks", 2)
table(
    ["File", "Purpose"],
    [
        ["Header.tsx", "Sticky top bar with logo, menu and “Request a Quotation” button"],
        ["MobileNav.tsx", "The phone menu (open/close, Escape key, accessibility)"],
        ["Footer.tsx", "Dark footer with logo, links and contact details"],
        ["Logo.tsx", "Displays the supplied VierApparatus logo (black on white, colour version on dark)"],
        ["InquiryForm.tsx", "The form (short and full versions): sends to /api/inquiry, shows errors/success, has the hidden spam trap and double-click protection"],
        ["InquiryCta.tsx", "Blue section with heading + short form placed near the bottom of pages"],
        ["ProductCard.tsx", "Product tile used in grids"],
        ["ArticleCard.tsx", "Article tile; also formats dates"],
        ["SafeImage.tsx", "Shows an image, or a neat placeholder if the supplier image is missing or fails to load"],
        ["ServiceGrid.tsx", "The 8 service cards plus the note about what is coordinated vs. performed by others"],
        ["Pagination.tsx", "Page links for listings: neighbours, first/last and every 10th page, with path or query-string URLs"],
        ["Icon.tsx", "Small line icons"],
        ["JsonLd.tsx", "Safely outputs the structured data that helps Google understand products and articles"],
    ],
    [5.2, 11.8],
)

doc.add_heading("3.4 src/lib/: logic and data access (no visible design)", 2)
table(
    ["File", "Purpose"],
    [
        ["site.ts", "SINGLE SOURCE for phone, email, address, WhatsApp, menu links, products per page"],
        ["content.ts", "Service cards, process steps and “why us” text"],
        ["products.ts", "Reads the product data (O(1) slug lookup); search, category filter, sorting, pagination, category hub pages, featured products, and related products as neighbours in the category list"],
        ["category.ts", "Turns a category name into its URL slug"],
        ["seo.ts", "Fits titles to 60 characters and meta descriptions to 120-155 characters at word boundaries, keeping a distinguishing tail on long names"],
        ["product-seo.ts", "Product title/description builders, Product and Breadcrumb JSON-LD, price parsing (offers only for real prices), placeholder-image filter"],
        ["html-sitemap.ts", "Splits the catalogue A-Z into directory pages for /sitemap-html"],
        ["indexnow.ts", "IndexNow key, endpoint, URL cleaning and batching (shared by the script and the tests)"],
        ["product-types.ts", "Defines what a product record contains (name, slug, category, image, etc.)"],
        ["product-label.ts", "Builds the “name + model/SKU” text that is pre-filled in inquiries"],
        ["articles.ts", "Reads Markdown articles, checks their header fields (build fails if wrong), hides drafts in production, finds related articles"],
        ["inquiry.ts", "Form rules (required fields, length limits, injection protection), inquiry types, email subject and email design (with escaping)"],
        ["email.ts", "Sends the email through Resend to the fixed destination; mock mode in development only"],
        ["rate-limit.ts", "Limits repeated submissions (optionally via Upstash for stronger protection)"],
        ["import/normalize.ts", "Core of the CSV importer: parsing, cleaning, category rules, company/brand mapping, duplicate rule (same name AND same company), merge/update/archive logic"],
    ],
    [5.2, 11.8],
)

doc.add_heading("3.5 Content and data", 2)
table(
    ["File / folder", "Purpose"],
    [
        ["data/imports/biobasenew.csv", "The BIOBASE product list (converted from your Excel file). Every row is BIOBASE"],
        ["data/imports/catalog_import.csv", "The larger product list (9,267 rows, 8,847 unique products after repeats from the same company are skipped). Each row has its own Company column (Corning, AppliChem, MéCour, ...). Imported with data/import-mappings/catalog_import.json"],
        ["data/import-mappings/catalog_import.json", "Column mapping, defaults and category keyword rules for catalog_import.csv. The Company column is read as brand and supplier; 'UNIVERSAL' is only the last-resort supplier for a row that names no company"],
        ["data/indexnow-last-import.json", "GENERATED by import:publish: slugs added, updated, restored and archived. Read by npm run indexnow -- --import"],
        ["data/imports/example-template.csv", "Synthetic example showing the columns a future CSV can contain (not real products)"],
        ["data/import-mappings/biobase.json", "Tells the importer which CSV column means what (Company / Brand / Manufacturer = brand), defaults (BIOBASE, used only when a row names no company) and keyword rules that assign categories"],
        ["data/products.json", "GENERATED by the importer: full product records used for product pages. Do not edit by hand"],
        ["data/products-index.json", "GENERATED: light list used for fast search and listing. Do not edit by hand"],
        ["content/articles/*.md", "One Markdown file per article (header block + text). Several articles are published; use any of them as a template"],
    ],
    [5.2, 11.8],
)

doc.add_heading("3.6 Other folders", 2)
table(
    ["File / folder", "Purpose"],
    [
        ["public/brand/vier-black.svg, vier-white.svg", "Your logo files, copied from your VIER folder with the drawing area cropped (originals untouched)"],
        ["public/assets/images/portrait.jpg and public/images/portrait.jpg", "Founder portrait (same photo, original path kept)"],
        ["public/icon-512.png", "Square logo icon used as the organization logo for Google"],
        ["scripts/import-products.ts", "The product import command (preview / publish)"],
        ["scripts/indexnow.ts", "Submits changed URLs to IndexNow (npm run indexnow). Refuses to send until the live key file is served"],
        ["scripts/seo-audit.mjs", "SEO crawler for a running copy of the site: title/description lengths, JSON-LD checks, orphans, click depth"],
        ["tests/seo.test.ts", "Tests over ALL published products: title <= 60, description 120-155, valid structured data without invented prices, no orphan products, sitemap coverage, IndexNow"],
        ["tests/track.test.ts", "Tests for /api/track: bots ignored, origin check, size and rate limits, no error leakage, RAW Sheets writes (Google client mocked)"],
        [".github/workflows/indexnow.yml", "After a Production deployment, notifies IndexNow of changed pages (needs the GitHub repository connected to Vercel)"],
        ["public/<32-hex-key>.txt", "IndexNow ownership key file (public by design)"],
        ["scripts/qa-browser.mjs", "Automated browser check (console errors, broken images, overflow, screenshots)"],
        ["scripts/make-docs.py", "Creates this Word document"],
        ["tests/import.test.ts", "Tests for the importer (quotes, duplicates, Company column to brand/supplier, same name from different companies, repeat imports, failed imports cannot erase data)"],
        ["tests/inquiry.test.ts", "Tests for the form and API (validation, injection, escaping, spam, rate limit, duplicate submit). Email provider is mocked"],
        ["docs/", "This documentation"],
    ],
    [6.2, 10.8],
)

# ---------------- 4 ----------------
doc.add_heading("4. How a visitor request flows", 1)
numbered([
    "Visitor opens a page. Static pages are served instantly from Vercel's worldwide network; /products and /contact are built on request because they read the search/filter in the address.",
    "Visitor fills the inquiry form. The browser sends it to /api/inquiry.",
    "The server checks: same website origin, JSON only, size under 16 KB, rate limit, every field, hidden spam field, minimum fill time, duplicate key.",
    "If valid, email.ts sends the message through Resend to INQUIRY_TO_EMAIL (default info@vierapparatus.com) with the visitor's address as Reply-To.",
    "The visitor sees a success or a clear error with email/WhatsApp fallbacks. Nothing is stored in a database.",
])
para("Important: until RESEND_API_KEY and INQUIRY_FROM_EMAIL are set in Vercel, the form cannot deliver email.", bold=True)

# ---------------- 5 ----------------
doc.add_heading("5. How to change things and publish", 1)
doc.add_heading("5.1 Change text, phone, colours (any file above)", 2)
numbered([
    "Open the project folder in VS Code and edit the file (for example src/lib/site.ts).",
    "Optional preview on your computer: run “npm run dev” and open http://localhost:3000.",
    "Optional safety check: run “npm run check” (typecheck, lint and tests).",
    "Publish: run “npx vercel deploy --prod” in the project folder (needs a Vercel token), OR commit and push to GitHub if the repository is connected to Vercel (then it deploys automatically).",
    "Open https://vierapparatus.com and refresh (Ctrl+F5) to confirm.",
])
doc.add_heading("5.2 Add or update products", 2)
numbered([
    "Save your supplier list as CSV UTF-8 into data/imports/.",
    "Preview: npm run import:preview -- data/imports/yourfile.csv",
    "Publish: npm run import:publish -- data/imports/yourfile.csv  (add --archive-missing to hide products no longer listed)",
    "Publish the website (step 4 above). If the supplier's columns have other names, edit the matching file in data/import-mappings/ first.",
    "When the deployment is live, notify search engines: npm run indexnow -- --import (see section 9).",
])
doc.add_heading("5.2.1 Company, brand and supplier (how products are identified)", 3)
bullets([
    "Put the manufacturer in a column named Company (Brand or Manufacturer also work). It fills the Brand and Supplier lines on the product page, the 'Brand:' line on product cards, the search text and the brand in the page's structured data.",
    "If the file also has a Supplier (or Vendor) column, that column is shown as Supplier instead, and the company stays as Brand.",
    "The mapping default ('UNIVERSAL' or 'BIOBASE') is used only for a row that has no company at all. Before this change the larger file's Company column was not recognised, so 8,828 products showed Supplier 'UNIVERSAL' and no Brand.",
    "A product is identified by its SKU if it has one, otherwise by its name AND company. The same name from two different companies is two products, each with its own page. Example: 'Microplate Centrifuge' from BIOBASE and from Greiner Bio-One.",
    "URLs: the first product with a name keeps the plain address (/products/centrifuge-tubes). A product with the same name from another company gets the company in its address (/products/centrifuge-tubes-alpha-laboratories-ltd). Existing addresses never change on a re-import.",
    "Only a repeat of the same name from the same company is treated as a duplicate: the first row is kept and the importer prints a warning. In the current file, 141 such names have different image links; they are still treated as duplicates (first row kept).",
    "Near-duplicates such as 'Bottle Top Dispenser' (Accumax) and 'Bottle-Top Dispenser' (BIOBASE) are separate products.",
    "You can import the combined Excel file (saved as CSV) instead of the two old files: it adds no products that already exist, because identity is name plus company.",
    "Safety guard: a file with fewer than half the current number of products is refused unless you add --force (for example when importing only the small BIOBASE file).",
])
doc.add_heading("5.3 Add or update an article", 2)
numbered([
    "Copy content/articles/blood-centrifuge-bkc-tl4bii.md to a new file name.",
    "Change the header block (title, excerpt, date, author, category, tags, status: published or draft) and write the text below it.",
    "Publish the website (step 4 above).",
])
doc.add_heading("5.4 Secrets and settings kept in Vercel (not in files)", 2)
table(
    ["Variable", "Meaning"],
    [
        ["NEXT_PUBLIC_SITE_URL", "Public website address (currently https://vierapparatus.com)"],
        ["RESEND_API_KEY", "Email service key (secret). Still to be added"],
        ["INQUIRY_FROM_EMAIL", "Verified sender address, e.g. VierApparatus <inquiries@vierapparatus.com>. Still to be added"],
        ["INQUIRY_TO_EMAIL", "Inbox that receives inquiries (default info@vierapparatus.com)"],
        ["UPSTASH_REDIS_REST_URL / _TOKEN", "Optional stronger spam rate limiting"],
    ],
    [6.2, 10.8],
)

# ---------------- NEW SECTIONS (inserted before "Cautions") ----------------
import json as _json

_root = Path(__file__).resolve().parent.parent
_products = [p for p in _json.load(open(_root / "data" / "products.json", encoding="utf-8")) if p["status"] == "published"]
_n = len(_products)


def _count(key, fn=lambda x: x):
    out = {}
    for p in _products:
        k = fn(p[key]) or "(none)"
        out[k] = out.get(k, 0) + 1
    return out


_sources = _count("importSource")
_cats = _count("category")
_img_hosts = _count("imageUrl", lambda u: __import__("urllib.parse", fromlist=["urlparse"]).urlparse(u).netloc if u else None)
_placeholders = sum(1 for p in _products if p["imageUrl"] and "placeholder" in p["imageUrl"].lower())
_no_brand = sum(1 for p in _products if not p["manufacturer"])
_with_price = sum(1 for p in _products if p["price"])
_results_file = _root / "docs" / "seo-audit-results.json"
_res = _json.load(open(_results_file, encoding="utf-8")) if _results_file.exists() else None

doc.add_heading("6. Technical architecture (as implemented in this repository)", 1)
para(
    "This section describes what the code in this folder actually does. Where the project brief mentions something that "
    "is not in the code, it is listed in section 12 instead of being described as if it existed."
)
table(
    ["Layer", "What is used", "Notes"],
    [
        ["Framework / hosting", "Next.js 16.4.3 (App Router), React 19, TypeScript, Tailwind CSS 4; deployed on Vercel", "Upgraded from 16.4.0 to 16.4.3 to apply security patches (3 advisories affected 16.0.0 to 16.4.0)"],
        ["Rendering", f"Static generation: {_n:,} product pages, category hub pages, HTML directory pages, articles, sitemaps", "Only /products (filters/search), /contact (prefill) and the API routes run on demand"],
        ["Data", "No database. CSV files are imported into data/products.json (full records) and data/products-index.json (light index for search/listing), both committed to Git", "Importer: npm run import:preview / import:publish. Mapping files in data/import-mappings/"],
        ["Catalogue sources", "; ".join(f"{k}: {v:,} products" for k, v in sorted(_sources.items(), key=lambda kv: -kv[1])), f"{len(_cats)} categories, assigned by keyword rules in the mapping files"],
        ["Articles", "Markdown files with a front-matter header in content/articles/", "A malformed header fails the build instead of silently hiding the article"],
        ["Images", "Not stored on Vercel. Product images load from external hosts: " + ", ".join(f"{k} ({v:,})" for k, v in sorted(_img_hosts.items(), key=lambda kv: -kv[1])), f"{_placeholders:,} products use one shared placeholder image (1_placeholder.png)"],
        ["Image optimisation", "Turned off: images.unoptimized = true in next.config.ts", "Pages reference the image URLs directly. No requests go to /_next/image, so Vercel's Image Optimization quota is no longer consumed"],
        ["Search", "Server-side keyword matching over data/products-index.json, plus category filter, sorting and pagination", "No external search service or AI model is called"],
        ["Inquiry form", "POST /api/inquiry, validated server-side, sent through Resend to a fixed inbox", "Rate limit, honeypot, same-origin check, size limit. Needs RESEND_API_KEY and INQUIRY_FROM_EMAIL in Vercel"],
        ["Analytics", "Google Analytics 4 (gtag via @next/third-parties) and a custom tracker: browser -> POST /api/track -> Google Sheets", "/api/track ignores crawlers, checks origin, caps size, rate-limits, and writes with RAW values (no formula injection)"],
        ["Security", "CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP set in next.config.ts", "CSP explicitly allow-lists the image hosts and Google Analytics / Tag Manager domains"],
    ],
    [3.2, 7.0, 6.8],
)

doc.add_heading("7. SEO architecture", 1)
para(
    "These changes address the Ahrefs audit findings (orphan pages, long titles, short/long descriptions, structured-data "
    "errors, IndexNow). They are applied in code, so they keep working as the catalogue grows."
)
doc.add_heading("7.1 Titles and meta descriptions", 2)
bullets([
    "src/lib/seo.ts fits every title to at most 60 characters and every description to 120-155 characters. Text is cut at word boundaries, never mid-word.",
    "Long product names keep a distinguishing tail (a model/SKU, a trailing code such as (A3367), or the last words) so variants stay distinguishable: 'Potassium hydroxide - Standard… (A3367) | VierApparatus'.",
    "src/lib/product-seo.ts builds product titles and descriptions. Where the catalogue 'short description' is a raw data-sheet run (e.g. 'Formula: H3NM: 17.03 g/molCAS-No.: …'), a clean sentence from name, brand and category is used instead.",
    "The same helpers are used for category hub pages, HTML directory pages and articles. Titles are set as absolute titles so the site template cannot add a second ' | VierApparatus'.",
    "Known limit: some product families differ only in the middle of a long name, so a few titles are identical after fitting (see section 10 for the measured share).",
])
doc.add_heading("7.2 Structured data (JSON-LD)", 2)
bullets([
    "Product: name, url, @id, image (absolute URL), description, sku (supplier SKU, else model code, else internal ID), mpn (model code), brand, category, additionalProperty (specifications).",
    "offers is added ONLY when the catalogue holds a real, parseable price with an unambiguous currency (ISO code, € or £). Google requires markup to match what the page shows, and these pages show 'Price on request'.",
    f"Currently {_with_price:,} of {_n:,} products have a price, so none emit offers. Google's Product rich result needs offers, a review or a rating, so price-less pages are not eligible for that rich result. Adding real prices to the CSV 'price' column (for example 'USD 1,250.00') switches offers on automatically.",
    f"The shared placeholder image is not sent to search engines as a product photo ({_placeholders:,} products). A missing image is only a recommended-field warning; a wrong image would be misleading.",
    f"brand comes from the Company column of the import (see 5.2.1) and is only emitted when known; {_no_brand:,} products currently have no company in the source data, and none is invented.",
    "BreadcrumbList on products (Products > Category > Product) and category hubs; Organization on every page; Article on articles.",
    "I could not run Google's Rich Results Test from this environment. The audit script (scripts/seo-audit.mjs) checks the documented required fields instead; confirm in Google Search Console after deployment.",
])
doc.add_heading("7.3 Internal linking (orphan pages)", 2)
bullets([
    "Category hub pages: /products/category/<category> and /products/category/<category>/<page>. Static, indexable, 24 products per page, with real <a href> links to every product.",
    "Pagination links to every 10th page as well as the neighbours, so a 180-page category is reachable in a few clicks instead of one click per page.",
    "Related products on each product page are its 3 predecessors and 3 successors in the same category list (wrapping around). In every category with more than six products, each product therefore receives at least 6 incoming links from other product pages, and the old 'first 4 of the category' pattern that left most products unlinked is gone.",
    "Product breadcrumbs link to the category hub; home-page category tiles and a 'Browse by category' block on /products link to the hubs.",
    "/sitemap-html is now a directory index (categories + numbered pages of 500 links) instead of one page with 10,000 links.",
])
doc.add_heading("7.4 Sitemaps and robots", 2)
bullets([
    "/sitemap.xml is a sitemap index. Shards: /sitemap/0.xml (static pages, category hubs, articles) and /sitemap/1.xml, /sitemap/2.xml, ... with 5,000 products each. Google's limit is 50,000 URLs per file, so the catalogue can grow past 50,000 products without code changes.",
    "The index is a route handler at /sitemap-index.xml with a rewrite from /sitemap.xml (Next.js reserves that exact path for sitemap.ts).",
    "robots.txt disallows /api/, /products? and /contact?. Those query-string URLs are rendered on demand (one serverless run per crawl) and duplicate content that exists as static pages. The 'Request a Quotation' links on product cards are also rel=nofollow, because each one pointed to a different /contact?product=… URL (10,000+ of them).",
])

doc.add_heading("8. Staying within Vercel's free-tier limits", 1)
para(
    "Background: the Vercel account was paused after Image Optimization usage reached about 8,900 transformations against a "
    "5,000 limit (figures reported by the project owner). The table lists every measure taken in the code and what is still open."
)
table(
    ["Risk", "Measure", "Status"],
    [
        ["Image Optimization quota", "images.unoptimized = true; images served directly from external hosts", "Done and verified: no /_next/image references in page HTML, endpoint returns 404"],
        ["Daily ISR re-rendering of ~10k product pages", "revalidate = false on product pages; data changes only when the CSV is re-imported and the site is redeployed", "Done"],
        ["Function executions from crawlers on query URLs", "robots.txt disallow for /products? and /contact?; static category hubs replace filtered URLs for discovery", "Done. /products and /contact themselves are still on demand"],
        ["Function executions from analytics", "/api/track ignores crawlers on the server, the browser tracker skips bots, per-IP and global rate limits", "Done"],
        ["Cost of discovery by crawlers", "Static hub, directory and sitemap pages (built once)", "Done"],
        ["Cloudflare image caching", "images.vierapparatus.com answered with cf-cache-status: DYNAMIC and no Cache-Control when audited, so each view hit storage", "OPEN: add a Cloudflare Cache Rule (cache everything, Edge and Browser TTL at least 1 month)"],
        ["Build memory and time", f"{_n:,} product pages plus ~440 hub pages build in one run; slug lookup is now O(1)", "On this PC the build needed a folder outside OneDrive and enough free RAM; Vercel builds on its own machines"],
        ["Large JSON in functions", "products.json is about 10 MB and is read by on-demand renders", "OPEN (low risk): consider splitting if /products becomes heavy"],
    ],
    [4.0, 7.2, 5.8],
)

doc.add_heading("9. IndexNow (instant notification of changed pages)", 1)
para(
    "IndexNow tells Bing, Yandex, Naver, Seznam and other participating search engines that URLs changed. Google does not "
    "use IndexNow; it discovers changes through the sitemaps in section 7.4."
)
table(
    ["Piece", "What it does"],
    [
        ["public/<key>.txt and src/lib/indexnow.ts", "The ownership key (public by design) served at https://vierapparatus.com/<key>.txt, and the shared settings"],
        ["scripts/import-products.ts", "After every import:publish it writes data/indexnow-last-import.json listing the added, updated, restored and archived product slugs"],
        ["scripts/indexnow.ts  (npm run indexnow)", "Submits URLs in batches of up to 10,000. Options: --import, --git-articles, --recent-days N, --urls a,b, --all, --dry-run, --skip-verify. It first checks that the live key file is being served and refuses to send otherwise"],
        [".github/workflows/indexnow.yml", "Runs after a successful Production deployment (Vercel's GitHub deployment status): submits the last import if that commit changed it, plus articles changed in the commit. Can also be run by hand with chosen options"],
    ],
    [6.0, 11.0],
)
para("Typical flow after adding products:", bold=True)
numbered([
    "npm run import:publish -- data/imports/yourfile.csv",
    "Commit and push (or npx vercel deploy --prod). Wait until the new pages are live.",
    "npm run indexnow -- --import   (or let the GitHub workflow do it once the repository is connected to Vercel)",
])
para(
    "Status: built and tested with mocks and --dry-run only. Nothing has been sent to IndexNow, because the new pages are "
    "not live yet (Vercel was paused) and submitting URLs that do not exist yet would be wrong."
)

doc.add_heading("10. Verification results", 1)
if _res:
    para(
        "Measured by scripts/seo-audit.mjs, which crawls a running copy of the site from the home page and the sitemaps. "
        "'Before' is the build prior to these SEO changes; 'After' is the build with them. Strict mode ignores links that sit on "
        "the HTML sitemap pages, to measure the catalogue's own link structure."
    )
    para(
        "Note: these audit numbers were measured on the 10,295-product catalogue, before 24 same-name products from different "
        "companies were added (see 10.1). They were not re-measured."
    )
    b, a = _res["before"], _res["after"]
    bs, as_ = _res["before_strict"], _res["after_strict"]
    ic = lambda r, k: r["issueCounts"].get(k, 0)
    table(
        ["Check", "Before", "After"],
        [
            ["Pages crawled", f"{b['crawledPages']:,}", f"{a['crawledPages']:,}"],
            ["Title longer than 60 characters", f"{ic(b,'title.too-long'):,}", f"{ic(a,'title.too-long'):,}"],
            ["Meta description too long (over 160)", f"{ic(b,'description.too-long'):,}", f"{ic(a,'description.too-long'):,}"],
            ["Meta description too short (under 120)", f"{ic(b,'description.too-short'):,}", f"{ic(a,'description.too-short'):,}"],
            ["Missing title or description", f"{ic(b,'title.missing') + ic(b,'description.missing'):,}", f"{ic(a,'title.missing') + ic(a,'description.missing'):,}"],
            ["Pages sharing an identical title", f"{ic(b,'title.duplicate'):,}", f"{ic(a,'title.duplicate'):,}"],
            ["Pages sharing an identical description", f"{ic(b,'description.duplicate'):,}", f"{ic(a,'description.duplicate'):,}"],
            ["Product markup using the placeholder image", f"{ic(b,'product.placeholder-image'):,}", f"{ic(a,'product.placeholder-image'):,}"],
            ["Product markup with no image (placeholder omitted on purpose)", f"{ic(b,'product.missing-image'):,}", f"{ic(a,'product.missing-image'):,}"],
            ["Product markup without offers / review / rating", f"{ic(b,'product.needs-offers-review-or-rating'):,}", f"{ic(a,'product.needs-offers-review-or-rating'):,}"],
            ["Orphan pages, catalogue links only (strict)", f"{bs['orphanPages_noIncomingLinks']:,}", f"{as_['orphanPages_noIncomingLinks']:,}"],
            ["Sitemap pages unreachable from home (strict)", f"{bs['sitemapPages_unreachableFromHome']:,}", f"{as_['sitemapPages_unreachableFromHome']:,}"],
            ["Maximum click depth (strict)", f"{bs['maxClickDepth']}", f"{as_['maxClickDepth']}"],
            ["Pages deeper than 3 clicks (strict)", f"{bs['sitemapPagesDeeperThan3Clicks']:,}", f"{as_['sitemapPagesDeeperThan3Clicks']:,}"],
            ["Distinct /contact?product=… URLs linked from pages", f"{b.get('distinctContactQueryUrlsLinked', 0):,}", f"{a.get('distinctContactQueryUrlsLinked', 0):,} (nofollow, disallowed in robots.txt)"],
        ],
        [8.0, 4.5, 4.5],
    )
    para("How to read these numbers:", bold=True)
    bullets([
        "Identical titles went UP (0 to 1,193 pages) because of the length fix: before, titles were unique only because they were far too long. Product families whose names differ only in the middle (for example 'Non-filtered, Non-sterile' versus 'Non-filtered, Sterile') can no longer be told apart in 60 characters. Ahrefs did not list this as an issue; it can be reduced further with a collision-aware title rule if wanted.",
        "Product markup still lacks offers / review / rating on every page because the catalogue has no prices (see 7.2). This is the remaining part of the 'rich results validation' finding and cannot be removed without real price or review data.",
        "Pages with no image in the markup are the products whose only image is the shared placeholder. Sending the placeholder as the product photo would be misleading, so it is omitted; real photos in the image column fix this.",
        "Most pages are still four or more clicks from the home page, which is normal for a 10,000-product catalogue. What changed is that none is stranded: the deepest page is 7 clicks away (was 93) and none is deeper than 10 (was 5,687).",
    ])
else:
    para("Audit results file (docs/seo-audit-results.json) was not found when this document was generated.")
para("Other checks that passed on the final build:", bold=True)
bullets([
    f"TypeScript check, ESLint on the whole project and {TEST_COUNT} automated tests (including tests that run over all published products for title length, description length, structured data and orphan-freedom).",
    "Production build exit code 0; 439 category hub pages, 21 directory pages and 4 sitemap files generated (counts from the SEO build; see the note under 'Brand, supplier and same-name products' below for the later catalogue change).",
    f"Sitemap shards contain exactly the published products ({_n:,}) with no duplicates; robots.txt, the sitemap index and the IndexNow key file respond correctly.",
])
para(
    "Not verified: Google's Rich Results Test and Search Console (need the live site), Lighthouse / Core Web Vitals, and a real "
    "IndexNow submission.",
    bold=True,
)

doc.add_heading("10.1 Brand, supplier and same-name products (catalogue fix)", 2)
para(
    "Problem: product pages showed Supplier 'UNIVERSAL' (a default) instead of the real manufacturer, because the importer did not "
    "recognise the Company column, and products with the same name from different companies overwrote each other."
)
table(
    ["Item", "Result"],
    [
        ["Products before / after", f"10,295 / {_n:,} (24 products that had been overwritten or skipped are back)"],
        ["Supplier 'UNIVERSAL' on product pages", "8,828 before / 0 after"],
        ["Products with no company", "8,828 before / 0 after"],
        ["Existing product addresses and ids", "All 10,295 unchanged (the importer reported them as unchanged)"],
        ["Check against Product Vier Test.xlsx", "Every (name, company) pair in the Excel file is on the site and nothing extra: 0 missing, 0 extra"],
        ["Unique ids and unique page addresses", f"{_n:,} of {_n:,}"],
        ["Automated tests", f"{TEST_COUNT} pass, including new tests for the Company column, same name from different companies, and keeping old ids"],
        ["Build and local server", BUILD_NOTE],
    ],
    [6.0, 11.0],
)
bullets([
    "Example: /products/ultra-low-temperature-systems now shows Brand MéCour and Supplier MéCour; all 7 MéCour products are found by searching 'MéCour'.",
    "Example of a same-name pair kept separate: Centrifuge Tubes from Accumax (/products/centrifuge-tubes) and from Alpha Laboratories (/products/centrifuge-tubes-alpha-laboratories-ltd).",
    "Not changed: 141 product names that repeat within the same company with different image links are still treated as duplicates (first row kept). If they are really different products, the rule can be widened to include the image link; that would add pages.",
    "Search engines: the 24 new pages are new addresses. After deploying, run npm run indexnow -- --import to notify IndexNow (the changed brand text on 8,828 existing pages is not listed there unless you re-run the import as an update).",
])

doc.add_heading("11. How to run the SEO audit yourself", 1)
numbered([
    "Build and start the site: npm run build, then npm start (default port 3000).",
    "In a second terminal: node scripts/seo-audit.mjs http://localhost:3000 mylabel   (add --strict to ignore the HTML sitemap links).",
    "Read the summary in the terminal; full details with sample URLs are saved to .tmp/seo-audit-mylabel.json.",
    "On a low-memory Windows PC keep the project outside OneDrive when building, and close other heavy programs.",
])

doc.add_heading("12. Items in the project brief that are NOT in this codebase", 1)
para(
    "The brief for the SEO work described two things that could not be found in the repository. They are listed here so the "
    "documentation does not claim more than the code does:"
)
bullets([
    "Hybrid search-intent architecture (Gemini Flash plus database filtering): no Gemini or other AI-model call, API key or search-intent code exists in this repository. Search is plain keyword matching over data/products-index.json (section 6). If this feature lives in another project or branch, point me to it and it can be documented.",
    "Supabase: there is no Supabase client, configuration or environment variable. The project's own image host is images.vierapparatus.com. The owner describes it as Cloudflare R2 storage; the code only shows that it is served through Cloudflare (Server: cloudflare). The conversion of images to WebP happened outside this repository (the sample files it serves are image/webp).",
    "Route name: the brief mentions app/equipment/[slug]/page.tsx. The product route in this project is app/products/[slug]/page.tsx (URL /products/<slug>); category pages are app/products/category/[slug]/[[...page]]/page.tsx.",
])

doc.add_heading("13. Cautions", 1)
bullets([
    "Edit text between tags only; do not delete the < > symbols, curly braces { } or quotes. If the site fails to build, Vercel keeps the previous version live and the build log names the problem.",
    "Do not hand-edit data/products.json or products-index.json; rerun the importer instead.",
    "Never paste passwords or API keys into any file in this folder.",
    "Rollback: Vercel → Deployments → choose a previous good deployment → Promote to Production.",
    "Revoke any access token you shared in chat once you no longer need it.",
])

out = Path(__file__).resolve().parent.parent / "docs"
out.mkdir(exist_ok=True)
path = out / "VierApparatus_Website_Documentation.docx"
doc.save(path)
print(path)

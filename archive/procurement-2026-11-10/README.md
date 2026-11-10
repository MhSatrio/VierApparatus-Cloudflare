# Procurement-era product catalogue (retired 10 Nov 2026)

The static, quotation-oriented product catalogue (10,319 records read from `data/products.json`, a phone/WhatsApp quotation form,
an HTML sitemap and the `ENABLE_PRODUCTS` build switch) was replaced by the database-backed **Product review** platform
(`src/lib/products/`, `src/lib/store/products.ts`, `/products`, `/admin/products`).

Nothing here is built (the folder is excluded in tsconfig). It is kept so that nothing is lost and so that the old code can be read.
The records themselves were imported into the `products` table by `npm run products:legacy`: the 1,476 BIOBASE records stay
published, every other record is archived (restorable in the Product Manager). `data/products.json` is still the source file of that import.

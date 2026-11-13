# Product sync: how to add products

Put a CSV file in this folder, then run one command. The products appear on the site without a redeploy, because the site reads the database on every request.

## Steps

1. Save the file as **CSV (UTF-8)**. From Excel: File > Save As > CSV UTF-8. Keep one file per batch.
2. Check the dry run (writes nothing):
   ```
   npm run products:sync -- --target local
   ```
3. When the numbers look right, write to the local copy and then to the live database:
   ```
   npm run products:sync -- --target local --commit
   npm run products:sync -- --target live --commit
   ```
   The live run changes the site straight away. The live database must have the new tables first (see the deploy steps).

## Columns

The header names are matched loosely (upper or lower case, spaces ignored). Recognised names:

| Column | Used for |
|---|---|
| `name` (required) | Product name |
| `Company` or `manufacturer` | Manufacturer. Rows without one are not imported |
| `slug` | Matches an existing product by address. Without it, the address is made from the name |
| `R2 Link` or `r2image` | The picture. It must be a link on our image domain (images.vierapparatus.com). Other addresses are ignored |
| `feature` or `description` | Full description (up to 8,000 characters) |
| `summary` or `shortdescription` | One-sentence summary. If missing, the first sentence of the description is used |
| `category` | Category. Missing: the existing category, or "Uncategorised" for new products |
| `modelnumber` | Model number |
| `publicationstatus` | `draft`, `published`, `archived`. Missing: existing products keep theirs; new BIOBASE products are published; other new products are drafts |

Any other column is ignored (the dry run lists them).

## Rules

- **Images are never uploaded from here.** Upload them through the admin (they are converted to WebP and stored in R2), or put the R2 link in the `R2 Link` column.
- A row with no R2 picture is still imported; the product shows a placeholder until a picture is added.
- A row whose slug or manufacturer and model match an existing product **updates** it. Empty cells do not erase what is there.
- Duplicate rows inside one file are counted and skipped.
- A product that is not published does not appear on the site. To publish a batch, add `publicationstatus = published`.
- Files in this folder are not committed to Git (see `.gitignore`).

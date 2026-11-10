import { z } from "zod";

/** Normalized internal product schema. Shared by the importer and the website. */
export const productSchema = z.object({
  id: z.string().min(1),
  sku: z.string().nullable(),
  modelCode: z.string().nullable(),
  name: z.string().min(2).max(250),
  slug: z.string().min(1).max(200),
  category: z.string().min(1),
  subcategory: z.string().nullable(),
  manufacturer: z.string().nullable(),
  supplier: z.string().nullable(),
  shortDescription: z.string().nullable(),
  description: z.string().nullable(),
  specifications: z.array(z.object({ label: z.string(), value: z.string() })),
  imageUrl: z.string().url().nullable(),
  datasheetUrl: z.string().url().nullable(),
  sourceUrl: z.string().url().nullable(),
  price: z.string().nullable(),
  availability: z.string().nullable(),
  originCountry: z.string().nullable(),
  importSource: z.string(),
  updatedAt: z.string(),
  status: z.enum(["published", "archived"]),
  keywords: z.array(z.string()),
});

export type Product = z.infer<typeof productSchema>;

/** Light record used for listing/search so list pages never load full descriptions. */
export type ProductSummary = Pick<
  Product,
  "id" | "slug" | "name" | "category" | "manufacturer" | "shortDescription" | "imageUrl" | "modelCode" | "sku"
> & { search: string };

/** URL slug for a product category, e.g. "Incubators, Ovens & Baths" -> "incubators-ovens-and-baths". */
export const categorySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Text placed in the inquiry form's "Product name or SKU" field. Always includes the name and SKU/model when known. */
export function productInquiryLabel(p: { name: string; sku?: string | null; modelCode?: string | null }): string {
  if (p.sku) return `${p.name} (SKU ${p.sku})`.slice(0, 300);
  if (p.modelCode && !p.name.includes(p.modelCode)) return `${p.name} (Model ${p.modelCode})`.slice(0, 300);
  return p.name.slice(0, 300);
}

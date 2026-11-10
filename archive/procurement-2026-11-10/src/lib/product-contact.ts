/**
 * Contact details used ONLY by the switched-off product catalogue (quotation form and call-to-action). They are not part of
 * the public site: with ENABLE_PRODUCTS off nothing imports this file, so it is not in the build. Remove or change these
 * before switching the product catalogue back on.
 */
export const productContact = {
  phoneDisplay: "+62 822-1024-0790",
  phoneTel: "+6282210240790",
  whatsappNumber: "6282210240790",
} as const;

export const whatsappLink = (text?: string) => `https://wa.me/${productContact.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

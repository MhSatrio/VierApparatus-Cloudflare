export const site = {
  name: "VierApparatus",
  tagline: "Your global partner for laboratory equipment sourcing and procurement.",
  description:
    "VierApparatus is an international laboratory equipment sourcing and procurement partner. We help universities, research laboratories and companies source equipment from suppliers worldwide, with quotation comparison, supplier coordination, quality-check coordination and documentation support.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  email: "info@vierapparatus.com",
  phoneDisplay: "+62 822-1024-0790",
  phoneTel: "+6282210240790",
  whatsappNumber: "6282210240790",
  address: "Jl. Padang Udayana Gg. X, Padangsambian, Kec. Denpasar Bar., Kota Denpasar, Bali 80117, Indonesia",
  founder: "Muhammad Satrio",
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
] as const;

export const PRODUCTS_PER_PAGE = 24;

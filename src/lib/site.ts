/** Public identity. The only public contact detail is the e-mail address (no phone, WhatsApp or street address). */
export const site = {
  name: "VierApparatus",
  tagline: "Science should be accessible.",
  description:
    "VierApparatus is an independent science publication: clear, evidence-based articles on biotechnology, microbiology, research methods and the questions around them.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  email: "info@vierapparatus.com",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/topics", label: "Topics" },
  { href: "/module", label: "Modules" },
  { href: "/products", label: "Products" },
  { href: "/software", label: "Software" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const ARTICLES_PER_PAGE = 12;

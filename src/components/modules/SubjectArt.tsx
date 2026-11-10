/**
 * A small line illustration for each subject, drawn in the brand colours. Pure SVG, no image files, so they cost no requests and
 * stay sharp at any size. Decorative: the subject name always sits next to them.
 */
export function SubjectArt({ slug, className = "h-14 w-14" }: { slug: string; className?: string }) {
  const common = { viewBox: "0 0 64 64", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className, "aria-hidden": true };
  switch (slug) {
    case "bio": // DNA double helix
      return (
        <svg {...common}>
          <path d="M20 6c0 14 24 14 24 26s-24 12-24 26" />
          <path d="M44 6c0 14-24 14-24 26s24 12 24 26" />
          <path d="M23 14h18M21 24h22M21 40h22M23 50h18" />
        </svg>
      );
    case "chem": // flask
      return (
        <svg {...common}>
          <path d="M26 6h12M28 6v16L12 50a5 5 0 0 0 4.5 8h31a5 5 0 0 0 4.5-8L36 22V6" />
          <path d="M19 40h26" />
          <circle cx="30" cy="48" r="1.5" />
          <circle cx="38" cy="45" r="1.5" />
        </svg>
      );
    case "phys": // atom
      return (
        <svg {...common}>
          <ellipse cx="32" cy="32" rx="26" ry="10" />
          <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(120 32 32)" />
          <circle cx="32" cy="32" r="3.5" fill="currentColor" />
        </svg>
      );
    case "math": // a curve on axes, with a sigma
      return (
        <svg {...common}>
          <path d="M8 8v48h48" />
          <path d="M12 46c8-4 12-30 22-30s10 26 22 22" />
          <path d="M44 12h8l-5 6 5 6h-8" />
        </svg>
      );
    case "cs": // code brackets and a chip
      return (
        <svg {...common}>
          <path d="M22 18 8 32l14 14M42 18l14 14-14 14" />
          <path d="m36 12-8 40" />
        </svg>
      );
    case "stats": // bars and a trend line
      return (
        <svg {...common}>
          <path d="M8 56h48" />
          <path d="M14 56V38M26 56V28M38 56V34M50 56V18" />
          <path d="m12 24 14-8 12 6 14-12" />
        </svg>
      );
    case "biomed":
    case "biomedical-sciences": // a cross with a pulse line
      return (
        <svg {...common}>
          <rect x="8" y="8" width="48" height="48" rx="10" />
          <path d="M14 34h10l4-10 8 18 4-8h10" />
        </svg>
      );
    case "bioinf":
    case "bioinformatics": // sequence lines and a database
      return (
        <svg {...common}>
          <ellipse cx="22" cy="14" rx="14" ry="6" />
          <path d="M8 14v22c0 3.3 6.3 6 14 6M36 14v8" />
          <path d="M8 25c0 3.3 6.3 6 14 6" />
          <path d="M34 36h22M34 44h22M34 52h14" />
        </svg>
      );
    case "compbio":
    case "computational-biology": // a network
      return (
        <svg {...common}>
          <circle cx="32" cy="12" r="5" />
          <circle cx="12" cy="44" r="5" />
          <circle cx="52" cy="44" r="5" />
          <circle cx="32" cy="34" r="4" />
          <path d="m29 16.5-14 23M35 16.5l14 23M17 44h30M32 17v13M16 41l13-5M48 41l-13-5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="22" />
        </svg>
      );
  }
}

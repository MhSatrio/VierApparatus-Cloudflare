/**
 * One line icon per Biology specialization, drawn in the same style as SubjectArt (64×64 grid, 2.5 stroke, round caps, the
 * brand colour through currentColor). Original artwork, no image files, so it costs no requests and stays sharp at any size.
 * Decorative: the specialization name always sits next to it. Unknown slugs get a plain ring.
 */
export function SpecArt({ slug, className = "h-14 w-14" }: { slug: string; className?: string }) {
  const common = { viewBox: "0 0 64 64", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className, "aria-hidden": true };
  switch (slug) {
    case "general-biology": // a sprout
      return (<svg {...common}><path d="M32 56V30" /><path d="M32 32c0-9-6-14-16-14 0 9 6 14 16 14Z" /><path d="M32 30c0-7 5-12 14-12 0 7-5 12-14 12Z" /><path d="M16 56h32" /></svg>);
    case "molecular-biology": // a ring of bonded atoms
      return (<svg {...common}><path d="M32 8 50 18v22L32 50 14 40V18Z" /><circle cx="32" cy="8" r="3" /><circle cx="50" cy="40" r="3" /><circle cx="14" cy="40" r="3" /><path d="M32 22v8" /></svg>);
    case "cell-biology": // a cell with a nucleus and organelles
      return (<svg {...common}><ellipse cx="32" cy="32" rx="24" ry="20" /><circle cx="30" cy="30" r="7" /><circle cx="46" cy="22" r="2" fill="currentColor" /><circle cx="18" cy="42" r="2" fill="currentColor" /><circle cx="46" cy="44" r="2" fill="currentColor" /></svg>);
    case "genetics-and-genomics": // an X chromosome
      return (<svg {...common}><path d="M22 8c0 14 20 14 20 24S22 46 22 56" /><path d="M42 8c0 14-20 14-20 24s20 14 20 24" /></svg>);
    case "biochemistry": // a benzene ring with a double bond
      return (<svg {...common}><path d="M32 8 52 20v24L32 56 12 44V20Z" /><path d="M32 16 45 24v16l-13 8-13-8V24Z" /></svg>);
    case "microbiology": // a rod-shaped bacterium with a flagellum
      return (<svg {...common}><rect x="10" y="24" width="30" height="16" rx="8" /><path d="M40 32c4-4 8 4 12 0s6 0 8 0" /></svg>);
    case "botany-and-plant-biology": // a leaf with its midrib
      return (<svg {...common}><path d="M12 52C12 26 28 10 54 10c0 26-16 42-42 42Z" /><path d="M12 52 38 26" /></svg>);
    case "zoology-and-animal-biology": // a fish
      return (<svg {...common}><path d="M10 32c8-12 22-14 32 0-10 14-24 12-32 0Z" /><path d="M42 32 54 22v20L42 32" /><circle cx="22" cy="30" r="1.5" fill="currentColor" /></svg>);
    case "human-anatomy-and-physiology": // a standing figure
      return (<svg {...common}><circle cx="32" cy="12" r="5" /><path d="M24 24h16l-2 18h-3v14h-4V42h-2v14h-4V42h-3L24 24Z" /></svg>);
    case "developmental-biology": // a cell dividing into two
      return (<svg {...common}><circle cx="20" cy="32" r="10" /><circle cx="44" cy="32" r="10" /><path d="M32 22v20" strokeDasharray="2 4" /></svg>);
    case "evolutionary-biology": // a branching tree
      return (<svg {...common}><path d="M32 56V34" /><path d="M32 34 16 20" /><path d="M32 34 48 20" /><path d="M16 20V10M16 20 8 14M48 20V10M48 20l8-6" /><circle cx="16" cy="8" r="2" fill="currentColor" /><circle cx="48" cy="8" r="2" fill="currentColor" /></svg>);
    case "ecology-and-environmental-biology": // a globe with meridians
      return (<svg {...common}><circle cx="32" cy="32" r="22" /><path d="M10 32h44" /><ellipse cx="32" cy="32" rx="10" ry="22" /></svg>);
    case "biomedical-sciences": // a capsule
      return (<svg {...common}><rect x="8" y="22" width="48" height="20" rx="10" transform="rotate(-30 32 32)" /><path d="m32 22 0 20" transform="rotate(-30 32 32)" /></svg>);
    case "medical-biology": // a drop with a cross
      return (<svg {...common}><path d="M32 8c10 14 16 22 16 30a16 16 0 0 1-32 0c0-8 6-16 16-30Z" /><path d="M32 30v14M25 37h14" /></svg>);
    case "immunology": // a shield with an antibody
      return (<svg {...common}><path d="M32 8 52 15v16c0 12-9 21-20 25-11-4-20-13-20-25V15Z" /><path d="M26 22l6 8 6-8M32 30v12" /></svg>);
    case "neuroscience": // a neuron
      return (<svg {...common}><circle cx="24" cy="26" r="7" /><path d="M31 26 52 12M24 33 14 52M20 20 10 12M28 33l14 8" /><circle cx="52" cy="12" r="2" fill="currentColor" /><circle cx="14" cy="52" r="2" fill="currentColor" /></svg>);
    case "bioinformatics": // sequence blocks
      return (<svg {...common}><rect x="8" y="10" width="12" height="12" rx="3" /><rect x="26" y="10" width="12" height="12" rx="3" /><rect x="44" y="10" width="12" height="12" rx="3" /><rect x="8" y="42" width="12" height="12" rx="3" /><rect x="26" y="42" width="12" height="12" rx="3" /><path d="M50 34v8M46 46l4-4 4 4" /></svg>);
    case "computational-biology": // a network graph
      return (<svg {...common}><circle cx="32" cy="14" r="5" /><circle cx="12" cy="44" r="5" /><circle cx="52" cy="44" r="5" /><circle cx="32" cy="36" r="4" /><path d="M29 18 14 40M35 18l15 22M17 44h30M32 19v13" /></svg>);
    case "biophysics": // light refracted through a prism
      return (<svg {...common}><path d="M24 10c-7 11-7 33 0 44" /><path d="M40 10c7 11 7 33 0 44" /><path d="M6 32h52" strokeDasharray="2 4" /><path d="M6 22h12M6 42h12" /></svg>);
    case "biostatistics": // a bell curve on axes
      return (<svg {...common}><path d="M8 8v48h48" /><path d="M12 48C22 46 26 12 32 12s10 34 20 36" /></svg>);
    case "systems-biology": // a feedback loop between nodes
      return (<svg {...common}><path d="M52 32a20 20 0 1 1-6-14" /><path d="M50 8v10H40" /><circle cx="32" cy="32" r="4" fill="currentColor" /></svg>);
    case "synthetic-biology": // building blocks
      return (<svg {...common}><rect x="10" y="38" width="20" height="16" rx="3" /><rect x="34" y="38" width="20" height="16" rx="3" /><rect x="22" y="14" width="20" height="16" rx="3" /></svg>);
    case "biotechnology": // a bioreactor vessel with a stirrer
      return (<svg {...common}><path d="M16 14h32v26c0 6-6 10-16 10s-16-4-16-10Z" /><path d="M32 6v24M24 30h16" /><path d="M16 28h32" /></svg>);
    case "structural-biology": // a three-dimensional cube
      return (<svg {...common}><path d="M32 8 52 18v22L32 50 12 40V18Z" /><path d="M12 18 32 28l20-10M32 28v22" /></svg>);
    case "molecular-medicine": // a molecule with a cross
      return (<svg {...common}><circle cx="22" cy="32" r="8" /><circle cx="44" cy="20" r="5" /><circle cx="46" cy="46" r="5" /><path d="M30 28 39 22M29 36l12 7" /></svg>);
    case "cancer-biology": // a cell whose nuclei keep multiplying
      return (<svg {...common}><circle cx="32" cy="32" r="22" /><circle cx="25" cy="27" r="4" /><circle cx="39" cy="26" r="4" /><circle cx="33" cy="40" r="4" /></svg>);
    case "pharmacology": // a split pill
      return (<svg {...common}><rect x="6" y="22" width="52" height="20" rx="10" /><path d="M32 22v20" /></svg>);
    case "toxicology": // a warning triangle with a drop
      return (<svg {...common}><path d="M32 10 56 52H8Z" /><path d="M32 26c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" /></svg>);
    case "marine-biology": // waves
      return (<svg {...common}><path d="M6 24c6-6 10-6 16 0s10 6 16 0 10-6 16 0" /><path d="M6 36c6-6 10-6 16 0s10 6 16 0 10-6 16 0" /><path d="M6 48c6-6 10-6 16 0s10 6 16 0 10-6 16 0" /></svg>);
    case "agricultural-biology": // a wheat ear
      return (<svg {...common}><path d="M32 56V14" /><path d="M32 18c-4-4-4-8 0-10 4 2 4 6 0 10Z" /><path d="M32 30c-6-2-8-6-6-10 6 2 8 6 6 10Z" /><path d="M32 30c6-2 8-6 6-10-6 2-8 6-6 10Z" /><path d="M32 42c-6-2-8-6-6-10 6 2 8 6 6 10Z" /><path d="M32 42c6-2 8-6 6-10-6 2-8 6-6 10Z" /></svg>);
    case "plant-biotechnology": // a leaf with a circuit node
      return (<svg {...common}><path d="M12 48C12 24 26 12 50 12c0 24-14 36-38 36Z" /><path d="M12 48 34 26" /><circle cx="46" cy="40" r="4" /><path d="M46 36v-6" /></svg>);
    case "conservation-biology": // a shield with a leaf
      return (<svg {...common}><path d="M32 8 52 15v16c0 12-9 21-20 25-11-4-20-13-20-25V15Z" /><path d="M24 40c0-10 6-16 16-16 0 10-6 16-16 16Z" /></svg>);
    case "astrobiology": // a ringed planet
      return (<svg {...common}><circle cx="30" cy="34" r="12" /><ellipse cx="30" cy="34" rx="24" ry="7" transform="rotate(-18 30 34)" /><circle cx="52" cy="10" r="2" fill="currentColor" /></svg>);
    case "mathematical-biology": // a logistic growth curve
      return (<svg {...common}><path d="M8 8v48h48" /><path d="M12 48C22 46 30 14 52 12" /><path d="M12 40h12" strokeDasharray="2 4" /></svg>);
    case "other-emerging-biological-disciplines": // a sparkle
      return (<svg {...common}><path d="M32 8c2 12 4 14 16 16-12 2-14 4-16 16-2-12-4-14-16-16 12-2 14-4 16-16Z" /><path d="M50 42c1 5 2 6 6 7-4 1-5 2-6 7-1-5-2-6-6-7 4-1 5-2 6-7Z" /></svg>);
    default:
      return (<svg {...common}><circle cx="32" cy="32" r="22" /></svg>);
  }
}

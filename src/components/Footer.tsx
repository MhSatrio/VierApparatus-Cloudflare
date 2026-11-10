import Link from "next/link";
import { Logo } from "./Logo";
import { brand } from "@/lib/brand";
import { navLinks, site } from "@/lib/site";

/** Every footer link, in order. Split into two columns of five so the list stays short on the page. */
const explore = [
  ...navLinks,
  { href: "/contribute", label: "Join as contributor" },
  { href: "/privacy", label: "Privacy notice" },
];
const half = Math.ceil(explore.length / 2);

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo variant="white" height={52} />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/80">
            An independent science publication. Evidence first, jargon second.
          </p>
          <figure className="mt-6 max-w-sm border-l-2 border-sky/60 pl-4">
            <blockquote className="text-lg italic text-white">
              {brand.sapere.quote} <span className="not-italic text-white/80">{brand.sapere.translation}</span>
            </blockquote>
            <figcaption className="mt-1 text-sm text-white/70">{brand.sapere.explanation}</figcaption>
          </figure>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sky">Explore</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-6">
            {[explore.slice(0, half), explore.slice(half)].map((column, c) => (
              <ul key={c} className="space-y-1">
                {column.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-block py-1.5 text-white/90 hover:text-sky">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </nav>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sky">Contact</h2>
          <p className="mt-4 text-[0.95rem] text-white/90">
            Questions, corrections, partnerships or article ideas:
          </p>
          <p className="mt-2">
            <a className="text-white underline underline-offset-4 hover:text-sky" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-5 text-sm text-white/70">© {new Date().getFullYear()} VierApparatus.</p>
      </div>
    </footer>
  );
}

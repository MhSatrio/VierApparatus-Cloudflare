import Link from "next/link";
import { Logo } from "./Logo";
import { navLinks, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <Logo variant="white" height={52} />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/80">
            International laboratory equipment sourcing and procurement support: supplier coordination, quality-check
            coordination and documentation assistance.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sky">Pages</h2>
          <ul className="mt-4 space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 text-white/90 hover:text-sky">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="inline-block py-1.5 text-white/90 hover:text-sky">
                Privacy notice
              </Link>
            </li>
            <li>
              <Link href="/sitemap-html" className="inline-block py-1.5 text-white/90 hover:text-sky">
                Product Directory
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sky">Contact</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem] text-white/90">
            <li>
              <a className="hover:text-sky" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-sky" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>{" "}
              ·{" "}
              <a className="underline hover:text-sky" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li className="text-white/80">{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-5 text-sm text-white/70">
          © {new Date().getFullYear()} VierApparatus.
        </p>
      </div>
    </footer>
  );
}
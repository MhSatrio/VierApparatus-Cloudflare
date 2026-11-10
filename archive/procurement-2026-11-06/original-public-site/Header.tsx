import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { navLinks } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur-sm">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="VierApparatus home" className="shrink-0">
          <Logo height={44} />
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="py-2 font-medium text-ink hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="btn btn-primary btn-sm hidden md:inline-flex">
          Request a Quotation
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}

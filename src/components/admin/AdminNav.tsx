"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** `secondary` items sit below a divider (inbox-style pages that are not part of the editorial core). */
export type NavItem = { href: string; label: string; badge?: number; secondary?: boolean };

export function AdminNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`));
  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {items.map((i, idx) => (
        <div key={i.href} className={i.secondary && !items[idx - 1]?.secondary ? "mt-2 border-t border-ink/10 pt-2" : undefined}>
        <Link
          href={i.href}
          aria-current={active(i.href) ? "page" : undefined}
          className="flex min-h-11 items-center justify-between rounded-lg px-3 font-medium text-ink hover:bg-sky/60 aria-[current=page]:bg-brand aria-[current=page]:text-white"
        >
          <span>{i.label}</span>
          {!!i.badge && (
            <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-xs text-white" aria-label={`${i.badge} waiting`}>
              {i.badge}
            </span>
          )}
        </Link>
        </div>
      ))}
    </nav>
  );
}

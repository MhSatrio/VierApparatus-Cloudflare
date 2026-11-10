import Link from "next/link";

const ITEMS = [
  { key: "table", href: "/admin/products", label: "Products" },
  { key: "import", href: "/admin/products/import", label: "Import" },
  { key: "comments", href: "/admin/products/comments", label: "Comments" },
  { key: "texts", href: "/admin/products/texts", label: "Page texts" },
] as const;

/** The sections of the Product Manager, as a row of links above each of its pages. */
/** A contributor sees only the table (their own products) and the editor; the other sections are the owner's. */
export function ProductSubNav({ current, pending = 0, owner = true }: { current: (typeof ITEMS)[number]["key"] | "editor"; pending?: number; owner?: boolean }) {
  return (
    <nav aria-label="Product Manager" className="mb-6 flex flex-wrap gap-2">
      {ITEMS.filter((i) => owner || i.key === "table").map((i) => (
        <Link
          key={i.key}
          href={i.href}
          aria-current={current === i.key ? "page" : undefined}
          className="inline-flex min-h-9 items-center gap-2 rounded-md border border-ink/25 px-3 text-sm font-medium hover:border-brand aria-[current=page]:border-brand aria-[current=page]:bg-brand aria-[current=page]:text-white"
        >
          {i.label}
          {i.key === "comments" && pending > 0 && <span className="rounded-full bg-ink px-2 py-0.5 text-xs text-white">{pending}</span>}
        </Link>
      ))}
    </nav>
  );
}

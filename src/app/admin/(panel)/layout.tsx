import Link from "next/link";
import { AdminNav, type NavItem } from "@/components/admin/AdminNav";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { Logo } from "@/components/Logo";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { viewerOf } from "@/lib/planner-http";
import { collabSummary } from "@/lib/store/planner";
import { countPendingComments } from "@/lib/store/product-comments";
import { listInquiries, listSubmissions } from "@/lib/store/submissions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const s = await requirePage();
  const owner = s.user.role === "owner";

  let pending = 0;
  let unread = 0;
  let collabBadge = 0;
  let pendingComments = 0;
  const collab = can(s.user, "collab.access");
  const [subs, inq, sum, comments] = await Promise.all([
    owner ? listSubmissions({ perPage: 1 }).then((r) => r.pending) : 0,
    owner ? listInquiries({ perPage: 1 }).then((r) => r.unread) : 0,
    collab ? collabSummary(viewerOf(s.user)) : null,
    owner ? countPendingComments() : 0,
  ]).catch(() => [0, 0, null, 0] as const);
  pending = subs;
  unread = inq;
  pendingComments = comments;
  // The badge is "what needs YOU": the owner reviews submitted work, a contributor revises what was sent back.
  if (sum) collabBadge = owner ? sum.inReview : sum.revision;

  const items: NavItem[] = owner
    ? [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/planner", label: "Planner" },
        { href: "/admin/curriculum", label: "Curriculum" },
        { href: "/admin/articles", label: "Article Management" },
        { href: "/admin/products", label: "Product Manager", badge: pendingComments },
        { href: "/admin/collab", label: "Collab", badge: collabBadge },
        { href: "/admin/contributors", label: "Contributors" },
        { href: "/admin/sponsors", label: "Sponsor Management" },
        { href: "/admin/subscribers", label: "Newsletter Subscribers" },
        { href: "/admin/analytics", label: "Analytics" },
        { href: "/admin/connector", label: "Website connector" },
        { href: "/admin/settings", label: "Settings" },
        { href: "/admin/categories", label: "Topics", secondary: true },
        { href: "/admin/submissions", label: "Proposals", badge: pending, secondary: true },
        { href: "/admin/inquiries", label: "Messages", badge: unread, secondary: true },
      ]
    : [
        { href: "/admin", label: "Dashboard" },
        ...(collab ? [{ href: "/admin/collab", label: "Collab", badge: collabBadge }] : []),
        // Each contributor menu item appears only with its permission; the page itself checks the same permission.
        ...(can(s.user, "articles.write") ? [{ href: "/admin/articles", label: "Article Management" }] : []),
        ...(can(s.user, "modules.write") ? [{ href: "/admin/modules", label: "Modules" }] : []),
        ...(can(s.user, "products.write") ? [{ href: "/admin/products", label: "Products" }] : []),
        { href: "/admin/settings", label: "Settings" },
      ];

  return (
    <AdminProvider csrf={s.csrf} user={{ id: s.user.id, name: s.user.name, email: s.user.email, role: s.user.role, permissions: s.user.permissions }}>
      <div className="lg:grid lg:grid-cols-[15rem_1fr]">
        <aside className="border-b border-ink/10 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-4 py-3 lg:block lg:shrink-0 lg:px-5 lg:py-5">
            <Link href="/admin" aria-label="Admin home">
              <Logo height={34} />
            </Link>
            <details className="lg:hidden">
              <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-ink/20 px-3 font-medium">Menu</summary>
              <div className="absolute inset-x-0 z-30 mt-3 border-y border-ink/10 bg-white p-3 shadow-card">
                <AdminNav items={items} />
              </div>
            </details>
          </div>
          <div className="hidden px-3 pb-3 lg:block lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            <AdminNav items={items} />
          </div>
          <div className="hidden border-t border-ink/10 px-5 py-4 text-sm lg:block lg:shrink-0">
            <p className="font-medium">{s.user.name}</p>
            <p className="text-ink/70">{owner ? "Owner" : "Contributor"}</p>
            {/* Sign out lives in Settings. The live site link stays at the bottom of the menu. */}
            <div className="mt-2">
              <Link href="/" className="font-medium text-brand underline underline-offset-4">
                View live site
              </Link>
            </div>
          </div>
        </aside>
        <main id="main" className="min-w-0 px-4 py-6 sm:px-8 sm:py-8">
          {children}
          <p className="mt-10 border-t border-ink/10 pt-4 text-sm text-ink/70 lg:hidden">
            Signed in as {s.user.name} ·{" "}
            <Link href="/" className="text-brand underline underline-offset-4">
              View live site
            </Link>{" "}
            · <Link href="/admin/settings" className="text-brand underline underline-offset-4">Settings and sign out</Link>
          </p>
        </main>
      </div>
    </AdminProvider>
  );
}

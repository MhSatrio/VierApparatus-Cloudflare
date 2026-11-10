import { AdminProvider } from "@/components/admin/AdminProvider";
import { LogoutButton } from "@/components/admin/AuthForms";
import { Logo } from "@/components/Logo";
import { requirePage } from "@/lib/auth/guard";

/** Pages a signed-in user must be able to reach even before the temporary password has been replaced. */
export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const s = await requirePage({ allowMustChange: true });
  return (
    <AdminProvider csrf={s.csrf} user={{ id: s.user.id, name: s.user.name, email: s.user.email, role: s.user.role, permissions: s.user.permissions }}>
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
          <Logo height={36} />
          <LogoutButton className="font-medium text-brand underline underline-offset-4" />
        </div>
      </header>
      <main className="mx-auto max-w-xl px-5 py-10">{children}</main>
    </AdminProvider>
  );
}

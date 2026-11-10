import { ChangePasswordForm } from "@/components/admin/AuthForms";
import { requirePage } from "@/lib/auth/guard";

export default async function ChangePasswordPage() {
  const s = await requirePage({ allowMustChange: true });
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
      <h1 className="text-2xl">{s.user.mustChangePassword ? "Choose a new password" : "Change password"}</h1>
      <div className="mt-6">
        <ChangePasswordForm forced={s.user.mustChangePassword} />
      </div>
    </div>
  );
}

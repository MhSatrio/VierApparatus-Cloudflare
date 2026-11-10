import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/AuthForms";
import { Logo } from "@/components/Logo";
import { currentSession } from "@/lib/auth/guard";

export default async function LoginPage() {
  const s = await currentSession().catch(() => null);
  if (s) redirect(s.user.mustChangePassword ? "/admin/change-password" : "/admin");
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12">
      <Logo height={44} />
      <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <h1 className="text-2xl">Sign in</h1>
        <p className="mt-1 text-sm text-ink/70">Editors and invited contributors only.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiMessage, useApi } from "./AdminProvider";

const note = "rounded-lg border-2 border-ink p-3 font-medium";

export function LoginForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
        credentials: "same-origin",
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; mustChangePassword?: boolean; retryAfter?: number };
      if (res.ok && data.ok) {
        router.replace(data.mustChangePassword ? "/admin/change-password" : "/admin");
        router.refresh();
        return;
      }
      if (res.status === 429) setError(`Too many attempts. Try again in ${Math.ceil((data.retryAfter ?? 900) / 60)} minutes.`);
      else if (res.status === 503) setError("The site database is not configured yet.");
      else setError("E-mail or password is incorrect.");
    } catch {
      setError("Network problem. Please try again.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="mb-1.5 block font-medium">
          E-mail
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className="field" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block font-medium">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field" />
      </div>
      {error && (
        <p role="alert" className={note}>
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export function ChangePasswordForm({ forced }: { forced: boolean }) {
  const api = useApi();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formEl = ev.currentTarget;
    const form = new FormData(formEl);
    const next = String(form.get("next") ?? "");
    if (next !== form.get("confirm")) {
      setError("The two new passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    const r = await api.post("/api/auth/change-password", { current: String(form.get("current") ?? ""), next });
    if (r.ok) {
      setDone(true);
      formEl.reset();
      if (forced) {
        router.replace("/admin");
        router.refresh();
      }
    } else setError(apiMessage(r));
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {forced && <p className="rounded-lg bg-sky/50 p-4">For your security, replace the temporary password you were given before you continue. The temporary password stops working as soon as you save a new one.</p>}
      <div>
        <label htmlFor="current" className="mb-1.5 block font-medium">
          {forced ? "Temporary password" : "Current password"}
        </label>
        <input id="current" name="current" type="password" autoComplete="current-password" required className="field" />
      </div>
      <div>
        <label htmlFor="next" className="mb-1.5 block font-medium">
          New password
        </label>
        <input id="next" name="next" type="password" autoComplete="new-password" required minLength={12} className="field" aria-describedby="pw-rules" />
        <p id="pw-rules" className="mt-1 text-sm text-ink/70">
          At least 12 characters, different from the current one. Mix upper- and lower-case letters, numbers and symbols, or use 16 or more characters.
        </p>
      </div>
      <div>
        <label htmlFor="confirm" className="mb-1.5 block font-medium">
          Repeat new password
        </label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" required className="field" />
      </div>
      {error && (
        <p role="alert" className={note}>
          {error}
        </p>
      )}
      {done && !forced && (
        <p role="status" className="rounded-lg bg-sky/50 p-3 font-medium">
          Password changed. Other devices have been signed out.
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Saving…" : "Save new password"}
      </button>
    </form>
  );
}

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => {});
        router.replace("/admin/login");
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
}

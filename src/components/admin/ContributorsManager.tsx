"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GRANTABLE, GRANTABLE_LABEL, type Grantable } from "@/lib/auth/permissions";
import { apiMessage, useApi } from "./AdminProvider";
import { Dialog, Field, inputCls } from "./Dialog";
import { dateOnly, dateTime, Empty } from "./ui";

export type ContributorView = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  bio: string;
  disabled: boolean;
  permissions: Grantable[];
  assignedCount: number;
  createdAt: string;
  lastActiveAt: string | null;
  lastLoginAt: string | null;
};

type Mode = { kind: "add" } | { kind: "edit"; c: ContributorView } | { kind: "password"; c: ContributorView } | { kind: "delete"; c: ContributorView } | null;

const btn = "inline-flex min-h-9 items-center rounded-md border border-ink/25 px-2.5 text-sm font-medium hover:border-brand hover:text-brand disabled:opacity-50";

/**
 * The owner's contributor table and its dialogs. Passwords are only ever typed here and sent once over HTTPS: they are never
 * displayed back, and the table has no password column. Everything is enforced again by the API (owner only).
 */
export function ContributorsManager({ contributors }: { contributors: ContributorView[] }) {
  const api = useApi();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [field, setField] = useState("");
  const [flash, setFlash] = useState("");
  const [showPw, setShowPw] = useState(false);

  const close = () => {
    setMode(null);
    setError("");
    setField("");
    setShowPw(false);
  };

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!mode) return;
    const f = new FormData(ev.currentTarget);
    const str = (k: string) => String(f.get(k) ?? "");
    const perms = GRANTABLE.filter((g) => f.get(`perm-${g}`) === "on");
    setBusy(true);
    setError("");
    setField("");
    let r;
    if (mode.kind === "add") {
      r = await api.post("/api/admin/users", { name: str("name"), email: str("email"), password: str("password"), specialization: str("specialization"), bio: str("bio"), permissions: perms, disabled: str("status") === "disabled" });
    } else if (mode.kind === "edit") {
      r = await api.patch(`/api/admin/users/${mode.c.id}`, { name: str("name"), email: str("email"), specialization: str("specialization"), bio: str("bio"), permissions: perms });
    } else if (mode.kind === "password") {
      r = await api.post(`/api/admin/users/${mode.c.id}/password`, { password: str("password") });
    } else {
      r = await api.del(`/api/admin/users/${mode.c.id}`);
    }
    setBusy(false);
    if (!r.ok) {
      setError(apiMessage(r));
      setField(String((r.data as { field?: string }).field ?? ""));
      return;
    }
    setFlash(
      mode.kind === "add" ? `Account created for ${str("name")}. Share the password with them yourself; it cannot be shown again.` : mode.kind === "password" ? `Password changed for ${mode.c.name}. They were signed out everywhere.` : mode.kind === "delete" ? `${mode.c.name} was deleted.` : "Saved.",
    );
    close();
    router.refresh();
  }

  async function toggle(c: ContributorView) {
    setBusy(true);
    const r = await api.patch(`/api/admin/users/${c.id}`, { disabled: !c.disabled });
    setBusy(false);
    if (!r.ok) setFlash(apiMessage(r));
    else {
      setFlash(c.disabled ? `${c.name} can sign in again.` : `${c.name} was disabled and signed out everywhere.`);
      router.refresh();
    }
  }

  const permBoxes = (have: Grantable[]) => (
    <fieldset className="space-y-2 rounded-lg border border-ink/15 p-3">
      <legend className="px-1 text-sm font-medium">What this person can do</legend>
      {GRANTABLE.map((g) => (
        <label key={g} className="flex items-start gap-2 text-sm">
          <input type="checkbox" name={`perm-${g}`} defaultChecked={have.includes(g)} className="mt-1" />
          <span>{GRANTABLE_LABEL[g]}</span>
        </label>
      ))}
      <p className="text-xs text-ink/60">Publishing, analytics, settings, accounts and passwords always stay with the owner.</p>
    </fieldset>
  );

  const err = (name: string) => (field === name ? error : undefined);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/70">{contributors.length} contributor{contributors.length === 1 ? "" : "s"}. There is no public sign-up: only you create accounts.</p>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setMode({ kind: "add" })}>
          Add contributor
        </button>
      </div>
      {flash && (
        <p role="status" className="mb-4 rounded-lg border-2 border-ink p-3 font-medium">
          {flash}
        </p>
      )}

      {contributors.length === 0 ? (
        <Empty>No contributors yet. Add the first one, then assign them a task in the Planner.</Empty>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white shadow-card" tabIndex={0} role="region" aria-label="Contributors table">
          <table className="w-full min-w-[64rem] text-sm">
            <thead className="bg-sky text-left">
              <tr>
                {["Name", "Email", "Role", "Specialization", "Account status", "Assigned articles", "Joined", "Last active", "Actions"].map((h) => (
                  <th key={h} scope="col" className="px-3 py-2 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contributors.map((c) => (
                <tr key={c.id} className="border-t border-ink/10 align-top odd:bg-white even:bg-[#f9fbfd]">
                  <td className="px-3 py-2 font-medium">{c.name}</td>
                  <td className="px-3 py-2">{c.email}</td>
                  <td className="px-3 py-2">Contributor</td>
                  <td className="px-3 py-2">{c.specialization || "—"}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.disabled ? "bg-ink/10" : "bg-brand text-white"}`}>{c.disabled ? "Disabled" : "Active"}</span>
                  </td>
                  <td className="px-3 py-2">
                    {c.assignedCount ? (
                      <Link href={`/admin/collab?who=${c.id}`} className="text-brand underline underline-offset-4">
                        {c.assignedCount} — view
                      </Link>
                    ) : (
                      "0"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">{dateOnly(c.createdAt)}</td>
                  <td className="whitespace-nowrap px-3 py-2" title={c.lastLoginAt ? `Last sign-in ${dateTime(c.lastLoginAt)}` : "Never signed in"}>
                    {c.lastActiveAt ? dateTime(c.lastActiveAt) : "Never"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1.5">
                      <button type="button" className={btn} onClick={() => setMode({ kind: "edit", c })}>
                        Edit
                      </button>
                      <button type="button" className={btn} onClick={() => setMode({ kind: "password", c })}>
                        Reset password
                      </button>
                      <button type="button" className={btn} disabled={busy} onClick={() => toggle(c)}>
                        {c.disabled ? "Reactivate" : "Disable"}
                      </button>
                      <button type="button" className={`${btn} hover:border-ink hover:text-ink`} onClick={() => setMode({ kind: "delete", c })}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={mode?.kind === "add"} onClose={close} title="Add contributor">
        <form onSubmit={submit} className="space-y-4" autoComplete="off">
          <Field label="Full name" error={err("name")}>
            <input name="name" required minLength={2} maxLength={80} className={inputCls} autoComplete="off" />
          </Field>
          <Field label="Email" error={err("email")} hint="They sign in with this address.">
            <input name="email" type="email" required maxLength={200} className={inputCls} autoComplete="off" />
          </Field>
          <Field label="Specialization / description (optional)">
            <input name="specialization" maxLength={120} className={inputCls} placeholder="e.g. Fungal biology" />
          </Field>
          <Field label="Initial password" error={err("password")} hint="12+ characters with a mix of letters, numbers and symbols (or 16+ characters). You choose it and tell the person yourself; it is stored only as a hash and can never be viewed again.">
            <input name="password" type={showPw ? "text" : "password"} required minLength={12} maxLength={200} className={inputCls} autoComplete="new-password" />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showPw} onChange={(e) => setShowPw(e.target.checked)} /> Show what I type
          </label>
          {permBoxes(["collab.access", "articles.write", "media.upload"])}
          <Field label="Account status">
            <select name="status" className={inputCls} defaultValue="active">
              <option value="active">Active (can sign in now)</option>
              <option value="disabled">Disabled (cannot sign in yet)</option>
            </select>
          </Field>
          {error && !field && (
            <p role="alert" className="font-semibold">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
              {busy ? "Creating…" : "Create account"}
            </button>
          </div>
        </form>
      </Dialog>

      <Dialog open={mode?.kind === "edit"} onClose={close} title="Edit contributor">
        {mode?.kind === "edit" && (
          <form onSubmit={submit} className="space-y-4" autoComplete="off">
            <Field label="Full name" error={err("name")}>
              <input name="name" required minLength={2} maxLength={80} defaultValue={mode.c.name} className={inputCls} />
            </Field>
            <Field label="Email" error={err("email")}>
              <input name="email" type="email" required maxLength={200} defaultValue={mode.c.email} className={inputCls} />
            </Field>
            <Field label="Specialization / description">
              <input name="specialization" maxLength={120} defaultValue={mode.c.specialization} className={inputCls} />
            </Field>
            <Field label="Short bio (shown as the byline description)">
              <textarea name="bio" maxLength={600} rows={3} defaultValue={mode.c.bio} className={inputCls} />
            </Field>
            {permBoxes(mode.c.permissions)}
            <p className="text-xs text-ink/60">Changing the e-mail does not change the password. To set a new password use &ldquo;Reset password&rdquo;.</p>
            {error && !field && (
              <p role="alert" className="font-semibold">
                {error}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
                Save
              </button>
            </div>
          </form>
        )}
      </Dialog>

      <Dialog open={mode?.kind === "password"} onClose={close} title="Reset password">
        {mode?.kind === "password" && (
          <form onSubmit={submit} className="space-y-4" autoComplete="off">
            <p>
              Set a new password for <strong>{mode.c.name}</strong>. Their current password cannot be shown, and they will be signed out on every device.
            </p>
            <Field label="New password" error={error}>
              <input name="password" type={showPw ? "text" : "password"} required minLength={12} maxLength={200} className={inputCls} autoComplete="new-password" />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={showPw} onChange={(e) => setShowPw(e.target.checked)} /> Show what I type
            </label>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
                Set new password
              </button>
            </div>
          </form>
        )}
      </Dialog>

      <Dialog open={mode?.kind === "delete"} onClose={close} title="Delete this account?">
        {mode?.kind === "delete" && (
          <form onSubmit={submit} className="space-y-4">
            <p>
              <strong>{mode.c.name}</strong> will be signed out and can no longer sign in. Their tasks become unassigned. Their drafts and comments stay, credited by name. To keep the account but stop access, use Disable instead.
            </p>
            {error && (
              <p role="alert" className="font-semibold">
                {error}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
                Delete account
              </button>
            </div>
          </form>
        )}
      </Dialog>
    </>
  );
}

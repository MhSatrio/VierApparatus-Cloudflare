"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiMessage, useApi } from "./AdminProvider";

export function ProfileForm({ name, bio }: { name: string; bio: string }) {
  const api = useApi();
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={async (ev) => {
        ev.preventDefault();
        const d = new FormData(ev.currentTarget);
        setBusy(true);
        const r = await api.put("/api/admin/profile", { name: d.get("name"), bio: d.get("bio") });
        setMsg(r.ok ? "Saved." : apiMessage(r));
        if (r.ok) router.refresh();
        setBusy(false);
      }}
    >
      <label className="block text-sm font-medium">
        Display name
        <input name="name" defaultValue={name} required minLength={2} maxLength={80} className="field mt-1 font-normal" />
      </label>
      <label className="block text-sm font-medium">
        Short bio (optional)
        <textarea name="bio" defaultValue={bio} rows={3} maxLength={600} className="field mt-1 font-normal" />
      </label>
      {msg && (
        <p role="status" className="text-sm font-medium">
          {msg}
        </p>
      )}
      <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
        Save profile
      </button>
    </form>
  );
}

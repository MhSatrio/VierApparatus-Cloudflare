"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { campaignTag, withSponsorUtm } from "@/lib/sponsor-utm";
import { apiMessage, useApi } from "../AdminProvider";
import { inputCls } from "../Dialog";
import { SponsorImagePicker } from "./SponsorImagePicker";

export type CampaignView = { id: string; name: string; imageUrl: string; destinationUrl: string; campaign: string; active: boolean };
type Draft = Omit<CampaignView, "id"> & { id?: string };

const blank: Draft = { name: "", imageUrl: "", destinationUrl: "", campaign: "", active: false };

/** The owner's site-wide sponsor campaigns: create, edit, switch on or off, delete. One campaign is active at a time. */
export function SponsorCampaigns({ initial }: { initial: CampaignView[] }) {
  const api = useApi();
  const router = useRouter();
  const [editing, setEditing] = useState<Draft | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(d: Draft, done: string) {
    setBusy(true);
    setMsg("");
    const body = { name: d.name, imageUrl: d.imageUrl, destinationUrl: d.destinationUrl, campaign: d.campaign, active: d.active };
    const r = d.id ? await api.put(`/api/admin/sponsors/${d.id}`, body) : await api.post("/api/admin/sponsors", body);
    setBusy(false);
    if (!r.ok) return setMsg(apiMessage(r));
    setMsg(done);
    setEditing(null);
    router.refresh();
  }

  const tracked = (d: Draft) => (d.destinationUrl ? withSponsorUtm(d.destinationUrl, d.campaign || campaignTag(d.name)) : null);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setEditing({ ...blank })}>
          New sponsor campaign
        </button>
        <a href="/admin/sponsors/preview" className="btn btn-secondary btn-sm">
          Preview the article layout
        </a>
      </div>

      {msg && (
        <p role="status" className="rounded-lg border-2 border-ink p-3 font-medium">
          {msg}
        </p>
      )}

      {editing && (
        <form
          className="space-y-5 rounded-xl border border-ink/10 bg-white p-5 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            void save(editing, editing.id ? "Campaign saved." : "Campaign created.");
          }}
        >
          <h2 className="text-xl">{editing.id ? "Edit campaign" : "New sponsor campaign"}</h2>
          <SponsorImagePicker value={editing.imageUrl} onChange={(url) => setEditing((d) => (d ? { ...d, imageUrl: url } : d))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Sponsor name
              <input required minLength={2} maxLength={80} value={editing.name} onChange={(e) => setEditing((d) => (d ? { ...d, name: e.target.value } : d))} className={inputCls} />
            </label>
            <label className="block text-sm font-medium">
              Destination (HTTPS)
              <input required type="url" maxLength={500} value={editing.destinationUrl} onChange={(e) => setEditing((d) => (d ? { ...d, destinationUrl: e.target.value } : d))} placeholder="https://" className={inputCls} />
            </label>
            <label className="block text-sm font-medium">
              Campaign tag (utm_campaign)
              <input maxLength={60} value={editing.campaign} onChange={(e) => setEditing((d) => (d ? { ...d, campaign: e.target.value.toLowerCase() } : d))} placeholder={campaignTag(editing.name) || "from the name"} className={inputCls} />
              <span className="mt-1 block text-xs font-normal text-ink/60">Leave empty to use the name. Letters, digits, dashes and underscores only.</span>
            </label>
            <label className="flex items-center gap-2 self-end text-sm font-medium">
              <input type="checkbox" checked={editing.active} onChange={(e) => setEditing((d) => (d ? { ...d, active: e.target.checked } : d))} />
              Active on every article without its own sponsor (turning this on turns the others off)
            </label>
          </div>
          <p className="rounded-lg bg-sky/40 p-3 text-sm">
            <strong>Tracked link:</strong>{" "}
            {tracked(editing) ? <code className="break-all text-xs">{tracked(editing)}</code> : <span className="text-ink/70">Enter an HTTPS destination to see the link readers will use.</span>}
          </p>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(null)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={busy || !editing.imageUrl}>
              {editing.id ? "Save campaign" : "Create campaign"}
            </button>
          </div>
          {!editing.imageUrl && <p className="text-sm text-ink/70">Add an image first.</p>}
        </form>
      )}

      {initial.length === 0 ? (
        <p className="rounded-lg border border-dashed border-ink/25 p-4 text-ink/70">No sponsor campaigns yet. Create one to show it beside every article that has no sponsor of its own.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {initial.map((c) => (
            <li key={c.id} className="flex gap-4 rounded-xl border border-ink/10 bg-white p-4 shadow-card">
              { }
              <img src={c.imageUrl} alt="" className="h-24 w-24 shrink-0 rounded-[10px] object-cover" />
              <div className="min-w-0 flex-1 space-y-2">
                <p className="font-semibold">{c.name}</p>
                <p className="truncate text-xs text-ink/70">{c.destinationUrl}</p>
                <p className="text-xs">
                  Tag <code>{c.campaign}</code>{" "}
                  <span className={`ml-2 rounded-full px-2 py-0.5 font-semibold ${c.active ? "bg-brand text-white" : "bg-ink/10"}`}>{c.active ? "Active" : "Off"}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing({ ...c })}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => save({ ...c, active: !c.active }, c.active ? "Campaign switched off." : "Campaign is now active.")}>
                    {c.active ? "Switch off" : "Make active"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    disabled={busy}
                    onClick={async () => {
                      if (!window.confirm(`Delete the campaign "${c.name}"?`)) return;
                      setBusy(true);
                      const r = await api.del(`/api/admin/sponsors/${c.id}`);
                      setBusy(false);
                      setMsg(r.ok ? "Campaign deleted." : apiMessage(r));
                      if (r.ok) router.refresh();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

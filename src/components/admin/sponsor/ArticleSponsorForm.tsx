"use client";

import { useEffect, useState } from "react";
import { campaignTag, withSponsorUtm } from "@/lib/sponsor-utm";
import { apiMessage, useApi } from "../AdminProvider";
import { inputCls } from "../Dialog";
import { SponsorImagePicker } from "./SponsorImagePicker";

type Sponsorship = { enabled: boolean; imageUrl: string; destinationUrl: string; campaign: string };

/** One article's sponsorship (Article Management, Details and SEO, Sponsor). It replaces the site-wide campaign while switched on. */
export function ArticleSponsorForm({ articleId }: { articleId: string }) {
  const api = useApi();
  const [s, setS] = useState<Sponsorship | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let live = true;
    api.get<{ sponsorship?: Sponsorship }>(`/api/admin/articles/${articleId}/sponsor`).then((r) => {
      if (!live) return;
      if (r.ok && r.data.sponsorship) setS(r.data.sponsorship);
      else setMsg(apiMessage(r));
    });
    return () => {
      live = false;
    };
    // Only the article matters here; the API client is stable for the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  if (!s) return <p className="text-sm text-ink/70">{msg || "Loading the sponsorship…"}</p>;
  const tracked = s.destinationUrl ? withSponsorUtm(s.destinationUrl, s.campaign || "") : null;

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setMsg("");
        const r = await api.put<{ sponsorship?: Sponsorship }>(`/api/admin/articles/${articleId}/sponsor`, s);
        setBusy(false);
        if (r.ok && r.data.sponsorship) {
          setS(r.data.sponsorship);
          setMsg("Sponsorship saved.");
        } else setMsg(apiMessage(r));
      }}
    >
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={s.enabled} onChange={(e) => setS({ ...s, enabled: e.target.checked })} />
        Show a sponsor on this article (replaces the site-wide campaign)
      </label>
      <SponsorImagePicker value={s.imageUrl} onChange={(url) => setS({ ...s, imageUrl: url })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Destination (HTTPS)
          <input type="url" maxLength={500} value={s.destinationUrl} onChange={(e) => setS({ ...s, destinationUrl: e.target.value })} placeholder="https://" className={inputCls} />
        </label>
        <label className="block text-sm font-medium">
          Campaign tag (optional)
          <input maxLength={60} value={s.campaign} onChange={(e) => setS({ ...s, campaign: e.target.value.toLowerCase() })} placeholder={campaignTag("sponsor") || "optional"} className={inputCls} />
        </label>
      </div>
      <p className="rounded-lg bg-sky/40 p-3 text-sm">
        <strong>Tracked link:</strong> {tracked ? <code className="break-all text-xs">{tracked}</code> : <span className="text-ink/70">Enter an HTTPS destination to see it.</span>}
      </p>
      <div className="flex items-center gap-3">
        <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
          Save sponsorship
        </button>
        {msg && (
          <span role="status" className="text-sm font-medium">
            {msg}
          </span>
        )}
      </div>
    </form>
  );
}

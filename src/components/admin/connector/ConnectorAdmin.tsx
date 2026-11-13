"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiMessage, useApi } from "../AdminProvider";
import { inputCls } from "../Dialog";
import { Card, dateTime } from "../ui";

/** Views of the records (plain data only: this file runs in the browser, so it does not import the server modules). */
export type TokenView = {
  id: string;
  name: string;
  scopes: string[];
  createdAt: string;
  lastUsedAt: string | null;
  lastSeenAt: string | null;
  clientCursor: number;
  clientVersion: string;
  clientMessage: string;
  revokedAt: string | null;
};
export type EventView = { id: number; createdAt: string; type: string; entityId: string; payload: Record<string, unknown> };
export type JobView = { id: string; createdAt: string; type: string; targetTitle: string; status: string; result: string; error: string; finishedAt: string | null };

const SCOPES = [
  { id: "events:read", label: "Read the website events (articles published, products published and reviewed)" },
  { id: "jobs:run", label: "Take the jobs sent from this page and report the result" },
] as const;
const EVENT_TEXT: Record<string, string> = { "article.published": "Article published", "product.published": "Product published", "product.reviewed": "Product reviewed" };
const JOB_TEXT: Record<string, string> = { run_text_post: "Write a social post", replay_event: "Send to DCE now" };
const CHIP: Record<string, string> = {
  pending: "bg-amber-100 text-amber-900",
  claimed: "bg-sky text-ink",
  done: "bg-emerald-100 text-emerald-900",
  failed: "bg-red-100 text-red-900",
};

const shortDate = (iso: string | null) => (iso ? dateTime(iso) : "never");
const titleOf = (e: EventView) => String(e.payload.title ?? e.payload.name ?? e.entityId);

/** The owner's view of the DCE connection: the access tokens, what was sent, the jobs, and what the desktop app reports back. */
export function ConnectorAdmin({ siteUrl, tokens, events, jobs }: { siteUrl: string; tokens: TokenView[]; events: EventView[]; jobs: JobView[] }) {
  const api = useApi();
  const router = useRouter();
  const [name, setName] = useState("");
  const [scopes, setScopes] = useState<string[]>(["events:read", "jobs:run"]);
  const [shown, setShown] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const base = `${siteUrl.replace(/\/$/, "")}/api/connector/v1`;

  async function createToken(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const r = await api.post<{ token?: string }>("/api/admin/connector/tokens", { name, scopes });
    setBusy(false);
    if (!r.ok) return setMsg(apiMessage(r));
    setShown(r.data.token ?? null);
    setName("");
    router.refresh();
  }

  async function revoke(t: TokenView) {
    if (!window.confirm(`Revoke “${t.name}”? The DCE app using it stops working on its next request.`)) return;
    const r = await api.del(`/api/admin/connector/tokens/${t.id}`);
    setMsg(r.ok ? `“${t.name}” revoked.` : apiMessage(r));
    router.refresh();
  }

  async function queue(type: "run_text_post" | "replay_event", ev: EventView) {
    setBusy(true);
    setMsg("");
    const r = await api.post("/api/admin/connector/jobs", { type, eventId: ev.id });
    setBusy(false);
    setMsg(r.ok ? `Queued: “${titleOf(ev)}”. DCE takes it on its next check (about a minute while it is open).` : apiMessage(r));
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {msg && (
        <p role="status" className="rounded-lg border-2 border-ink p-3 font-medium">
          {msg}
        </p>
      )}

      <Card title="How the DCE app connects">
        <div className="space-y-2 text-sm">
          <p>
            The DCE desktop app asks this site for new events and takes the jobs you send. It connects out to the site with a token, so nothing on your computer is exposed.
          </p>
          <p>
            Address: <code className="break-all">{base}</code>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li><code>GET /ping</code>: checks the token (Test connection in DCE)</li>
            <li><code>GET /events?after=N</code>: the events after the last one DCE has done</li>
            <li><code>POST /status</code>: DCE reports its version and progress (shown in the table below)</li>
            <li><code>POST /jobs/claim</code> and <code>POST /jobs/ID/report</code>: jobs sent from this page</li>
          </ul>
          <p className="text-ink/70">
            What is sent for an article: title, excerpt, address, category, tags, author, dates, cover image, reading time and the plain text of the body. For a product: name, manufacturer, model, category, descriptions, advantages, limitations, the editorial review text, image and dates. Comments, e-mail addresses, drafts and internal notes are never sent.
          </p>
        </div>
      </Card>

      <Card title="Access tokens (DCE clients)">
        {tokens.length === 0 && <p className="text-sm text-ink/70">No token yet. Create one below and paste it into DCE, under Settings, then Connections, then Website.</p>}
        {tokens.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-ink/70">
                <tr>
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Permissions</th>
                  <th className="py-2 pr-3">Last seen</th>
                  <th className="py-2 pr-3">DCE reports</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {tokens.map((t) => (
                  <tr key={t.id} className="border-t border-ink/10 align-top">
                    <td className="py-2 pr-3 font-medium">{t.name}<div className="text-xs text-ink/60">created {dateTime(t.createdAt)}</div></td>
                    <td className="py-2 pr-3 text-xs">{t.scopes.join(", ")}</td>
                    <td className="py-2 pr-3">{shortDate(t.lastSeenAt)}<div className="text-xs text-ink/60">last used {shortDate(t.lastUsedAt)}</div></td>
                    <td className="py-2 pr-3 text-xs">
                      {t.clientVersion ? `version ${t.clientVersion}` : "nothing yet"}
                      {t.clientCursor ? <div>read up to event {t.clientCursor}</div> : null}
                      {t.clientMessage ? <div className="text-ink/70">“{t.clientMessage}”</div> : null}
                    </td>
                    <td className="py-2 pr-3">
                      {t.revokedAt ? <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-900">revoked</span> : <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-900">active</span>}
                    </td>
                    <td className="py-2 text-right">
                      {!t.revokedAt && (
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => void revoke(t)}>
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form className="mt-5 space-y-4 border-t border-ink/10 pt-5" onSubmit={(e) => void createToken(e)}>
          <label className="block text-sm font-medium">
            Name of the client
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="DCE on my PC" maxLength={80} required minLength={2} />
          </label>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Permissions (the token can do nothing else)</legend>
            {SCOPES.map((s) => (
              <label key={s.id} className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={scopes.includes(s.id)}
                  onChange={(e) => setScopes((cur) => (e.target.checked ? [...cur, s.id] : cur.filter((x) => x !== s.id)))}
                />
                <span>{s.label}</span>
              </label>
            ))}
          </fieldset>
          <button type="submit" className="btn btn-primary btn-sm" disabled={busy || !name.trim() || scopes.length === 0}>
            Create token
          </button>
        </form>

        {shown && (
          <div className="mt-5 space-y-2 rounded-lg border-2 border-ink p-4">
            <p className="font-medium">Copy this token now. It is shown only once.</p>
            <code className="block break-all rounded bg-sky/40 p-2 text-sm" data-testid="new-token">{shown}</code>
            <div className="flex gap-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => void navigator.clipboard?.writeText(shown)}>
                Copy
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShown(null)}>
                I have copied it
              </button>
            </div>
          </div>
        )}
      </Card>

      <Card title="Events sent to DCE" className="overflow-hidden">
        <p className="mb-3 text-sm text-ink/70">Every publish and review is recorded here. “Send to DCE now” runs the workflows you set up in DCE for that item. “Write a social post” only writes the text post.</p>
        {events.length === 0 && <p className="text-sm text-ink/70">Nothing yet. An event appears when an article is published, or a product is published or reviewed.</p>}
        {events.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-ink/70">
                <tr>
                  <th className="py-2 pr-3">When</th>
                  <th className="py-2 pr-3">What</th>
                  <th className="py-2 pr-3">Item</th>
                  <th className="py-2 pr-3">Event</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev.id} className="border-t border-ink/10">
                    <td className="py-2 pr-3 whitespace-nowrap">{dateTime(ev.createdAt)}</td>
                    <td className="py-2 pr-3">{EVENT_TEXT[ev.type] ?? ev.type}</td>
                    <td className="py-2 pr-3">
                      {titleOf(ev)}
                      {typeof ev.payload.url === "string" && (
                        <div className="text-xs"><a className="underline" href={ev.payload.url} target="_blank" rel="noreferrer">open on the site</a></div>
                      )}
                    </td>
                    <td className="py-2 pr-3 text-xs text-ink/60">#{ev.id}</td>
                    <td className="py-2 text-right whitespace-nowrap">
                      <button type="button" className="btn btn-secondary btn-sm mr-2" disabled={busy} onClick={() => void queue("run_text_post", ev)}>
                        Write a social post
                      </button>
                      <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={() => void queue("replay_event", ev)}>
                        Send to DCE now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Jobs sent to DCE">
        {jobs.length === 0 && <p className="text-sm text-ink/70">No jobs yet.</p>}
        {jobs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-ink/70">
                <tr>
                  <th className="py-2 pr-3">Queued</th>
                  <th className="py-2 pr-3">Job</th>
                  <th className="py-2 pr-3">Item</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2">Result</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id} className="border-t border-ink/10 align-top">
                    <td className="py-2 pr-3 whitespace-nowrap">{dateTime(j.createdAt)}</td>
                    <td className="py-2 pr-3">{JOB_TEXT[j.type] ?? j.type}</td>
                    <td className="py-2 pr-3">{j.targetTitle}</td>
                    <td className="py-2 pr-3"><span className={`rounded-full px-2 py-0.5 text-xs ${CHIP[j.status] ?? ""}`}>{j.status}</span></td>
                    <td className="py-2 text-xs">{j.error ? <span className="text-red-900">{j.error}</span> : j.result || (j.finishedAt ? "" : "waiting for DCE")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

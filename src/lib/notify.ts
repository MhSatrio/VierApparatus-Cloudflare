import { escapeHtml } from "./content/text";
import { site } from "./site";

/**
 * Sends a plain notification e-mail to the owner through Resend's HTTPS API (works on Vercel and Cloudflare Workers).
 * The recipient is fixed server-side and never taken from user input. Failure never loses the message: every form
 * submission is stored in the database first, so the e-mail is only a convenience.
 */
export type Notice = { subject: string; replyTo?: string; fields: [string, string][]; body?: string };

export async function notifyOwner(n: Notice): Promise<"sent" | "mock" | "not_configured" | "failed"> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL || site.email;
  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") return "mock";
    return "not_configured";
  }
  const row = ([k, v]: [string, string]) =>
    v ? `<tr><td style="padding:4px 12px 4px 0;color:#555;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>` : "";
  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#231F20"><h2 style="color:#4570B6;margin:0 0 12px">${escapeHtml(n.subject)}</h2><table style="border-collapse:collapse">${n.fields.map(row).join("")}</table>${n.body ? `<div style="white-space:pre-wrap;border-left:3px solid #CAEBFB;padding-left:12px;margin-top:14px">${escapeHtml(n.body)}</div>` : ""}</body></html>`;
  const text = [...n.fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`), n.body ? `\n${n.body}` : ""].join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: n.replyTo, subject: n.subject.replace(/[\r\n]+/g, " ").slice(0, 200), html, text }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    return res.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

import { site } from "./site";
import { buildEmailHtml, buildEmailText, buildSubject, type InquiryInput } from "./inquiry";

export type SendResult = { ok: true; mock?: boolean } | { ok: false; reason: "not_configured" | "provider_error" };

/**
 * Sends the inquiry through Resend's HTTPS API. The recipient is fixed server-side (never user-supplied);
 * the visitor's address is only used as Reply-To after strict validation.
 * In development without credentials the email is mocked (nothing leaves the machine).
 * In production without credentials this returns not_configured so the UI can show a fallback.
 */
export async function sendInquiryEmail(input: InquiryInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL || site.email;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[inquiry] MOCK email (development only, nothing was sent)");
      return { ok: true, mock: true };
    }
    console.error("[inquiry] RESEND_API_KEY / INQUIRY_FROM_EMAIL not configured");
    return { ok: false, reason: "not_configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: buildSubject(input),
        html: buildEmailHtml(input),
        text: buildEmailText(input),
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[inquiry] provider responded ${res.status}`);
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true };
  } catch {
    console.error("[inquiry] provider request failed");
    return { ok: false, reason: "provider_error" };
  }
}

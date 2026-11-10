/**
 * Outgoing mail through Resend's HTTPS API (the same provider as the contact form). The sender must be an address on a domain
 * that is verified in Resend (SPF, DKIM and DMARC records), otherwise Resend refuses it.
 *
 *   TASK_FROM_EMAIL     sender for task e-mails, for example  VierApparatus <info@vierapparatus.com>
 *   INQUIRY_FROM_EMAIL  fallback sender (already used by the contact form)
 *   RESEND_API_KEY      the Resend API key
 *
 * Without credentials: development only logs that a mail would have been sent (nothing leaves the machine); production returns
 * "not_configured" so the caller can record it. A failed send never blocks the action that caused it (for example an assignment).
 */
export type MailResult = "sent" | "mock" | "not_configured" | "failed";

/** "Name <address@domain.tld>" or a bare "address@domain.tld". Resend answers 422 to anything else. */
const SENDER = /^(?:[^<>@]+<[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+>|[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+)$/;
export const senderValid = (from: string) => SENDER.test(from.trim());

export async function sendMail(opts: { to: string; subject: string; html: string; text: string }): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = (process.env.TASK_FROM_EMAIL || process.env.INQUIRY_FROM_EMAIL || "").trim();
  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[mail] MOCK (development, nothing sent): "${opts.subject}"`);
      return "mock";
    }
    return "not_configured";
  }
  if (!senderValid(from)) {
    // Caught here, so the log says what is wrong instead of only a rejected request. The value itself is not logged.
    console.error('[mail] The sender address is not valid. Use "Name <address@domain.tld>" (the closing > is required).');
    return "not_configured";
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [opts.to], subject: opts.subject, html: opts.html, text: opts.text }),
    });
    if (res.ok) return "sent";
    const err = (await res.json().catch(() => ({}))) as { name?: string };
    console.error(`[mail] Resend refused the message: HTTP ${res.status}${err.name ? ` (${err.name})` : ""}`);
    return "failed";
  } catch {
    console.error("[mail] Could not reach Resend.");
    return "failed";
  }
}

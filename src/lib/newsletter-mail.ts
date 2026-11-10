import { escapeHtml } from "./content/text";
import { site } from "./site";

/**
 * E-mails for the newsletter. Pure builders (no sending here). The confirmation link is single use and expires after 7 days.
 * Every newsletter must carry an unsubscribe link; the confirmation message says what the person agreed to.
 */
export function buildConfirmationEmail(opts: { name: string; token: string }): { subject: string; html: string; text: string; confirmUrl: string } {
  const confirmUrl = `${site.url}/newsletter/confirm?token=${encodeURIComponent(opts.token)}`;
  const greeting = opts.name ? `Hello ${opts.name},` : "Hello,";
  const subject = "Confirm your subscription to VierApparatus";
  const text = [
    greeting,
    "",
    "Thank you for asking to receive the VierApparatus newsletter. Please confirm your e-mail address to start receiving it:",
    confirmUrl,
    "",
    "The link works once and expires in 7 days. If you did not ask for this, you can ignore this message and nothing will be sent to you.",
    "",
    `Questions: ${site.email}`,
  ].join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#231F20">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #d9e2f0">
<tr><td style="padding:24px 28px 8px"><p style="margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#4570B6">VierApparatus</p>
<h1 style="margin:8px 0 0;font-size:22px;line-height:1.3">Confirm your subscription</h1></td></tr>
<tr><td style="padding:12px 28px;font-size:16px;line-height:1.6">${escapeHtml(greeting)}<br>Thank you for asking to receive the VierApparatus newsletter. Please confirm your e-mail address to start receiving it.</td></tr>
<tr><td style="padding:8px 28px 24px"><a href="${escapeHtml(confirmUrl)}" style="display:inline-block;background:#4570B6;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:bold">Confirm my subscription</a></td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #e6ebf3;font-size:12px;color:#5a5a5a;line-height:1.6">The link works once and expires in 7 days. If you did not ask for this, ignore this message and nothing will be sent to you. Questions: ${escapeHtml(site.email)}.</td></tr>
</table></td></tr></table></body></html>`;
  return { subject, html, text, confirmUrl };
}

/** Footer for every newsletter: the unsubscribe link and the reason the reader is receiving it. */
export function newsletterFooter(unsubscribeToken: string): { html: string; text: string } {
  const url = `${site.url}/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  return {
    html: `<p style="font-size:12px;color:#5a5a5a">You receive this because you subscribed to the VierApparatus newsletter. <a href="${escapeHtml(url)}">Unsubscribe</a> at any time.</p>`,
    text: `You receive this because you subscribed to the VierApparatus newsletter. Unsubscribe at any time: ${url}`,
  };
}

import { fail, json, readJson } from "@/lib/api";
import { clientIp, ipHash } from "@/lib/auth/request";
import { sha256Hex } from "@/lib/crypto";
import { rateLimit } from "@/lib/rate-limit";
import { buildConfirmationEmail } from "@/lib/newsletter-mail";
import { sendMail } from "@/lib/mail";
import { listCategories } from "@/lib/store/categories";
import { requestSubscription, subscribeInput } from "@/lib/store/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const THANKS = "Thank you. Check your inbox and confirm your address: the link works for 7 days.";

/**
 * Public sign-up with double opt-in. The reply is identical whether or not the address is already subscribed, so the form can
 * not be used to find out who is on the list. A filled-in hidden field ("website") is treated as a bot: it gets the same reply
 * and nothing is stored.
 */
export async function POST(req: Request) {
  try {
    const input = await readJson(req, subscribeInput, 4096);
    if (input.website) return json({ ok: true, message: THANKS });
    const [perIp, perEmail] = await Promise.all([
      rateLimit(`newsletter:ip:${await ipHash(clientIp(req))}`, 10, 3600),
      rateLimit(`newsletter:email:${(await sha256Hex(input.email)).slice(0, 32)}`, 3, 3600),
    ]);
    if (!perIp.ok || !perEmail.ok) return json({ ok: false, error: "rate_limited", message: "Too many attempts. Please try again later." }, 429);
    const allowed = (await listCategories()).map((c) => c.name);
    const issued = await requestSubscription(input, { source: "web", allowedInterests: allowed });
    if (issued) {
      const mail = buildConfirmationEmail({ name: issued.name, token: issued.token });
      await sendMail({ to: issued.email, subject: mail.subject, html: mail.html, text: mail.text });
    }
    return json({ ok: true, message: THANKS });
  } catch (e) {
    return fail(e);
  }
}

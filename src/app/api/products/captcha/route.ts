import { json } from "@/lib/api";
import { issueChallenge } from "@/lib/captcha";
import { sameOrigin } from "@/lib/auth/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** A fresh human-check question for a public form. It reveals nothing about the answer and is never cached. */
export async function GET(req: Request) {
  if (!sameOrigin(req)) return json({ ok: false, error: "forbidden" }, 403);
  return json({ ok: true, ...(await issueChallenge()) });
}

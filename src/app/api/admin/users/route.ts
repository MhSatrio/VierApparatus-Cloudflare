import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { createContributorAccount } from "@/lib/auth/service";
import { listContributors } from "@/lib/store/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only. The contributor table: names, e-mails, roles, status, counts. It never contains a password, a hash, a token or a secret. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "users.manage" });
    return json({ ok: true, contributors: await listContributors() });
  } catch (e) {
    return fail(e);
  }
}

const create = z.object({
  name: z.string().trim().min(2, "Enter the full name").max(80),
  email: z.string().trim().max(200),
  password: z.string().max(200),
  specialization: z.string().trim().max(120).default(""),
  bio: z.string().trim().max(600).default(""),
  permissions: z.array(z.string()).max(10).optional(),
  disabled: z.boolean().default(false),
});

/**
 * Owner only. Creates a contributor with the password the owner chose. Contributors cannot register themselves, and the
 * account works immediately. The password is hashed and never returned.
 */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "users.manage" });
    const input = await readJson(req, create, 8 * 1024);
    const r = await createContributorAccount(session.user.id, input);
    if (!r.ok) return json({ ok: false, error: "validation", message: r.error, field: r.field }, r.field === "email" && /exists/.test(r.error) ? 409 : 400);
    return json({ ok: true, id: r.user.id });
  } catch (e) {
    return fail(e);
  }
}

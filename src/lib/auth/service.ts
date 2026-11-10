import { hit, clear } from "./ratelimit";
import { burnPasswordCheck, hashPassword, passwordProblem, verifyPassword } from "./password";
import { DEFAULT_CONTRIBUTOR_PERMISSIONS, sanitizePermissions, type Grantable } from "./permissions";
import { createSession, destroyOtherSessions } from "./session";
import { audit } from "../store/util";
import {
  createContributor,
  createOwner,
  getUserByEmail,
  getUserById,
  normalizeEmail,
  ownerExists,
  publicUser,
  resetContributorPassword,
  setPassword,
  touchLogin,
  type User,
} from "../store/users";

export type LoginResult =
  | { ok: true; token: string; expiresAt: Date; user: User; mustChangePassword: boolean }
  | { ok: false; error: "invalid" | "rate_limited"; retryAfter?: number };

const WINDOW = 15 * 60;

/**
 * Checks e-mail + password. Brute-force protection: per-IP and per-account limits kept in the database, a dummy hash
 * for unknown accounts (same timing), and one generic error for "no such user", "wrong password" and "disabled".
 */
export async function login(input: { email: string; password: string; ipHash: string; userAgent: string }): Promise<LoginResult> {
  const email = normalizeEmail(input.email);
  if (!email || email.length > 200 || !input.password || input.password.length > 400) return { ok: false, error: "invalid" };

  const [byIp, byAccount] = await Promise.all([hit(`login:ip:${input.ipHash}`, 30, WINDOW), hit(`login:acct:${email}`, 8, WINDOW)]);
  if (!byIp.ok || !byAccount.ok) return { ok: false, error: "rate_limited", retryAfter: Math.max(byIp.ok ? 0 : byIp.retryAfter, byAccount.ok ? 0 : byAccount.retryAfter) };

  const user = await getUserByEmail(email);
  if (!user) {
    await burnPasswordCheck(input.password);
    return { ok: false, error: "invalid" };
  }
  const check = await verifyPassword(input.password, user.passwordHash);
  if (!check.ok || user.disabled) {
    await audit(user.id, "login.failed");
    return { ok: false, error: "invalid" };
  }
  if (check.needsRehash) await setPassword(user.id, await hashPassword(input.password), { mustChange: user.mustChangePassword });
  await clear(`login:acct:${email}`);
  await touchLogin(user.id);
  const session = await createSession(user.id, input.userAgent);
  await audit(user.id, "login.ok");
  return { ok: true, token: session.token, expiresAt: session.expiresAt, user: publicUser(user), mustChangePassword: user.mustChangePassword };
}

export type ChangePasswordResult = { ok: true } | { ok: false; error: string };

/**
 * The OWNER changes their own password (verifies the current one, enforces the policy, signs out every other session).
 * Contributors cannot change passwords at all: only the owner sets or resets them (see resetContributor...).
 */
export async function changePassword(input: { userId: string; current: string; next: string; keepSessionHash: string | null }): Promise<ChangePasswordResult> {
  const user = await getUserById(input.userId);
  if (!user) return { ok: false, error: "Account not found." };
  if (user.role !== "owner") return { ok: false, error: "Only the owner can change passwords. Ask the owner to reset yours." };
  const limit = await hit(`pw:${user.id}`, 10, WINDOW);
  if (!limit.ok) return { ok: false, error: "Too many attempts. Try again later." };
  if (!(await verifyPassword(input.current, user.passwordHash)).ok) return { ok: false, error: "The current password is not correct." };
  const problem = passwordProblem(input.next, { email: user.email, name: user.name });
  if (problem) return { ok: false, error: problem };
  if ((await verifyPassword(input.next, user.passwordHash)).ok) return { ok: false, error: "Choose a password different from the current one." };
  await setPassword(user.id, await hashPassword(input.next), { mustChange: false });
  await destroyOtherSessions(user.id, input.keepSessionHash);
  await audit(user.id, "password.changed");
  return { ok: true };
}

/**
 * One-time owner setup (used by `npm run admin:bootstrap`). The temporary password is hashed immediately, never
 * stored or logged, and the account is flagged so the first login must replace it.
 */
export async function bootstrapOwner(input: { email: string; name: string; password: string }): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  if (await ownerExists()) return { ok: false, error: "An owner account already exists." };
  if (input.password.length < 8) return { ok: false, error: "The temporary password is too short (minimum 8 characters)." };
  const user = await createOwner({ email: input.email, name: input.name, passwordHash: await hashPassword(input.password), mustChangePassword: true });
  return { ok: true, user };
}

export type CreateContributorInput = {
  name: string;
  email: string;
  password: string;
  specialization?: string;
  bio?: string;
  permissions?: readonly string[];
  disabled?: boolean;
};

/** Owner-only (the API enforces it): creates a ready-to-use contributor with the password the owner chose. Duplicates are refused. */
export async function createContributorAccount(actorId: string, input: CreateContributorInput): Promise<{ ok: true; user: User } | { ok: false; error: string; field?: string }> {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);
  if (name.length < 2) return { ok: false, error: "Enter the contributor's full name.", field: "name" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Enter a valid e-mail address.", field: "email" };
  const problem = passwordProblem(input.password, { email, name });
  if (problem) return { ok: false, error: problem, field: "password" };
  if (await getUserByEmail(email)) return { ok: false, error: "An account with this e-mail already exists.", field: "email" };
  const permissions: Grantable[] = input.permissions ? sanitizePermissions(input.permissions) : DEFAULT_CONTRIBUTOR_PERMISSIONS;
  const user = await createContributor({
    email,
    name,
    passwordHash: await hashPassword(input.password),
    permissions,
    specialization: input.specialization,
    bio: input.bio,
    disabled: input.disabled,
    createdBy: actorId,
  });
  return { ok: true, user };
}

/** Owner-only: replaces a contributor's password hash and signs that person out everywhere. The old password is never shown or needed. */
export async function resetContributorPasswordAs(actorId: string, contributorId: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const target = await getUserById(contributorId);
  if (!target || target.role !== "contributor") return { ok: false, error: "Contributor not found." };
  const problem = passwordProblem(password, { email: target.email, name: target.name });
  if (problem) return { ok: false, error: problem };
  if (!(await resetContributorPassword(contributorId, await hashPassword(password), actorId))) return { ok: false, error: "Contributor not found." };
  return { ok: true };
}

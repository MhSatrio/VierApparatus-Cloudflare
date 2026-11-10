import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb } from "./helpers";
import { bootstrapOwner, changePassword, createContributorAccount, login, resetContributorPasswordAs } from "@/lib/auth/service";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/auth/password";
import { can, sanitizePermissions } from "@/lib/auth/permissions";
import { createSession, destroySession, resolveSession } from "@/lib/auth/session";
import { getUserByEmail, listContributors, listPeople, listUsers, publicUser, removeContributor, setDisabled, setPermissions } from "@/lib/store/users";
import { conn } from "@/lib/db/client";

let cleanup: () => void;
beforeAll(() => {
  cleanup = tempDb();
});
afterAll(() => cleanup());

const TEMP = "Temp-Pass-For-Tests-1"; // a throw-away value used only inside this test file
const NEXT = "A-Much-Better-Passphrase-42";
const ctx = { ipHash: "iphash-1", userAgent: "vitest" };

describe("passwords", () => {
  it("hashes with a salt, verifies, and rejects wrong passwords and tampered hashes", async () => {
    const h = await hashPassword("correct horse battery staple 9!");
    expect(h.startsWith("pbkdf2-sha256$100000$")).toBe(true);
    expect((await verifyPassword("correct horse battery staple 9!", h)).ok).toBe(true);
    expect((await verifyPassword("nope", h)).ok).toBe(false);
    expect((await verifyPassword("x", "garbage")).ok).toBe(false);
    expect(h).not.toContain("correct horse");
    expect(await hashPassword("same")).not.toBe(await hashPassword("same"));
  });
  it("enforces a password policy", () => {
    expect(passwordProblem("short1A!")).toMatch(/12/);
    expect(passwordProblem("aaaaaaaaaaaaaaaa")).toBeTruthy();
    expect(passwordProblem("info-vierapparatus-1A!", { email: "info@vierapparatus.com" })).toMatch(/e-mail/);
    expect(passwordProblem(NEXT, { email: "info@vierapparatus.com" })).toBeNull();
  });
});

describe("owner bootstrap, login and password rotation", () => {
  it("creates exactly one owner flagged to change the password", async () => {
    const r = await bootstrapOwner({ email: "Info@VierApparatus.com", name: "Owner", password: TEMP });
    expect(r.ok).toBe(true);
    expect((await bootstrapOwner({ email: "other@example.com", name: "X", password: TEMP })).ok).toBe(false);
    const u = await getUserByEmail("info@vierapparatus.com");
    expect(u?.role).toBe("owner");
    expect(u?.mustChangePassword).toBe(true);
    expect(u?.passwordHash).not.toContain(TEMP);
  });
  it("rejects wrong credentials with one generic error", async () => {
    expect(await login({ email: "info@vierapparatus.com", password: "wrong", ...ctx })).toEqual({ ok: false, error: "invalid" });
    expect(await login({ email: "nobody@example.com", password: "wrong", ...ctx })).toEqual({ ok: false, error: "invalid" });
  });
  it("logs in, resolves the session, and forces a password change", async () => {
    const r = await login({ email: "INFO@vierapparatus.com", password: TEMP, ...ctx });
    expect(r.ok && r.mustChangePassword).toBe(true);
    if (!r.ok) throw new Error("login failed");
    const s = await resolveSession(r.token);
    expect(s?.user.email).toBe("info@vierapparatus.com");
    expect(s && "passwordHash" in s.user).toBe(false);
    // second device
    const second = await login({ email: "info@vierapparatus.com", password: TEMP, ...ctx });
    if (!second.ok) throw new Error("second login failed");

    expect((await changePassword({ userId: r.user.id, current: "wrong", next: NEXT, keepSessionHash: s!.sessionHash })).ok).toBe(false);
    expect((await changePassword({ userId: r.user.id, current: TEMP, next: "short", keepSessionHash: s!.sessionHash })).ok).toBe(false);
    expect((await changePassword({ userId: r.user.id, current: TEMP, next: TEMP, keepSessionHash: s!.sessionHash })).ok).toBe(false);
    expect((await changePassword({ userId: r.user.id, current: TEMP, next: NEXT, keepSessionHash: s!.sessionHash })).ok).toBe(true);

    // the temporary password no longer works, the new one does, the other device was signed out
    expect((await login({ email: "info@vierapparatus.com", password: TEMP, ...ctx })).ok).toBe(false);
    const again = await login({ email: "info@vierapparatus.com", password: NEXT, ...ctx });
    expect(again.ok && again.mustChangePassword).toBe(false);
    expect(await resolveSession(second.token)).toBeNull();
    expect(await resolveSession(r.token)).not.toBeNull();
  });
  it("logout revokes the session; expired and idle sessions are rejected", async () => {
    const owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const { token } = await createSession(owner.id, "ua");
    expect(await resolveSession(token)).not.toBeNull();
    await destroySession(token);
    expect(await resolveSession(token)).toBeNull();

    const t2 = (await createSession(owner.id, "ua")).token;
    const db = await conn();
    await db.execute({ sql: "UPDATE sessions SET last_seen_at = ? WHERE user_id = ?", args: [new Date(Date.now() - 13 * 3600_000).toISOString(), owner.id] });
    expect(await resolveSession(t2)).toBeNull();
    expect(await resolveSession("short")).toBeNull();
  });
  it("rate-limits repeated failures per account", async () => {
    let last: unknown;
    for (let i = 0; i < 10; i++) last = await login({ email: "victim@example.com", password: "x", ipHash: `ip-${i}`, userAgent: "v" });
    expect(last).toMatchObject({ ok: false, error: "rate_limited" });
  });
});

describe("contributors", () => {
  it("the owner creates a contributor with a chosen password; permissions are limited and validated", async () => {
    const owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const weak = await createContributorAccount(owner.id, { name: "Writer", email: "writer@example.com", password: "weak" });
    expect(weak).toMatchObject({ ok: false, field: "password" });
    expect(await getUserByEmail("writer@example.com")).toBeNull(); // a refused request creates nothing
    expect(await createContributorAccount(owner.id, { name: "W", email: "writer@example.com", password: "Quiet-Lantern-Passphrase-77!" })).toMatchObject({ ok: false, field: "name" });
    expect(await createContributorAccount(owner.id, { name: "Writer", email: "not-an-email", password: "Quiet-Lantern-Passphrase-77!" })).toMatchObject({ ok: false, field: "email" });

    const ok = await createContributorAccount(owner.id, {
      name: "Writer",
      email: "Writer@Example.com",
      password: "Quiet-Lantern-Passphrase-77!",
      specialization: "Fungal biology",
      permissions: ["articles.write", "bogus" as never],
    });
    expect(ok.ok).toBe(true);
    expect(await createContributorAccount(owner.id, { name: "Writer Two", email: "writer@example.com", password: "Another-Long-Passphrase-31!" })).toMatchObject({ ok: false, field: "email" });

    const w = (await getUserByEmail("writer@example.com"))!;
    expect(w.role).toBe("contributor");
    expect(w.permissions).toEqual(["articles.write"]);
    expect(w.mustChangePassword).toBe(false); // the owner chose the password: the account works immediately
    expect(w.specialization).toBe("Fungal biology");
    expect((await login({ email: "writer@example.com", password: "Quiet-Lantern-Passphrase-77!", ...ctx })).ok).toBe(true);
    expect(can(w, "articles.write")).toBe(true);
    expect(can(w, "media.upload")).toBe(false);
    expect(can(w, "collab.access")).toBe(false);
    for (const a of ["analytics.view", "users.manage", "articles.publish", "articles.manage", "settings.manage", "categories.manage", "submissions.review", "planner.manage"] as const) expect(can(w, a)).toBe(false);
    expect(can(owner, "analytics.view")).toBe(true);
  });
  it("never exposes a password, a hash or a token through any listing", async () => {
    const owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const text = JSON.stringify([await listContributors(), await listUsers(), await listPeople(), publicUser(owner)]);
    expect(text).not.toMatch(/passwordHash|password_hash|pbkdf2|token|secret/i);
    expect(text).not.toContain("Quiet-Lantern");
    const [row] = await listContributors();
    expect(Object.keys(row)).toEqual(expect.arrayContaining(["name", "email", "role", "specialization", "disabled", "assignedCount", "createdAt", "lastActiveAt"]));
  });
  it("contributors cannot change a password, not even their own", async () => {
    const w = (await getUserByEmail("writer@example.com"))!;
    const r = await changePassword({ userId: w.id, current: "Quiet-Lantern-Passphrase-77!", next: "Brand-New-Passphrase-88!", keepSessionHash: null });
    expect(r.ok).toBe(false);
    expect((await login({ email: "writer@example.com", password: "Quiet-Lantern-Passphrase-77!", ...ctx })).ok).toBe(true); // unchanged
  });
  it("a reset replaces the password, signs the person out everywhere and cannot target the owner", async () => {
    const owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const w = (await getUserByEmail("writer@example.com"))!;
    const { token } = await createSession(w.id, "ua");
    expect((await resetContributorPasswordAs(owner.id, w.id, "short")).ok).toBe(false);
    expect((await resetContributorPasswordAs(owner.id, w.id, "Fresh-Reset-Passphrase-12!")).ok).toBe(true);
    expect(await resolveSession(token)).toBeNull();
    expect((await login({ email: "writer@example.com", password: "Quiet-Lantern-Passphrase-77!", ...ctx })).ok).toBe(false);
    expect((await login({ email: "writer@example.com", password: "Fresh-Reset-Passphrase-12!", ...ctx })).ok).toBe(true);
    expect((await resetContributorPasswordAs(owner.id, owner.id, "Hijack-The-Owner-Passphrase-1!")).ok).toBe(false); // role = contributor only
    expect((await login({ email: "info@vierapparatus.com", password: NEXT, ...ctx })).ok).toBe(true);
  });
  it("the owner cannot be disabled or re-permissioned through the contributor functions; disabling revokes sessions", async () => {
    const owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const w = (await getUserByEmail("writer@example.com"))!;
    expect(await setDisabled(owner.id, true, owner.id)).toBe(false);
    expect(await setPermissions(owner.id, ["articles.write"], owner.id)).toBe(false);
    const { token } = await createSession(w.id, "ua");
    expect(await setDisabled(w.id, true, owner.id)).toBe(true);
    expect(await resolveSession(token)).toBeNull();
    expect((await login({ email: "writer@example.com", password: "Fresh-Reset-Passphrase-12!", ...ctx })).ok).toBe(false);
    expect((await listUsers()).filter((u) => u.role === "owner")).toHaveLength(1);
    expect(await removeContributor(owner.id, owner.id)).toBe(false); // the owner cannot be deleted through the contributor functions
    expect(await setDisabled(w.id, false, owner.id)).toBe(true);
  });
  it("sanitizes permissions", () => {
    expect(sanitizePermissions(["media.upload", "analytics.view", 5])).toEqual(["media.upload"]);
    expect(sanitizePermissions("x")).toEqual([]);
  });
});

import { conn } from "../db/client";
import { newId } from "../crypto";
import { sanitizePermissions, type Grantable, type Role } from "../auth/permissions";
import { audit, b, json, n, nowIso, s, sn, type Row } from "./util";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  permissions: Grantable[];
  disabled: boolean;
  mustChangePassword: boolean;
  bio: string;
  specialization: string;
  createdAt: string;
  lastLoginAt: string | null;
  lastActiveAt: string | null;
};
export type UserWithHash = User & { passwordHash: string };

const rowToUser = (r: Row): UserWithHash => ({
  id: s(r.id),
  email: s(r.email),
  name: s(r.name),
  role: s(r.role) as Role,
  permissions: sanitizePermissions(json<string[]>(r.permissions, [])),
  disabled: b(r.disabled),
  mustChangePassword: b(r.must_change_password),
  bio: s(r.bio),
  specialization: s(r.specialization),
  createdAt: s(r.created_at),
  lastLoginAt: sn(r.last_login_at),
  lastActiveAt: sn(r.last_active_at),
  passwordHash: s(r.password_hash),
});

/** The only way a user leaves the store layer: the password hash is dropped here, always. */
export function publicUser(u: UserWithHash): User {
  const { passwordHash, ...rest } = u;
  void passwordHash;
  return rest;
}

export const normalizeEmail = (e: string) => e.trim().toLowerCase();

export async function getUserByEmail(email: string): Promise<UserWithHash | null> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM users WHERE email = ?", args: [normalizeEmail(email)] });
  return r.rows[0] ? rowToUser(r.rows[0]) : null;
}

export async function getUserById(id: string): Promise<UserWithHash | null> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM users WHERE id = ?", args: [id] });
  return r.rows[0] ? rowToUser(r.rows[0]) : null;
}

export async function listUsers(): Promise<User[]> {
  const db = await conn();
  const r = await db.execute("SELECT * FROM users ORDER BY role = 'owner' DESC, created_at");
  return r.rows.map((row) => publicUser(rowToUser(row)));
}

/** Names for display (assignee pickers, "created by"): id and name only, never e-mail or anything else. */
export async function listPeople(): Promise<{ id: string; name: string; role: Role; disabled: boolean }[]> {
  const db = await conn();
  const r = await db.execute("SELECT id, name, role, disabled FROM users ORDER BY role = 'owner' DESC, name");
  return r.rows.map((x) => ({ id: s(x.id), name: s(x.name), role: s(x.role) as Role, disabled: b(x.disabled) }));
}

export type ContributorRow = User & { assignedCount: number };

/** The owner's contributor table. `assignedCount` = planner records plus loose articles assigned to the person. */
export async function listContributors(): Promise<ContributorRow[]> {
  const db = await conn();
  const r = await db.execute(`SELECT u.*,
      (SELECT COUNT(*) FROM planner_records p WHERE p.assigned_to = u.id AND p.status <> 'archived')
      + (SELECT COUNT(*) FROM articles a WHERE a.assigned_to = u.id AND NOT EXISTS (SELECT 1 FROM planner_records p WHERE p.article_id = a.id)) AS assigned_count
    FROM users u WHERE u.role = 'contributor' ORDER BY u.created_at`);
  return r.rows.map((row) => ({ ...publicUser(rowToUser(row)), assignedCount: n(row.assigned_count) }));
}

export async function ownerExists(): Promise<boolean> {
  const db = await conn();
  return (await db.execute("SELECT 1 FROM users WHERE role = 'owner' LIMIT 1")).rows.length > 0;
}

/** Creates the one owner account. Throws if an owner already exists (a unique index enforces it). */
export async function createOwner(input: { email: string; name: string; passwordHash: string; mustChangePassword: boolean }): Promise<User> {
  const db = await conn();
  const id = newId("u_");
  const t = nowIso();
  await db.execute({
    sql: `INSERT INTO users(id, email, name, role, password_hash, must_change_password, permissions, created_at, updated_at)
          VALUES (?, ?, ?, 'owner', ?, ?, '[]', ?, ?)`,
    args: [id, normalizeEmail(input.email), input.name.trim(), input.passwordHash, input.mustChangePassword ? 1 : 0, t, t],
  });
  await audit(id, "owner.bootstrap", input.email);
  return publicUser((await getUserById(id))!);
}

/** Owner-only (callers enforce it). The owner supplies the initial password; the contributor never registers and never changes it. */
export async function createContributor(input: {
  email: string;
  name: string;
  passwordHash: string;
  permissions: Grantable[];
  specialization?: string;
  bio?: string;
  disabled?: boolean;
  createdBy: string | null;
}): Promise<User> {
  const db = await conn();
  const id = newId("u_");
  const t = nowIso();
  await db.execute({
    sql: `INSERT INTO users(id, email, name, role, password_hash, must_change_password, permissions, specialization, bio, disabled, invited_by, created_at, updated_at, password_changed_at)
          VALUES (?, ?, ?, 'contributor', ?, 0, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [id, normalizeEmail(input.email), input.name.trim(), input.passwordHash, JSON.stringify(sanitizePermissions(input.permissions)), (input.specialization ?? "").trim().slice(0, 120), (input.bio ?? "").trim().slice(0, 600), input.disabled ? 1 : 0, input.createdBy, t, t, t],
  });
  await audit(input.createdBy, "contributor.created", input.email);
  return publicUser((await getUserById(id))!);
}

export async function setPassword(userId: string, passwordHash: string, opts: { mustChange: boolean }): Promise<void> {
  const db = await conn();
  const t = nowIso();
  await db.execute({
    sql: "UPDATE users SET password_hash = ?, must_change_password = ?, password_changed_at = ?, updated_at = ? WHERE id = ?",
    args: [passwordHash, opts.mustChange ? 1 : 0, t, t, userId],
  });
}

/** Owner resets a CONTRIBUTOR's password: the old hash is replaced and every session of that person ends immediately. */
export async function resetContributorPassword(userId: string, passwordHash: string, actorId: string): Promise<boolean> {
  const db = await conn();
  const t = nowIso();
  const r = await db.execute({
    sql: "UPDATE users SET password_hash = ?, must_change_password = 0, password_changed_at = ?, updated_at = ? WHERE id = ? AND role = 'contributor'",
    args: [passwordHash, t, t, userId],
  });
  if (!r.rowsAffected) return false;
  await db.execute({ sql: "DELETE FROM sessions WHERE user_id = ?", args: [userId] });
  await audit(actorId, "contributor.password_reset", userId);
  return true;
}

export async function touchLogin(userId: string): Promise<void> {
  const db = await conn();
  const t = nowIso();
  await db.execute({ sql: "UPDATE users SET last_login_at = ?, last_active_at = ? WHERE id = ?", args: [t, t, userId] });
}

export async function touchActive(userId: string): Promise<void> {
  const db = await conn();
  await db.execute({ sql: "UPDATE users SET last_active_at = ? WHERE id = ?", args: [nowIso(), userId] });
}

/** The owner edits their own display name and bio. */
export async function updateProfile(userId: string, p: { name: string; bio: string }): Promise<void> {
  const db = await conn();
  await db.execute({ sql: "UPDATE users SET name = ?, bio = ?, updated_at = ? WHERE id = ?", args: [p.name.trim().slice(0, 80), p.bio.trim().slice(0, 600), nowIso(), userId] });
}

export type ProfilePatch = { name?: string; email?: string; specialization?: string; bio?: string };

/** Owner edits a contributor's profile. A duplicate e-mail is refused. */
export async function updateContributorProfile(userId: string, p: ProfilePatch, actorId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const cur = await getUserById(userId);
  if (!cur || cur.role !== "contributor") return { ok: false, error: "Contributor not found." };
  const email = p.email !== undefined ? normalizeEmail(p.email) : cur.email;
  if (email !== cur.email) {
    const clash = await getUserByEmail(email);
    if (clash) return { ok: false, error: "An account with this e-mail already exists." };
  }
  const db = await conn();
  await db.execute({
    sql: "UPDATE users SET email = ?, name = ?, specialization = ?, bio = ?, updated_at = ? WHERE id = ? AND role = 'contributor'",
    args: [email, (p.name ?? cur.name).trim().slice(0, 80), (p.specialization ?? cur.specialization).trim().slice(0, 120), (p.bio ?? cur.bio).trim().slice(0, 600), nowIso(), userId],
  });
  await audit(actorId, "contributor.updated", userId);
  return { ok: true };
}

/** Contributors only: the owner row can never be disabled, re-permissioned or removed through these functions. */
export async function setDisabled(userId: string, disabled: boolean, actorId: string): Promise<boolean> {
  const db = await conn();
  const r = await db.execute({ sql: "UPDATE users SET disabled = ?, updated_at = ? WHERE id = ? AND role = 'contributor'", args: [disabled ? 1 : 0, nowIso(), userId] });
  if (r.rowsAffected) {
    if (disabled) await db.execute({ sql: "DELETE FROM sessions WHERE user_id = ?", args: [userId] });
    await audit(actorId, disabled ? "contributor.disabled" : "contributor.enabled", userId);
  }
  return r.rowsAffected > 0;
}

export async function setPermissions(userId: string, permissions: Grantable[], actorId: string): Promise<boolean> {
  const db = await conn();
  const r = await db.execute({ sql: "UPDATE users SET permissions = ?, updated_at = ? WHERE id = ? AND role = 'contributor'", args: [JSON.stringify(sanitizePermissions(permissions)), nowIso(), userId] });
  if (r.rowsAffected) await audit(actorId, "contributor.permissions", userId);
  return r.rowsAffected > 0;
}

/** Deletes a contributor. Their sessions end, assignments are cleared, and their articles/comments stay (credited by name). */
export async function removeContributor(userId: string, actorId: string): Promise<boolean> {
  const db = await conn();
  const exists = (await db.execute({ sql: "SELECT 1 FROM users WHERE id = ? AND role = 'contributor'", args: [userId] })).rows.length > 0;
  if (!exists) return false;
  await db.batch(
    [
      { sql: "DELETE FROM sessions WHERE user_id = ?", args: [userId] },
      { sql: "UPDATE articles SET assigned_to = NULL WHERE assigned_to = ?", args: [userId] },
      { sql: "UPDATE articles SET author_id = NULL WHERE author_id = ?", args: [userId] },
      { sql: "UPDATE planner_records SET assigned_to = NULL WHERE assigned_to = ?", args: [userId] },
      { sql: "DELETE FROM users WHERE id = ? AND role = 'contributor'", args: [userId] },
    ],
    "write",
  );
  await audit(actorId, "contributor.removed", userId);
  return true;
}

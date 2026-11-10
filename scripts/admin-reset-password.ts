/* Emergency reset of the OWNER's password (for example after a lock-out or a lost password).
 *   npm run admin:reset-password              type a temporary password at the hidden prompt
 *   npm run admin:reset-password -- --generate  create a random temporary password and print it once
 *
 * The owner is flagged "must change password": the first sign-in forces a new one, so the temporary value is short-lived.
 * Every session is ended and the sign-in lock-outs are cleared. Needs the same TURSO_* and AUTH_SECRET as the deployments.
 * Run it only on your own computer; it is not reachable from the website.
 */
import "./_local-client";
import crypto from "node:crypto";
import { dbConfigured, conn } from "../src/lib/db/client";
import { hashPassword } from "../src/lib/auth/password";
import { setPassword } from "../src/lib/store/users";

function askSecret(question: string): Promise<string> {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    if (!stdin.isTTY) return resolve("");
    let buf = "";
    const finish = () => {
      stdin.removeListener("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
    };
    const onData = (chunk: Buffer | string) => {
      for (const ch of chunk.toString("utf8")) {
        if (ch === "\r" || ch === "\n") {
          finish();
          process.stdout.write("\n");
          return resolve(buf.trim());
        }
        if (ch === "\u0003") {
          finish();
          process.exit(130);
        }
        if (ch === "\u007f" || ch === "\b") buf = buf.slice(0, -1);
        else if (ch >= " ") buf += ch;
      }
    };
    process.stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onData);
  });
}

/** 20 characters from an unambiguous alphabet, with every character class present. */
function generate(): string {
  const sets = ["ABCDEFGHJKLMNPQRSTUVWXYZ", "abcdefghijkmnopqrstuvwxyz", "23456789", "!#$%*+-=?"];
  const all = sets.join("");
  const pick = (s: string) => s[crypto.randomInt(s.length)];
  const chars = [...sets.map(pick), ...Array.from({ length: 16 }, () => pick(all))];
  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

async function main() {
  if (!dbConfigured()) {
    console.error("TURSO_DATABASE_URL is not set (put it, TURSO_AUTH_TOKEN and AUTH_SECRET in .env.local).");
    process.exit(1);
  }
  if ((process.env.AUTH_SECRET ?? "").length < 32) {
    console.error("AUTH_SECRET must be set and must match the deployments, or the new password will not work there.");
    process.exit(1);
  }
  const db = await conn();
  const owner = (await db.execute("SELECT id, email FROM users WHERE role = 'owner'")).rows[0];
  if (!owner) {
    console.error("There is no owner yet. Run: npm run admin:bootstrap");
    process.exit(1);
  }
  const generated = process.argv.includes("--generate");
  const password = generated ? generate() : await askSecret("New temporary password (hidden): ");
  const problem = password.length < 8 ? "Use at least 8 characters." : null;
  if (problem) {
    console.error(problem);
    process.exit(1);
  }
  await setPassword(String(owner.id), await hashPassword(password), { mustChange: true });
  await db.execute({ sql: "DELETE FROM sessions WHERE user_id = ?", args: [owner.id] });
  await db.execute("DELETE FROM rate_limits WHERE key LIKE 'login:%' OR key LIKE 'pw:%'");
  await db.execute({ sql: "INSERT INTO audit_log(ts, user_id, action, detail) VALUES (?, ?, 'owner.password_reset', 'local script')", args: [new Date().toISOString(), owner.id] });
  console.log(`\nPassword reset for ${owner.email}. Sessions ended and sign-in lock-outs cleared.`);
  if (generated) console.log(`Temporary password (shown once): ${password}`);
  console.log("Sign in with it; you will be asked to choose a new password straight away.");
  process.exit(0);
}

main().catch((e) => {
  console.error("Reset failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});

/* One-time creation of the owner account.
 *   npm run admin:bootstrap
 *
 * The temporary password is typed at a hidden prompt (or read from OWNER_BOOTSTRAP_PASSWORD for automation), hashed
 * immediately and stored only as a salted hash. It is never written to a file, logged or committed. The account is flagged
 * "must change password": the first sign-in forces a new password and the temporary one stops working.
 *
 * IMPORTANT: AUTH_SECRET must be the SAME value here and on every deployment (Vercel and Cloudflare), because it is mixed
 * into password hashes. Use the same TURSO_DATABASE_URL / TURSO_AUTH_TOKEN as the deployments, too.
 */
import "./_local-client";
import readline from "node:readline";
import { dbConfigured } from "../src/lib/db/client";
import { bootstrapOwner } from "../src/lib/auth/service";
import { ownerExists } from "../src/lib/store/users";

function ask(question: string, opts: { fallback?: string } = {}): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl.on("close", () => resolve(opts.fallback ?? "")); // no input available (e.g. piped): use the default
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim() || opts.fallback || "");
    });
  });
}

/**
 * Hidden password entry, read straight from the terminal in raw mode. readline's hidden prompt can show nothing and return an
 * empty answer on some Windows terminals (typed keys stay in the buffer until another key is pressed), so it is not used here.
 * The password is never echoed or logged. Without a terminal (piped input), the line is read as it is.
 */
function askSecret(question: string): Promise<string> {
  if (!process.stdin.isTTY) return ask(question);
  return new Promise((resolve) => {
    const stdin = process.stdin;
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
          resolve(buf.trim());
          return;
        }
        if (ch === "\u0003") {
          // Ctrl+C
          finish();
          process.stdout.write("\n");
          process.exit(130);
        }
        if (ch === "\u007f" || ch === "\b") buf = buf.slice(0, -1); // Backspace
        else if (ch >= " ") buf += ch; // ordinary characters only; other control keys are ignored
      }
    };
    process.stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onData);
  });
}

async function main() {
  if (!dbConfigured()) {
    console.error("TURSO_DATABASE_URL is not set. Put it (and TURSO_AUTH_TOKEN, AUTH_SECRET) in .env.local or the environment.");
    process.exit(1);
  }
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    console.error("AUTH_SECRET must be set to a random string of at least 32 characters, and must match your deployments.");
    process.exit(1);
  }
  if (await ownerExists()) {
    console.error("An owner account already exists. Nothing was changed.");
    process.exit(1);
  }
  const email = process.env.OWNER_BOOTSTRAP_EMAIL || (await ask("Owner e-mail [info@vierapparatus.com]: ", { fallback: "info@vierapparatus.com" }));
  const name = process.env.OWNER_BOOTSTRAP_NAME || (await ask("Owner display name [Muhammad Satrio]: ", { fallback: "Muhammad Satrio" }));
  const password = process.env.OWNER_BOOTSTRAP_PASSWORD || (await askSecret("Temporary password (hidden): "));
  if (!process.env.OWNER_BOOTSTRAP_PASSWORD && password.length < 8) {
    // Diagnostic only: the password itself is never printed.
    console.error(`The password received has ${password.length} character(s). Nothing was saved. Try again, typing slowly, without pasting.`);
    process.exit(1);
  }
  const r = await bootstrapOwner({ email, name, password });
  if (!r.ok) {
    console.error(r.error);
    process.exit(1);
  }
  console.log(`\nOwner account created for ${r.user.email}.`);
  console.log("Sign in at /admin. You will be asked to choose a new password straight away; the temporary one then stops working.");
}

main().catch((e) => {
  console.error("Bootstrap failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});

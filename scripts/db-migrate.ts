/* Creates or upgrades the database tables (safe to run repeatedly).
 *   npm run db:migrate
 * Needs TURSO_DATABASE_URL (and TURSO_AUTH_TOKEN for a Turso database) in the environment or in .env.local.
 * The app also does this by itself on the first request, so running it is optional but recommended after a deploy.
 */
import "./_local-client";
import { db, dbConfigured, ensureSchema } from "../src/lib/db/client";
import { MIGRATIONS } from "../src/lib/db/migrations";

async function main() {
  if (!dbConfigured()) {
    console.error("TURSO_DATABASE_URL is not set. Put it in .env.local or the environment, then run again.");
    process.exit(1);
  }
  await ensureSchema();
  const v = (await db().execute("SELECT value FROM meta WHERE key = 'schema_version'")).rows[0]?.value;
  console.log(`Database is at schema version ${v} (latest: ${MIGRATIONS.at(-1)?.version}).`);
}

main().catch((e) => {
  console.error("Migration failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});

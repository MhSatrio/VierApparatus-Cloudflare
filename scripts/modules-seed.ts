/* Installs the learning platform: the six subjects, Biology's 35 specializations, every specialization's academic levels, the
 * General Biology curriculum (12 levels, 232 modules) and one Planner task per module. Structure only: no lesson text and no
 * references. Safe to run again: it adds only what is missing. (On a database that has the earlier structure, the database
 * migration has already moved the old subjects under Biology; this adds what is still missing.)
 *   npm run modules:seed
 * Needs TURSO_DATABASE_URL (and TURSO_AUTH_TOKEN for a Turso database) in the environment or in .env.local, and an owner account.
 */
import "./_local-client";
import { db, dbConfigured, ensureSchema } from "../src/lib/db/client";
import { ensureCurriculum } from "../src/lib/store/modules";

async function main() {
  if (!dbConfigured()) {
    console.error("TURSO_DATABASE_URL is not set. Put it in .env.local or the environment, then run again.");
    process.exit(1);
  }
  await ensureSchema();
  const owner = (await db().execute("SELECT id, name FROM users WHERE role = 'owner' LIMIT 1")).rows[0];
  if (!owner) {
    console.error("There is no owner account yet. Create it first: npm run admin:bootstrap");
    process.exit(1);
  }
  const made = await ensureCurriculum({ id: String(owner.id), name: String(owner.name) });
  console.log(`Added ${made.subjects} subjects, ${made.specializations} specializations, ${made.levels} levels, ${made.modules} modules and ${made.tasks} planner tasks.`);
  if (!made.subjects && !made.specializations && !made.levels && !made.modules && !made.tasks) console.log("Nothing to add: the curriculum is already installed.");
}

main().catch((e) => {
  console.error("Failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});

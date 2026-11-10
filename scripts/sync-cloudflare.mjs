// Copies the SHARED application code from this (Vercel) project to the Cloudflare project, so both deployments run the same
// site. Deployment-specific files are never overwritten, and package.json is merged instead of copied.
//
//   node scripts/sync-cloudflare.mjs --dry-run          show what would change
//   node scripts/sync-cloudflare.mjs                    do it
//   node scripts/sync-cloudflare.mjs --target "<path>"  another destination folder
//
// Develop in either folder, but always run this from the Vercel project (the source of truth) afterwards, then run
// `npm install` and `npm run check` in the Cloudflare folder.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, "..");
const argv = process.argv.slice(2);
const dry = argv.includes("--dry-run");
const t = argv.indexOf("--target");
const target = path.resolve(t >= 0 ? argv[t + 1] : path.join(source, "..", "VierApparatus-Cloudflare page"));

/** Folders mirrored exactly (extra files at the destination are removed). */
const MIRROR = ["src", "tests", "scripts", "content", "data", "archive", "docs", "public", ".github"];
/** Single files copied as they are. */
const FILES = ["next.config.ts", "tsconfig.json", "eslint.config.mjs", "postcss.config.mjs", "vitest.config.mts", "README.md", ".env.example"];
/** Never copied from the source and never deleted at the destination. */
const KEEP = new Set(["public/_headers", "public/.well-known"]);
/** Never copied or deleted anywhere (generated or local). */
const IGNORE = (rel) => /(^|\/)(node_modules|\.next|\.open-next|\.wrangler|\.tmp|\.data|\.git|\.vercel)(\/|$)/.test(rel) || /tsconfig\.tsbuildinfo$/.test(rel);
/** Entries in package.json that belong to one deployment only. */
const CF_ONLY_DEPS = /^(@opennextjs\/cloudflare|wrangler)$/;
const CF_ONLY_SCRIPTS = ["preview", "deploy", "cf:build", "cf-typegen"];

let changed = 0;
const log = (verb, rel) => {
  changed++;
  console.log(`${dry ? "would " : ""}${verb.padEnd(7)} ${rel}`);
};

function walk(dir, base = dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full).split(path.sep).join("/");
    if (IGNORE(rel)) continue;
    // stat (not the Dirent) so OneDrive placeholder folders, which are reparse points on Windows, count as folders
    if (fs.statSync(full).isDirectory()) walk(full, base, out);
    else out.push(rel);
  }
  return out;
}

function copyFile(rel) {
  const from = path.join(source, rel);
  const to = path.join(target, rel);
  const same = fs.existsSync(to) && fs.readFileSync(from).equals(fs.readFileSync(to));
  if (same) return;
  log(fs.existsSync(to) ? "update" : "add", rel);
  if (!dry) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
}

if (!fs.existsSync(target)) throw new Error(`Target folder not found: ${target}`);
for (const dir of MIRROR) {
  const src = walk(path.join(source, dir), source).filter((r) => !KEEP.has(r));
  const dst = walk(path.join(target, dir), target).filter((r) => !KEEP.has(r));
  for (const rel of src) copyFile(rel);
  for (const rel of dst) {
    if (!src.includes(rel)) {
      log("delete", rel);
      if (!dry) fs.rmSync(path.join(target, rel), { force: true });
    }
  }
}
for (const f of FILES) if (fs.existsSync(path.join(source, f))) copyFile(f);

// Remove folders that became empty (an empty `products/` or `about/` folder would still confuse people and tooling).
function pruneEmpty(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir)) {
    const full = path.join(dir, e);
    if (fs.statSync(full).isDirectory() && !IGNORE(path.relative(target, full).split(path.sep).join("/"))) pruneEmpty(full);
  }
  if (!fs.readdirSync(dir).length && dir !== target) {
    log("rmdir", path.relative(target, dir).split(path.sep).join("/"));
    if (!dry) fs.rmdirSync(dir);
  }
}
if (!dry) for (const dir of MIRROR) pruneEmpty(path.join(target, dir));

// package.json: take the source's dependencies and scripts, keep the destination's name and Cloudflare-only entries.
{
  const src = JSON.parse(fs.readFileSync(path.join(source, "package.json"), "utf8"));
  const dstPath = path.join(target, "package.json");
  const dst = JSON.parse(fs.readFileSync(dstPath, "utf8"));
  const merged = { ...src, name: dst.name, version: dst.version };
  for (const key of ["dependencies", "devDependencies"]) {
    merged[key] = { ...src[key] };
    for (const [n, v] of Object.entries(dst[key] ?? {})) if (CF_ONLY_DEPS.test(n)) merged[key][n] = v;
    merged[key] = Object.fromEntries(Object.entries(merged[key]).sort(([a], [b]) => a.localeCompare(b)));
  }
  merged.scripts = { ...src.scripts, build: dst.scripts?.build ?? src.scripts.build };
  for (const k of CF_ONLY_SCRIPTS) if (dst.scripts?.[k]) merged.scripts[k] = dst.scripts[k];
  const out = JSON.stringify(merged, null, 2) + "\n";
  if (out !== fs.readFileSync(dstPath, "utf8")) {
    log("merge", "package.json");
    if (!dry) fs.writeFileSync(dstPath, out);
  }
}

console.log(changed ? `\n${dry ? "Would change" : "Changed"} ${changed} file(s) in ${target}` : "\nAlready in sync.");
if (!dry && changed) console.log("Next: in the target folder run `npm install` (updates package-lock.json), then `npm run check`.");

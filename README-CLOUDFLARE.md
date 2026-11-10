# Cloudflare deployment (Workers + OpenNext)

This folder is the same site as the Vercel project (`../vierapparatus`), packaged for **Cloudflare Workers** with the OpenNext adapter.
Next.js server rendering does not run on classic Cloudflare Pages, so Workers is used. **Nothing has been deployed from this workspace.**
Read the main [README.md](README.md) first; this file only covers what is specific to Cloudflare.

## What is Cloudflare-specific

| File | Purpose |
|---|---|
| `wrangler.jsonc` | Worker name `vierapparatus-cloudflare`, entry `custom-worker.ts`, `nodejs_compat`, static assets, a `version_metadata` binding. |
| `open-next.config.ts` | OpenNext settings. Pages are rendered from the Turso database on request, so no R2/KV/D1 add-on is needed. |
| `custom-worker.ts` | Wraps the generated worker with the **edge cache**: public pages/RSS/sitemap for 5 minutes (stale copy for 1 hour), uploaded images for a year. Skips `/admin`, `/api`, `/_next`. Keyed per deployment. |
| `public/_headers` | `/_next/static/*` immutable for a year; `/brand/*` and `/images/*` one week. |
| `package.json` | Adds `@opennextjs/cloudflare`, `wrangler` and the `preview` / `deploy` / `cf:build` scripts; `build` is `next build --webpack`. |

Everything else is kept identical to the Vercel project by `node scripts/sync-cloudflare.mjs` (run from the Vercel folder).
`next.config.ts` detects Cloudflare through `open-next.config.ts` and then skips the type check inside `next build` (run `npm run typecheck` yourself; `npm run check` does).

## Deploy

1. Make sure the owner account exists in the shared database (`npm run admin:bootstrap`, see the main README) and that `AUTH_SECRET` is the same value you set on Vercel.
2. `npx wrangler login`, then set the secrets:
   `npx wrangler secret put TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`, and optionally `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL`.
3. PowerShell: `$env:NEXT_PUBLIC_SITE_URL = "https://<your-address>"` then `npm run deploy` (builds with OpenNext and uploads).
   For a first test use the `*.workers.dev` address in `NEXT_PUBLIC_SITE_URL` so canonical links and the sitemap point at the test site; rebuild with the real domain later.
4. Local test of the Cloudflare runtime: copy `.dev.vars.example` to `.dev.vars`, then `npm run preview` (http://127.0.0.1:8787).

## Images in R2 (`image.vierapparatus.com`)

Uploads from the admin area (article body and cover, module lessons, sponsors) are converted to WebP in the browser, with a thumbnail, and
stored by `src/lib/images/`. The server accepts only WebP, re-checks the bytes, and files the image under `articles/`, `modules/`,
`products/` or `sponsors/` (thumbnails under `thumbnails/<kind>/`) with a generated safe name. Which store is used depends on what exists:

1. **R2 binding `IMAGES`** (production on Cloudflare): uncomment the `r2_buckets` block in `wrangler.jsonc`, put your bucket's real name in it, deploy.
2. **S3 keys** (Vercel, or a PC testing against the real bucket): set `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`.
3. **Neither**: images stay in the database and are served from `/media/<id>` (local development).

`IMAGE_PUBLIC_BASE_URL` is the public address the stored images are served from (default `https://image.vierapparatus.com`); the bucket must be
reachable there (R2 > the bucket > Settings > Custom Domains). Images uploaded before this feature keep their `/media/...` addresses and keep working.
Not verified from this workspace: a real upload to your bucket (the bucket name and keys are not in the project).

## Learning modules

`/module` is the learning platform. Install its structure once with `npm run modules:seed` (or the "Install the curriculum" button on the Planner's Modules
tab): six subjects, Biology's 35 specializations, their levels, the General Biology curriculum (12 levels, 232 modules) and a Planner task per module. It adds structure only; every module is
"coming soon" until it is written in the module editor and published by the owner. Migrations 8 to 10 add tables and columns with defaults (9 moves the earlier subjects under Biology and writes redirects; 10 adds the product review tables), so back up Turso before the first deploy. Products: run `npm run products:legacy` once to import the old catalogue (BIOBASE published, the rest archived).

## Things to know before relying on it

- **The edge cache only works on a custom domain.** On `*.workers.dev` Cloudflare ignores the Cache API, so every page is rendered by the Worker.
- **Free plan CPU limit (10 ms).** Rendering a page from the database can exceed it on an uncached request (Cloudflare error **1102**). With a custom domain the cache absorbs most traffic, but the first
  request per page per data centre and every request after the 5-minute window still render. The Workers **Paid** plan (about USD 5/month) removes the risk.
- **Sign-in on the free plan.** Password hashing uses PBKDF2 at 100,000 iterations (the Workers maximum), which can exceed 10 ms. If sign-in fails with 1102 on the free plan, use the Workers Paid plan, or do your admin work on the Vercel site: both read the same accounts and articles from the same database.
- **Windows.** OpenNext warns it is not fully supported on Windows. It built and previewed here, but WSL or Linux CI is safer for production builds.
- **Not verified from this workspace:** an actual upload, the real CPU behaviour, the custom-domain edge cache, and a real Turso database. Local checks covered the production Next.js build and the application's behaviour against a SQLite file.

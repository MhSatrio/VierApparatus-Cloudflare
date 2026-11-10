# Deployment

Nothing in this repository deploys itself, and **no production deployment, DNS or domain change has been made**. These are the steps for when you decide to.

## 1. One-time: database and owner

1. Create a free Turso database (https://turso.tech). Note its URL (`libsql://…`) and create a token.
2. Generate `AUTH_SECRET` (32+ random characters) and keep it: it must be identical on Vercel, Cloudflare and for the next step.
3. In `.env.local` (never committed) set `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`.
4. `npm run db:migrate`, then `npm run admin:bootstrap` (temporary password typed at the hidden prompt), then optionally `npm run content:seed`.
5. First sign-in forces a new password.

## 2. Vercel

1. Project → Settings → Environment Variables (Production, and Preview if you want): `NEXT_PUBLIC_SITE_URL`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`,
   and optionally `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL`.
2. `npm run check`, then `vercel --prod` (or push to the production branch).
3. Check: `/` , `/articles`, `/admin`, `/sitemap.xml`, `/products` (the product review page, with its disclaimer first).

## 3. Cloudflare (Workers + OpenNext, in `VierApparatus-Cloudflare page`)

1. `node scripts/sync-cloudflare.mjs` (from the Vercel folder) if shared code changed; then in the Cloudflare folder `npm install && npm run check`.
2. `npx wrangler login`. Add the secrets: `npx wrangler secret put TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`, and optionally `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL`.
3. Set the public address for the build (PowerShell): `$env:NEXT_PUBLIC_SITE_URL = "https://<address>"`, then `npm run deploy`.
4. The edge HTML cache (`custom-worker.ts`) works only on a **custom domain**. On `*.workers.dev` every page is rendered by the Worker, and on the free plan an uncached page may hit CPU limits (Error 1102).
5. Cloudflare "Pages" is not used: Next.js SSR runs on Workers via OpenNext (this is what the Cloudflare folder was already set up for).

## 4. After going live

- Search Console: submit `https://<domain>/sitemap.xml`. Removed product and equipment URLs return **410 Gone**, which search engines drop faster than a 404.
- Publishing an article in the admin notifies IndexNow automatically (only when `NEXT_PUBLIC_SITE_URL` is the real domain).
- Add a UTM-tagged link when you share articles, to see campaign results in Analytics.

## Product reviews and learning modules

The database changes (migrations 9 and 10) apply themselves on the first request after a deploy. Back up Turso first. Then, once, from a computer with `.env.local` pointing at the live database: `npm run modules:seed` (specializations, levels, tasks) and `npm run products:legacy` (imports the old catalogue: BIOBASE stays published, everything else is archived). Both are safe to repeat.

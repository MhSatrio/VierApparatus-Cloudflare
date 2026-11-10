# Feasibility report: collaboration on free tiers

Written before implementing Collab. Limits were read from the official pages on **2026-11-06** (links at the end). Where a page did not state something, this report says so instead of guessing.

## Verdict

**Yes, with the architecture that already exists plus save-based collaboration (Option B) and assignment (Option C).** Real-time editing (Option A) is technically possible but not worth its cost and risk for 1 owner + a handful of contributors, so it is **not implemented**. Two things in the plan changed because of what the limits pages say (see "What the research changed").

## Corrections to the brief's assumptions

| The brief says | Reality in this repository |
|---|---|
| "Existing Article Planner" (table, custom fields, saved views, Kanban, ticket view, CSV, info box) | **There is no Article Planner in either folder.** It is built new, as part of this work, and Collab is a view of the same records (no duplicate copies). |
| "Cloudflare Pages" | The Cloudflare folder is **Workers + OpenNext** (Next.js server rendering does not run on classic Pages). Pages Function requests count toward Workers quotas anyway. |
| "If D1 is suitable, consider keeping it" | The canonical database is **Turso**, chosen earlier and used by both deployments. D1 is not used, and it is the wrong choice here: Vercel can only reach D1 through Cloudflare's REST API (an API token, slower, rate-limited), which breaks "both deployments share one database". |
| Contributors invited by link, choose their own password | Replaced: **only the owner creates accounts and sets/resets passwords; contributors cannot change them.** The invitation flow is removed. |

## The 12 questions

1. **Vercel Hobby, application-level multi-user auth?** Yes. Authentication is in the application (sessions in the database); it uses no Vercel team seats. Team collaboration is a *Pro* feature ($20/seat) and is not needed.
2. **Cloudflare, same auth?** Yes. Same code, same database. One caveat: PBKDF2 at the Workers maximum of 100,000 iterations can exceed the Free plan's 10 ms CPU limit on sign-in (already documented).
3. **Both deployments on one database?** Yes: Turso over HTTPS (verified earlier against the production HTTP client and the local Worker runtime).
4. **Contributors reach the same records from either deployment?** Yes, because there is exactly one database. Sessions are per-deployment (cookies are per domain), data is shared.
5. **Master Admin manages accounts without Vercel Team features?** Yes; it is plain application code.
6. **Shared editing through ordinary API requests?** Yes: save + optimistic version check (already in the editor: a stale save is refused with HTTP 409).
7. **Save-based collaboration without polling?** Yes. Nothing runs unless a person is on the page; there are no timers that call the server except the existing 3-second autosave *after the user types*.
8. **Real-time needs Durable Objects or another service?** On Cloudflare, Durable Objects (SQLite-backed ones are available on Free). On Vercel, **WebSockets are now a public beta** on Fluid Compute, but function instances share no memory, so state needs an external store, and connections end at the function's maximum duration. A real-time hub that serves *both* deployments would have to live on one platform (Cloudflare) and be reached cross-origin from the other.
9. **Do Durable Objects consume the free tier substantially?** Free plan: **100,000 requests/day and 13,000 GB-s duration/day**, and over-limit operations fail. One always-open (non-hibernating) 128 MB WebSocket costs about 450 GB-s per hour, so the daily duration budget is about 29 connection-hours; incoming WebSocket messages are billed at 20:1. A small team fits, but a forgotten open tab, a beta platform on one side and CRDT/operational-transform complexity on the other are real costs for little benefit. **Rejected.**
10. **Version history inside the database allowance?** Yes: Turso Free is **5 GB storage**. With revisions capped per article (below) the estimate is a few hundred MB at the very most.
11. **Publish without a deployment?** Yes (already true): articles live in the database; publishing changes rows, not files, and triggers no build.
12. **Unnecessary function invocations?** Two found and fixed (below): the analytics beacon sends up to two requests per page view, and some admin pages issued one database call per row.

## What the research changed

1. **Turso Free blocks the database when any quota is exceeded** (it does not bill overage; overage billing exists only on paid plans). A blocked database takes the public site and the admin down together. So the design treats quota exhaustion as the main operational risk:
   - Turso counts **rows read = rows scanned**, not rows returned; an unindexed lookup or an aggregate (`COUNT`, `SUM`) is billed for every row it touches. The old analytics dashboard re-aggregated the raw `events` table on every view (about 9 aggregate queries over up to 30 days of events). At 5,000 visitors/day that is roughly 2-3 million rows read per dashboard view, i.e. a few hundred views would exhaust the monthly allowance. **Fix: lazy daily roll-ups** (a finished day is summarised once, the first time a dashboard needs it; at most 8 missing days per request, so the first views after a long gap may need a reload or two; no scheduled job, no background work), bounded counts in tables, and 90-day raw retention.
   - Public pages must survive a database outage: the Cloudflare Worker keeps a second 24-hour copy of each public page and serves it (header `X-Served-Stale: 1`) when rendering fails, and Vercel pages carry `s-maxage=300, stale-while-revalidate=86400`.
2. **Workers Free allows 50 subrequests per request**, and every database statement is one subrequest. Code that looped (one query per row: attachment metadata, the CSV export paginating 200 rows at a time) could break on Cloudflare Free. Those paths now use single queries, and new code keeps a budget of well under 20 statements per request.
3. **Vercel Hobby: 1,000,000 function invocations/month and non-commercial use only.** The analytics beacon was the main consumer (page view + engagement = up to 2 invocations per page view). The engagement beacon now fires only for visits longer than 10 seconds.

## Eligibility warning (not a technical question)

Vercel's fair-use page restricts Hobby to **non-commercial, personal use** and defines commercial use as any deployment used for the financial gain of anyone involved: payments, ads (including AdSense), affiliate links as the main purpose, or being paid to create/update/host the site. Donations do not count. A personal science publication without income fits; **sponsorships, ads or paid services would not**, and the plan would have to change. I cannot judge your situation; please check the fair-use text yourself. The Cloudflare Free plan has no equivalent restriction in the pages I read.

## Free-tier quotas (official, 2026-11-06)

| Service | Relevant free limits | Over the limit |
|---|---|---|
| Vercel Hobby | 1,000,000 function invocations; 4 CPU-hours active CPU; 360 GB-hours memory; 100 GB Fast Data Transfer; 10 GB origin transfer; 1,000,000 CDN requests; 100 deployments/day; Web Analytics 50,000 events; function max duration 300 s | Usage resets after 30 days; you wait (no automatic charge on Hobby) |
| Cloudflare Workers Free | 100,000 requests/day; 10 ms CPU/request; 128 MB memory; 50 subrequests/request; 64 MiB Worker (no compressed limit); 20,000 static-asset files, 25 MiB each | Error 1027 (daily limit); static-asset requests are free and unlimited |
| Cloudflare Pages Free | 500 builds/month; 20,000 files | Pages Functions requests count toward Workers quotas (not used here) |
| Cloudflare Durable Objects Free | SQLite-backed only; 100,000 requests/day; 13,000 GB-s/day | Operations fail until 00:00 UTC |
| Turso Free | 5 GB storage; 500 million rows read/month; 10 million rows written/month; 100 databases; no credit card | Databases are **blocked** until the month resets or you upgrade |

## Resource estimates

Assumptions (stated, not measured): 2.5 page views per visitor; 70 % of page views reach the origin at low traffic (short cache window), 30 % at high traffic; 1 analytics request per page view plus 0.4 engagement requests (visits over 10 s); an article page costs ~3 statements and ~70 rows read; each analytics event is one row written; revisions are capped (30 automatic per article); editing sessions are 1 hour/day per active contributor with a save about every 20 s of typing. Turso counts index maintenance in rows written, so the real figure is somewhat higher than the one-row-per-event used here.

| Visitors/day | Vercel invocations/month (limit 1,000,000) | Workers requests/day (limit 100,000) | Turso rows written/month (limit 10 M) | Analytics storage after 90 days |
|---|---|---|---|---|
| 100 | ~15,000 | ~1,100 | ~11,000 | ~3 MB |
| 500 | ~80,000 | ~5,500 | ~55,000 | ~15 MB |
| 1,000 | ~160,000 | ~11,000 | ~110,000 | ~30 MB |
| 5,000 | ~700,000 (about 70 %: the first quota to approach) | ~55,000 | ~550,000 | ~150 MB |

Rows read: with roll-ups the dashboard costs a few thousand rows per view at any traffic level; an article page costs ~70 rows uncached. At 5,000 visitors/day uncached public reads would be ~15 million rows/month, about 3 % of the 500 million allowance.

Collaboration load (owner plus N contributors, each editing about 1 hour/day): N = 2, 5, 10 means roughly 600, 1,500, 3,000 saves per month, i.e. under 20,000 rows written and a few thousand function invocations: negligible next to the traffic above. Storage: 40 revisions x ~30 KB x 100 articles is about 120 MB.

## Recommended architecture (implemented)

- **One canonical database (Turso)**, both deployments read and write it; no polling; nothing runs unless someone is on a page.
- **Planner records are the single source of truth for tasks.** "Collab" is a view of those records; an optional link ties a record to one article. Review state changes update both sides inside one store function (sequential statements, not a database transaction, so a crash between the two statements could leave them briefly out of step; the task page shows the article's state as the tie-breaker).
- **Option B + C**: optimistic version checks, last-editor, revisions on meaningful saves only, comments, activity log, assignment and review workflow. Only the owner publishes.
- **Quota guard rails**: daily analytics roll-ups, bounded table counts, capped revisions, a usage panel in Settings with warnings, stale-if-error on Cloudflare, engagement beacon threshold, no N+1 queries.

## Limitations to accept

- Edits are visible on the public site after the cache window (about 5 minutes on both deployments).
- If the Turso database is blocked by quota, admin and uncached pages stop; cached pages keep serving for a while (Cloudflare: the 24-hour stale copy, custom domain only; Vercel: the one-day stale window).
- Rows-read usage cannot be measured by the app (Turso exposes it in its dashboard/API); the Settings panel shows size, rows written this month and links to the dashboards.
- Two people editing the same article are protected from silently overwriting each other, but there is no live cursor or merge: the later saver is told to reload.

## Sources

- Vercel Hobby plan: https://vercel.com/docs/plans/hobby
- Vercel limits: https://vercel.com/docs/limits
- Vercel fair use: https://vercel.com/docs/limits/fair-use-guidelines
- Vercel WebSockets: https://vercel.com/kb/guide/do-vercel-serverless-functions-support-websocket-connections
- Cloudflare Workers limits: https://developers.cloudflare.com/workers/platform/limits/
- Cloudflare Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- Workers static assets billing: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- Durable Objects pricing: https://developers.cloudflare.com/durable-objects/platform/pricing/
- Turso pricing and billing: https://turso.tech/pricing , https://docs.turso.tech/help/usage-and-billing

## Verification status (2026-11-06)

Verified in this workspace:

- 153 automated tests (unit, store, HTTP route handlers) pass against a local SQLite file **and** through the production Turso HTTP client against a local stand-in server; type-check and lint are clean in both project folders.
- Browser end-to-end test (real Chromium, production build, throw-away database): 116 checks pass, including creating a contributor with an owner-chosen password, planner task creation and assignment, the contributor's restricted menu and blocked pages, research notes, submit/lock/revision/approve, comments, a refused stale save, version history, and a password reset that signs the person out.
- The Cloudflare Worker build, run locally against the same stand-in database: 68/68 checks of the second half pass; 45 of 48 of the first half pass. The three that do not are public-page freshness checks (a new article on the home page, an old-address redirect and the sitemap right after a change), which cannot pass inside the Worker's 5-minute edge cache by design.
- With the database stopped, the Worker kept serving pages that were already in its edge cache and returned an error for a page that had never been visited. The 24-hour stale copy itself (served only after a cache entry has expired) could **not** be exercised: the local Worker runtime did not expire cache entries even after more than 5 minutes, so that path is untested.

**Not verified** (cannot be from here): a real Turso database, real Vercel and Cloudflare deployments, the Cloudflare Free plan's 10 ms CPU limit (error 1102) for sign-in and uncached pages, the edge cache and the stale copy on a real custom domain (Cache API does nothing on `*.workers.dev`), Resend e-mail, and live IndexNow pings. Resource figures above are estimates from official limits, not measurements.

import { ChangePasswordForm, LogoutButton } from "@/components/admin/AuthForms";
import { CalendarFeedCard } from "@/components/admin/CalendarFeedCard";
import { MinWordsForm } from "@/components/admin/MinWordsForm";
import { NewsletterSettingsForm } from "@/components/admin/newsletter/NewsletterSettingsForm";
import { ProfileForm } from "@/components/admin/ProfileForm";
import { Card, dateTime, PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { dbConfigured } from "@/lib/db/client";
import { site } from "@/lib/site";
import { FREE_LIMITS, levelOf, usage, type UsageLevel } from "@/lib/store/usage";
import { getPopupSettings } from "@/lib/store/newsletter-settings";
import { getMinWords } from "@/lib/store/site-settings";
import { getUserById } from "@/lib/store/users";

const yes = (v: boolean) => (v ? "Configured" : "Not set");
const mb = (b: number) => (b >= 1024 ** 3 ? `${(b / 1024 ** 3).toFixed(2)} GB` : `${(b / 1024 ** 2).toFixed(1)} MB`);
const pct = (r: number) => `${(r * 100).toFixed(r < 0.01 ? 2 : 1)}%`;
const LEVEL: Record<UsageLevel, string> = { ok: "Comfortable", watch: "Watch it: above 70% of the free allowance", high: "High: above 90% of the free allowance. Act now." };

export default async function SettingsPage() {
  const { user } = await requirePage();
  const me = await getUserById(user.id);
  const owner = user.role === "owner";

  if (!owner) {
    // Contributors cannot edit their profile or password: the owner manages their account (and can reset the password).
    return (
      <>
        <PageTitle title="Settings" sub="Your account" />
        <Card title="Sign out" className="mb-6 max-w-2xl">
          <p className="mb-4 text-sm text-ink/70">Sign out of this device. Your work stays saved.</p>
          <LogoutButton className="btn btn-secondary btn-sm" />
        </Card>
        <Card title="Your account" className="max-w-2xl">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold">Name</dt>
              <dd>{me?.name ?? user.name}</dd>
            </div>
            <div>
              <dt className="font-semibold">E-mail (your sign-in)</dt>
              <dd>{user.email}</dd>
            </div>
            {me?.specialization && (
              <div>
                <dt className="font-semibold">Specialization</dt>
                <dd>{me.specialization}</dd>
              </div>
            )}
            <div>
              <dt className="font-semibold">Role</dt>
              <dd>Contributor</dd>
            </div>
          </dl>
          <p className="mt-5 border-t border-ink/10 pt-4 text-sm text-ink/70">
            Your profile, password and permissions are managed by the editor. If you forgot your password or need something changed, e-mail{" "}
            <a className="text-brand underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </Card>
        <Card title="Calendar deadlines" className="mt-6 max-w-2xl">
          <CalendarFeedCard />
        </Card>
      </>
    );
  }

  const u = await usage().catch(() => null);
  const minWords = await getMinWords();
  const popup = await getPopupSettings();

  return (
    <>
      <PageTitle title="Settings" />
      <Card title="Sign out" className="mb-6 max-w-2xl">
        <p className="mb-4 text-sm text-ink/70">Sign out of this device. Your work stays saved.</p>
        <LogoutButton className="btn btn-secondary btn-sm" />
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Profile">
          <ProfileForm name={me?.name ?? user.name} bio={me?.bio ?? ""} />
          <p className="mt-4 text-sm text-ink/60">Signed in as {user.email}.</p>
        </Card>
        <Card title="Change password">
          <ChangePasswordForm forced={false} />
        </Card>

        <Card title="Publishing rules" className="xl:col-span-2">
          <MinWordsForm initial={minWords} />
        </Card>

        <Card title="Newsletter popup" className="xl:col-span-2">
          <NewsletterSettingsForm initial={popup} />
        </Card>

        <Card title="Calendar deadlines" className="xl:col-span-2">
          <CalendarFeedCard />
        </Card>

        <Card title="Free-plan usage (estimate)" className="xl:col-span-2">
          {u ? (
            <div className="space-y-4 text-sm">
              <p className="text-ink/70">
                These numbers are estimates computed without scanning the visit log, so this page itself costs almost nothing. The provider dashboards below are the source of truth. Reading the site never stops when you cross a line here, but the free database can be paused by the provider if its monthly allowance is used up.
              </p>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="font-semibold">Database size</dt>
                  <dd>
                    {u.dbBytes == null ? "Not reported by this database plan." : `${mb(u.dbBytes)} of ${mb(FREE_LIMITS.storageBytes)} (${pct(u.storageRatio ?? 0)}). ${LEVEL[levelOf(u.storageRatio ?? 0)]}`}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Rows written this month (estimate)</dt>
                  <dd>
                    {u.writesEstimate.toLocaleString("en-US")} of {FREE_LIMITS.rowsWrittenPerMonth.toLocaleString("en-US")} ({pct(u.writesRatio)}). {LEVEL[levelOf(u.writesRatio)]}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Visit events this month</dt>
                  <dd>
                    {u.eventsThisMonth.toLocaleString("en-US")}
                    {u.oldestEvent && <span className="text-ink/60"> · raw log goes back to {dateTime(u.oldestEvent)}; older raw days are deleted after they are summarised</span>}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Stored records</dt>
                  <dd>{u.tables.map((t) => `${t.name}: ${t.rows.toLocaleString("en-US")}`).join(" · ") || "—"}</dd>
                </div>
              </dl>
              <p className="flex flex-wrap gap-x-5 gap-y-1 border-t border-ink/10 pt-3">
                <a className="text-brand underline underline-offset-4" href="https://turso.tech/app" target="_blank" rel="noopener noreferrer">
                  Turso dashboard (database)
                </a>
                <a className="text-brand underline underline-offset-4" href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
                  Vercel dashboard
                </a>
                <a className="text-brand underline underline-offset-4" href="https://dash.cloudflare.com" target="_blank" rel="noopener noreferrer">
                  Cloudflare dashboard
                </a>
              </p>
            </div>
          ) : (
            <p className="text-sm text-ink/70">Usage could not be read right now (the database may be unreachable).</p>
          )}
        </Card>

        <Card title="Site configuration" className="xl:col-span-2">
          <p className="mb-3 text-sm text-ink/70">Read-only. These come from environment variables and the build, never from this page. Values are not shown, only whether they are set.</p>
          <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold">Public site address</dt>
              <dd>{site.url}</dd>
            </div>
            <div>
              <dt className="font-semibold">Product reviews</dt>
              <dd>On. Managed in Product Manager; only published products are public.</dd>
            </div>
            <div>
              <dt className="font-semibold">Database (Turso)</dt>
              <dd>{yes(dbConfigured())}</dd>
            </div>
            <div>
              <dt className="font-semibold">Session secret (AUTH_SECRET)</dt>
              <dd>{yes(Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32))}</dd>
            </div>
            <div>
              <dt className="font-semibold">E-mail notifications (Resend)</dt>
              <dd>{yes(Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_FROM_EMAIL))}</dd>
            </div>
            <div>
              <dt className="font-semibold">Notification address</dt>
              <dd>{process.env.INQUIRY_TO_EMAIL || site.email}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </>
  );
}

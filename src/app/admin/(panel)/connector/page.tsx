import { ConnectorAdmin } from "@/components/admin/connector/ConnectorAdmin";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { recentEvents } from "@/lib/connector/events";
import { listJobs } from "@/lib/connector/jobs";
import { listConnectorTokens } from "@/lib/connector/tokens";
import { site } from "@/lib/site";

/** Master Admin (owner) only: the connection to the DCE desktop app. Contributors are sent back to the dashboard. */
export default async function ConnectorPage() {
  await requirePage({ action: "connector.manage" });
  const [tokens, events, jobs] = await Promise.all([listConnectorTokens(), recentEvents(40), listJobs(60)]);
  return (
    <>
      <PageTitle title="Website connector" sub="The link between this site and the DCE desktop app: access tokens, what has been sent, and the jobs DCE has done. Visible to the Master Admin only." />
      <ConnectorAdmin
        siteUrl={site.url}
        tokens={tokens.map((t) => ({ ...t }))}
        events={events.map((e) => ({ id: e.id, createdAt: e.createdAt, type: e.type, entityId: e.entityId, payload: e.payload }))}
        jobs={jobs.map((j) => ({ id: j.id, createdAt: j.createdAt, type: j.type, targetTitle: j.targetTitle, status: j.status, result: j.result, error: j.error, finishedAt: j.finishedAt }))}
      />
    </>
  );
}

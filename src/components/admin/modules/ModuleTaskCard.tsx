import Link from "next/link";
import { CONTENT_STATUS_LABEL, PUBLICATION_LABEL } from "@/lib/modules/shared";
import type { PlannerRecord } from "@/lib/planner-shared";
import { Card } from "../ui";

/** The "Module" panel of a module task: what it plans, where it sits in the curriculum, and the way into the module editor. */
export function ModuleTaskCard({ record: r, canOpen }: { record: PlannerRecord; canOpen: boolean }) {
  const m = r.module;
  if (!m) return null;
  const rows: [string, string][] = [
    ["Subject", m.subjectName],
    ["Specialization", m.specializationName],
    ["Academic level", `${m.levelNum}. ${m.levelName}`],
    ["Discipline", m.discipline || "—"],
    ["Module", m.moduleTitle],
    ...(m.chapter ? ([["Chapter", m.chapter]] as [string, string][]) : []),
    ["Content status", CONTENT_STATUS_LABEL[m.contentStatus]],
    ["Publication", PUBLICATION_LABEL[m.publication]],
  ];
  return (
    <Card title={m.kind === "chapter" ? "Chapter" : "Module"}>
      <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="font-semibold">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-ink/70">
        {m.hasBody ? "Some of the text is written." : "Nothing is written yet."} Objectives, prerequisites, the body and the references are edited in the module editor. The owner publishes it from there.
      </p>
      {canOpen ? (
        <p className="mt-4">
          <Link href={`/admin/modules/${m.nodeId}`} className="btn btn-primary btn-sm">
            Open the module editor
          </Link>
        </p>
      ) : (
        <p className="mt-4 text-sm text-ink/70">Only the owner and the person this is assigned to can open the editor.</p>
      )}
    </Card>
  );
}

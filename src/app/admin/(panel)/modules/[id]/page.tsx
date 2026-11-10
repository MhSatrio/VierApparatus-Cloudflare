import { notFound } from "next/navigation";
import { ModuleEditor } from "@/components/admin/modules/ModuleEditor";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { viewerOf } from "@/lib/planner-http";
import { listChapters } from "@/lib/store/module-structure";
import { getModuleEdit, getOutline } from "@/lib/store/modules";

/**
 * Write one learning module or chapter. The owner, or a contributor assigned to it (or to the module above it), may open it;
 * anyone else gets a plain 404, which does not reveal that it exists. Writing needs the "modules.write" permission (the owner always has it).
 */
export default async function ModuleEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await requirePage({ action: "modules.write" });
  const { id } = await params;
  const r = await getModuleEdit(viewerOf(user), id);
  if (!r) notFound();
  const owner = can(user, "planner.manage");
  const m = r.module;
  // placement and chapters belong to the owner; a contributor never needs the curriculum outline
  const [chapters, outline] = owner && m.kind === "module" ? await Promise.all([listChapters(m.id), getOutline()]) : [[], []];
  return (
    <>
      <PageTitle title={m.title} sub={`${m.kind === "chapter" ? "Chapter" : "Module"} · ${m.subjectName} · ${m.specializationName} · ${m.levelName}`} />
      <ModuleEditor
        key={`${m.id}:${m.version}`}
        module={m}
        canWrite={r.canWrite}
        locked={r.locked}
        owner={owner}
        taskHref={m.recordId ? `/admin/${owner ? "planner" : "collab"}/${m.recordId}` : null}
        chapters={chapters}
        outline={outline}
      />
    </>
  );
}

import { CurriculumManager } from "@/components/admin/modules/CurriculumManager";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { getAdminCurriculum } from "@/lib/store/curriculum";

/** Owner only. The subjects, specializations and academic levels the public Module menu is built from. */
export default async function CurriculumPage() {
  await requirePage({ action: "planner.manage" });
  const subjects = await getAdminCurriculum();
  return (
    <>
      <PageTitle title="Curriculum" sub="Subjects, specializations and academic levels of the learning modules. The public Module menu is generated from this page." />
      <CurriculumManager initial={subjects} />
    </>
  );
}

import { ContributorsManager } from "@/components/admin/ContributorsManager";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { listContributors } from "@/lib/store/users";

export default async function ContributorsPage() {
  await requirePage({ action: "users.manage" });
  const rows = await listContributors();
  return (
    <>
      <PageTitle title="Contributors" sub="Create accounts, set or reset passwords, and control what each person can do. Only you can do this." />
      <ContributorsManager
        contributors={rows.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          specialization: c.specialization,
          bio: c.bio,
          disabled: c.disabled,
          permissions: c.permissions,
          assignedCount: c.assignedCount,
          createdAt: c.createdAt,
          lastActiveAt: c.lastActiveAt,
          lastLoginAt: c.lastLoginAt,
        }))}
      />
    </>
  );
}

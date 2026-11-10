import { STATUS_LABEL, type RecordStatus } from "@/lib/planner-shared";

const chip = "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold";
const statusChip: Record<RecordStatus, string> = {
  idea: "bg-ink/10",
  planned: "bg-sky",
  in_progress: "bg-sky",
  in_review: "bg-brand text-white",
  revision: "bg-ink text-white",
  approved: "bg-brand text-white",
  done: "bg-ink/10",
  archived: "bg-ink/10",
};

export function StatusChip({ status }: { status: RecordStatus }) {
  return <span className={`${chip} ${statusChip[status]}`}>{STATUS_LABEL[status]}</span>;
}

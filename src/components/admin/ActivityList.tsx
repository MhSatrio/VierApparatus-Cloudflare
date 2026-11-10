import Link from "next/link";
import { dateTime } from "./ui";
import { ACTION_LABEL, type ActivityItem } from "@/lib/store/activity";

/** Compact, read-only editorial log. `base` is the page a task opens on (owner: planner, contributor: collab). */
export function ActivityList({ items, base, empty = "Nothing has happened yet." }: { items: ActivityItem[]; base?: string; empty?: string }) {
  if (!items.length) return <p className="text-sm text-ink/70">{empty}</p>;
  return (
    <ul className="divide-y divide-ink/10 text-sm">
      {items.map((a) => (
        <li key={a.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2">
          <span>
            <strong>{a.actorName || "Someone"}</strong> {ACTION_LABEL[a.action] ?? a.action}
            {a.detail && !/^[a-z]+_[A-Za-z0-9]+$/.test(a.detail) && <span className="text-ink/70"> · {a.detail}</span>}
            {base && a.recordId && (
              <>
                {" "}
                <Link href={`${base}/${a.recordId}`} className="text-brand underline underline-offset-4">
                  Open
                </Link>
              </>
            )}
          </span>
          <time dateTime={a.ts} className="whitespace-nowrap text-xs text-ink/60">
            {dateTime(a.ts)}
          </time>
        </li>
      ))}
    </ul>
  );
}

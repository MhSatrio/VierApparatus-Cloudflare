import Link from "next/link";
import { nodeHref, CONTENT_STATUS_LABEL, type SubjectTree, type TreeLevel, type TreeNode } from "@/lib/modules/shared";

/**
 * The table of contents of one academic level: its disciplines, and under each the modules and their chapters. A module that is
 * published and written is a link; every other one is listed as "coming soon" with its stage, so the learner sees the whole path.
 */
export function ContentsList({ tree, level }: { tree: SubjectTree; level: TreeLevel }) {
  if (level.nodes.length === 0) {
    return <p className="rounded-xl border border-dashed border-ink/25 p-6 text-ink/70">The modules of this level are in preparation.</p>;
  }
  return (
    <div className="space-y-8">
      {level.nodes.map((n) =>
        n.kind === "discipline" ? (
          <section key={n.id} aria-labelledby={`d-${n.id}`}>
            <h2 id={`d-${n.id}`} className="text-xl sm:text-2xl">
              {n.title}
            </h2>
            <ul className="mt-3 divide-y divide-ink/10 rounded-xl border border-ink/10">
              {n.children.map((m) => (
                <Row key={m.id} node={m} tree={tree} level={level} />
              ))}
            </ul>
          </section>
        ) : (
          <ul key={n.id} className="divide-y divide-ink/10 rounded-xl border border-ink/10">
            <Row node={n} tree={tree} level={level} />
          </ul>
        ),
      )}
    </div>
  );
}

function Row({ node: n, tree, level }: { node: TreeNode; tree: SubjectTree; level: TreeLevel }) {
  return (
    <li className="px-4 py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        {n.readable ? (
          <Link href={nodeHref(tree, level, n)} data-module-id={n.id} prefetch={false} className="mod-link font-semibold text-brand underline underline-offset-4">
            {n.title}
          </Link>
        ) : (
          <span className="font-semibold text-ink/80">{n.title}</span>
        )}
        <span className="text-xs text-ink/60">{n.readable ? (n.readingMinutes ? `${n.readingMinutes} min read` : "Available") : n.contentStatus === "not_started" ? "Coming soon" : `Coming soon · ${CONTENT_STATUS_LABEL[n.contentStatus]}`}</span>
      </div>
      {n.summary && <p className="mt-1 text-sm text-ink/75">{n.summary}</p>}
      {n.children.length > 0 && (
        <ul className="mt-2 space-y-1 border-l border-ink/10 pl-4 text-sm">
          {n.children.map((c) => (
            <li key={c.id}>
              {c.readable ? (
                <Link href={nodeHref(tree, level, c)} data-module-id={c.id} prefetch={false} className="mod-link text-brand underline underline-offset-4">
                  {c.title}
                </Link>
              ) : (
                <span className="text-ink/70">
                  {c.title} <span className="text-xs">(coming soon)</span>
                </span>
              )}
              {c.children.length > 0 && (
                <ul className="ml-4 mt-1 space-y-1">
                  {c.children.map((g) => (
                    <li key={g.id}>
                      {g.readable ? (
                        <Link href={nodeHref(tree, level, g)} data-module-id={g.id} prefetch={false} className="mod-link text-brand underline underline-offset-4">
                          {g.title}
                        </Link>
                      ) : (
                        <span className="text-ink/70">{g.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

import Link from "next/link";
import { countModules, levelLabel, moduleHref, nodeHref, specHref, type SubjectTree, type TreeLevel, type TreeNode } from "@/lib/modules/shared";

/**
 * The left-hand contents of a subject: its academic levels, each opening into its disciplines, modules and chapters.
 * It is plain HTML (details/summary), so levels open and close with no script, and the current level and module are
 * highlighted from the address. A module nobody has published yet is listed, labelled "soon", and is not a link.
 *
 * Only the chapters on the way to the module being read are drawn. Drawing every chapter of a whole specialization on each
 * request cost more CPU than a free Worker allows (error 1102), so the other modules show as links without their chapters.
 */
export function ModuleSidebar({ tree, activeLevel, activeId }: { tree: SubjectTree; activeLevel?: string; activeId?: string }) {
  const specLink = specHref(tree.subject.slug, tree.spec.slug);
  // The ids of the nodes on the path from a level down to the active module (including the module itself).
  const onPath = new Set<string>();
  if (activeId) for (const level of tree.levels) markPath(level.nodes, activeId, onPath);
  return (
    <nav aria-label={`${tree.spec.name} curriculum`} className="text-sm">
      <Link prefetch={false} href={`/module/${tree.subject.slug}`} className="block text-xs font-semibold uppercase tracking-wider text-ink/55 hover:text-brand">
        {tree.subject.name}
      </Link>
      <Link prefetch={false} href={specLink} className="mt-1 block text-base font-semibold hover:text-brand" aria-current={!activeLevel ? "page" : undefined}>
        {tree.spec.name}
      </Link>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink/55">Academic levels</p>
      <ol className="mt-2 space-y-1">
        {tree.levels.map((level) => {
          const { total, readable } = countModules(level.nodes);
          return (
            <li key={level.id}>
              <details className="mod-level group rounded-lg" open={level.slug === activeLevel} data-level={level.id} data-total={readable}>
                <summary className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-2 hover:bg-sky/40">
                  <span className="mod-chevron mt-0.5 inline-block text-ink/50 transition-transform" aria-hidden="true">
                    ›
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-snug">{levelLabel(level)}</span>
                    <span className="block text-xs text-ink/60">
                      {total === 0 ? "In preparation" : `${readable} of ${total} modules available`}
                      <span data-level-read className="ml-1 font-medium text-brand" />
                    </span>
                  </span>
                </summary>
                <div className="ml-4 border-l border-ink/10 pl-3">
                  <Link prefetch={false} href={moduleHref(tree.subject.slug, tree.spec.slug, level.slug)} className="block py-1.5 text-brand underline underline-offset-4" aria-current={level.slug === activeLevel && !activeId ? "page" : undefined}>
                    Level overview and contents
                  </Link>
                  {level.nodes.length > 0 && <ul className="pb-2">{renderNodes(level.nodes, tree, level, activeId, onPath)}</ul>}
                </div>
              </details>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Adds the id of every node on the path to the target to `out`. Returns true when the target is inside these nodes. */
function markPath(nodes: TreeNode[], target: string, out: Set<string>): boolean {
  let found = false;
  for (const n of nodes) {
    if (n.id === target || markPath(n.children, target, out)) {
      out.add(n.id);
      found = true;
    }
  }
  return found;
}

function renderNodes(nodes: TreeNode[], tree: SubjectTree, level: TreeLevel, activeId: string | undefined, onPath: Set<string>) {
  return nodes.map((n) => {
    if (n.kind === "discipline") {
      return (
        <li key={n.id}>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink/55">{n.title}</p>
          <ul>{renderNodes(n.children, tree, level, activeId, onPath)}</ul>
        </li>
      );
    }
    const active = n.id === activeId;
    const open = onPath.has(n.id);
    return (
      <li key={n.id}>
        {n.readable ? (
          <Link prefetch={false} href={nodeHref(tree, level, n)} data-module-id={n.id} aria-current={active ? "page" : undefined} className={`mod-link block rounded-md px-2 py-1 leading-snug hover:bg-sky/40 ${active ? "bg-sky font-semibold text-ink" : "text-ink/90"}`}>
            {n.title}
          </Link>
        ) : (
          <span className="block px-2 py-1 leading-snug text-ink/50">
            {n.title} <span className="ml-1 rounded-full bg-ink/10 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide">Soon</span>
          </span>
        )}
        {open && n.children.length > 0 && <ul className="ml-3 border-l border-ink/10 pl-2">{renderNodes(n.children, tree, level, activeId, onPath)}</ul>}
      </li>
    );
  });
}

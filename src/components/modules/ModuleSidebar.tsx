import Link from "next/link";
import { countModules, levelLabel, moduleHref, nodeHref, specHref, type SubjectTree, type TreeLevel, type TreeNode } from "@/lib/modules/shared";

/**
 * The left-hand contents of a subject: its academic levels, each opening into its disciplines, modules and chapters.
 * It is plain HTML (details/summary), so levels open and close with no script, and the current level and module are
 * highlighted from the address. A module nobody has published yet is listed, labelled "soon", and is not a link.
 */
export function ModuleSidebar({ tree, activeLevel, activeId }: { tree: SubjectTree; activeLevel?: string; activeId?: string }) {
  const specLink = specHref(tree.subject.slug, tree.spec.slug);
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
                  {level.nodes.length > 0 && <ul className="pb-2">{renderNodes(level.nodes, tree, level, activeId)}</ul>}
                </div>
              </details>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function renderNodes(nodes: TreeNode[], tree: SubjectTree, level: TreeLevel, activeId?: string) {
  return nodes.map((n) => {
    if (n.kind === "discipline") {
      return (
        <li key={n.id}>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink/55">{n.title}</p>
          <ul>{renderNodes(n.children, tree, level, activeId)}</ul>
        </li>
      );
    }
    const active = n.id === activeId;
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
        {n.children.length > 0 && <ul className="ml-3 border-l border-ink/10 pl-2">{renderNodes(n.children, tree, level, activeId)}</ul>}
      </li>
    );
  });
}

import type { ReactNode } from "react";
import type { SubjectTree } from "@/lib/modules/shared";
import { ModuleSidebar } from "./ModuleSidebar";
import { ReadingTracker } from "./ReadingTracker";
import { SidebarToggle } from "./SidebarToggle";

/**
 * The frame of every subject page: the curriculum on the left, the page itself on the right. Wider than the rest of the site,
 * because a lesson with contents on both sides needs the room. `moduleId` is given on a lesson page only, which switches on
 * the reading-progress bar.
 */
export function ModuleShell({ tree, activeLevel, activeId, moduleId, children }: { tree: SubjectTree; activeLevel?: string; activeId?: string; moduleId?: string; children: ReactNode }) {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-8 sm:px-8 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10 lg:py-10 xl:grid-cols-[17rem_minmax(0,1fr)] xl:gap-12">
        <aside aria-label="Curriculum" className="lg:sticky lg:top-24 lg:self-start">
          <SidebarToggle label="levels and contents">
            <ModuleSidebar tree={tree} activeLevel={activeLevel} activeId={activeId} />
          </SidebarToggle>
        </aside>
        <div className="mt-8 min-w-0 lg:mt-0">{children}</div>
      </div>
      <ReadingTracker moduleId={moduleId} />
    </div>
  );
}

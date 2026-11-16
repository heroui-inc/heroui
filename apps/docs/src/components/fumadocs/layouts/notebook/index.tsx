import type * as PageTree from "fumadocs-core/page-tree";
import type {HTMLAttributes, ReactNode} from "react";

import {Bars, Xmark} from "@gravity-ui/icons";
import {TreeContextProvider} from "fumadocs-ui/contexts/tree";

import {LayoutBody, LayoutContextProvider} from "./client";
import {Sidebar, SidebarContent, SidebarDrawer, SidebarTrigger, SidebarViewport} from "./sidebar";
import {SidebarNav} from "./sidebar-nav";

export interface DocsLayoutProps {
  tree: PageTree.Root;
  children?: ReactNode;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  /** Product switcher and framework tabs, above the nav. */
  sidebarHeader?: ReactNode;
  /** Page actions pinned to the top-right corner (md and up). */
  actions?: ReactNode;
  /** Logo for the mobile bar and drawer. Links to heroui.com, so keep it a plain `<a>`. */
  mobileTitle?: ReactNode;
  /** Mobile bar actions, before the menu button. */
  mobileActions?: ReactNode;
  /** Controls at the bottom of the mobile drawer. */
  drawerFooter?: ReactNode;
  sidebar?: {defaultOpenLevel?: number; prefetch?: boolean};
}

const ICON_BUTTON =
  "docs-pill docs-pill-segment inline-flex size-8 items-center justify-center [&_svg]:size-4";

export function DocsLayout({
  actions,
  children,
  containerProps,
  drawerFooter,
  mobileActions,
  mobileTitle,
  sidebar = {},
  sidebarHeader,
  tree,
}: DocsLayoutProps) {
  return (
    <TreeContextProvider tree={tree}>
      <LayoutContextProvider navMode="auto" navTransparentMode="none" tabMode="sidebar">
        <Sidebar defaultOpenLevel={sidebar.defaultOpenLevel} prefetch={sidebar.prefetch}>
          <LayoutBody {...containerProps}>
            <SidebarContent>
              {sidebarHeader ? (
                <div className="flex flex-col gap-4 px-1" data-sidebar-header="">
                  {sidebarHeader}
                </div>
              ) : null}
              <SidebarViewport>
                <SidebarNav />
              </SidebarViewport>
            </SidebarContent>

            <SidebarDrawer>
              <div className="flex flex-col gap-4 px-1 pt-1.5" data-sidebar-header="">
                {sidebarHeader ?? mobileTitle}
              </div>
              <SidebarTrigger className={`${ICON_BUTTON} absolute end-3 top-3`}>
                <Xmark />
              </SidebarTrigger>
              <SidebarViewport>
                <SidebarNav />
              </SidebarViewport>
              {drawerFooter ? <div className="px-1 pb-4">{drawerFooter}</div> : null}
            </SidebarDrawer>

            <header
              className="max-md:layout:[--fd-header-height:--spacing(14)] sticky top-(--fd-docs-row-1) z-30 flex h-14 items-center gap-2 bg-background px-4 [grid-area:header] md:hidden"
              id="nd-subnav"
            >
              <div className="flex min-w-0 flex-1 items-center">{mobileTitle}</div>
              {mobileActions}
              <SidebarTrigger className={ICON_BUTTON}>
                <Bars />
              </SidebarTrigger>
            </header>

            {actions ? (
              // Sticky bar over the content columns (not the sidebar). It shares the
              // main row so it sticks for the whole page; below xl it sits under the
              // TOC popover bar. Content fades out under its bottom edge.
              <div
                className="sticky top-(--fd-docs-row-3) z-30 col-[2/-1] row-[3] flex h-[72px] items-center justify-end self-start bg-background pe-10 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-4 after:bg-linear-to-b after:from-background after:to-transparent max-md:hidden"
                id="nd-nav-actions"
              >
                {actions}
              </div>
            ) : null}

            {children}
          </LayoutBody>
        </Sidebar>
      </LayoutContextProvider>
    </TreeContextProvider>
  );
}

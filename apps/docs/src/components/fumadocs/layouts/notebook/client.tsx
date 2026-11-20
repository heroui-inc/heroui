"use client";

import type {ComponentProps, ReactNode} from "react";

import {useSidebar} from "fumadocs-ui/components/sidebar/base";
import {useIsScrollTop} from "fumadocs-ui/utils/use-is-scroll-top";
import {createContext, useMemo} from "react";

import {cn} from "@/utils/cn";

export const LayoutContext = createContext<
  | (LayoutInfo & {
      isNavTransparent: boolean;
    })
  | null
>(null);

export interface LayoutInfo {
  tabMode: "sidebar" | "navbar";
  navMode: "top" | "auto";
}

export function LayoutContextProvider({
  children,
  navMode,
  navTransparentMode = "none",
  tabMode,
}: LayoutInfo & {
  navTransparentMode?: "always" | "top" | "none";
  children: ReactNode;
}) {
  const isTop = useIsScrollTop({enabled: navTransparentMode === "top"}) ?? true;
  const isNavTransparent = navTransparentMode === "top" ? isTop : navTransparentMode === "always";

  return (
    <LayoutContext
      value={useMemo(
        () => ({
          isNavTransparent,
          navMode,
          tabMode,
        }),
        [isNavTransparent, navMode, tabMode],
      )}
    >
      {children}
    </LayoutContext>
  );
}

export function LayoutBody({children, className, style, ...props}: ComponentProps<"div">) {
  const {collapsed} = useSidebar();

  // Rows: mobile bar, TOC popover (below xl), page. Columns: sidebar, gutter, page,
  // gutter, TOC, gutter. Free space splits 2:1:1, so the TOC sits midway between
  // the page and the right edge instead of hugging either.
  return (
    <div
      id="nd-notebook-layout"
      className={cn(
        "relative grid min-h-(--fd-docs-height) overflow-x-clip [--fd-docs-height:100dvh] [--fd-header-height:0px] [--fd-sidebar-width:0px] [--fd-toc-popover-height:0px] [--fd-toc-width:0px]",
        className,
      )}
      style={
        {
          "--fd-docs-row-1": "var(--fd-banner-height, 0px)",
          "--fd-docs-row-2": "calc(var(--fd-docs-row-1) + var(--fd-header-height))",
          "--fd-docs-row-3": "calc(var(--fd-docs-row-2) + var(--fd-toc-popover-height))",
          "--fd-sidebar-col": collapsed ? "0px" : "var(--fd-sidebar-width)",
          gridTemplate: `"header header header header header header"
        "sidebar toc-popover toc-popover toc-popover toc-popover toc-popover"
        "sidebar . main . toc ." 1fr / var(--fd-sidebar-col) minmax(0, 2fr) minmax(0, var(--docs-main-width)) minmax(0, 1fr) var(--fd-toc-width) minmax(0, 1fr)`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}

"use client";

import type {ComponentProps} from "react";

import * as Base from "fumadocs-ui/components/sidebar/base";
import {createLinkItemRenderer} from "fumadocs-ui/components/sidebar/link-item";
import {useRef} from "react";
import {tv} from "tailwind-variants";

import {mergeRefs} from "@/components/fumadocs/utils/merge-refs";
import {cn} from "@/utils/cn";

const itemVariants = tv({
  base: "relative flex min-h-7 w-full flex-row items-center gap-2 rounded-lg px-2 py-[5px] text-start text-[13px] leading-[18px] font-medium text-(--docs-fg) [&_svg]:size-3.5 [&_svg]:shrink-0",
  variants: {
    variant: {
      button: "cursor-(--cursor-interactive) hover:bg-(--docs-item-hover)",
      link: "hover:bg-(--docs-item-hover) data-[active=true]:bg-(--docs-item-active) data-[active=true]:text-foreground",
    },
  },
});

/** A group's direct children line up with its label; deeper levels indent. */
function getItemOffset(depth: number) {
  return `calc(${2 + 3 * Math.max(0, depth - 1)} * var(--spacing))`;
}

export const {
  SidebarCollapseTrigger,
  SidebarFolder,
  SidebarProvider: Sidebar,
  SidebarTrigger,
} = Base;

/**
 * Native overflow: Radix ScrollArea's overlay thumb lags behind the scroll offset.
 * The mask fades items in under the header and out at the bottom edge.
 */
export function SidebarViewport({children, className, ...props}: ComponentProps<"div">) {
  return (
    <div
      data-docs-sidebar-viewport=""
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain",
        "mask-[linear-gradient(to_bottom,transparent,white_8px,white_calc(100%-56px),transparent)]",
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-col gap-0.5 pt-1 pb-14">{children}</div>
    </div>
  );
}

export function SidebarContent({
  children,
  className,
  ref: refProp,
  ...props
}: ComponentProps<"aside">) {
  const ref = useRef<HTMLElement>(null);

  return (
    <Base.SidebarContent>
      {({collapsed: _collapsed, hovered: _hovered, ref: asideRef, ...rest}) => (
        <div
          data-sidebar-placeholder=""
          className={cn(
            "md:layout:[--fd-sidebar-width:var(--docs-sidebar-width)]",
            "sticky top-(--fd-docs-row-1) z-20 h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))] [grid-area:sidebar] max-md:hidden",
          )}
        >
          <aside
            ref={mergeRefs(ref, refProp, asideRef)}
            id="nd-sidebar"
            className={cn(
              "absolute inset-0 flex w-(--fd-sidebar-width) flex-col gap-4 px-3 pt-5 text-sm",
              className,
            )}
            {...props}
            {...rest}
          >
            {children}
          </aside>
        </div>
      )}
    </Base.SidebarContent>
  );
}

export function SidebarDrawer({
  children,
  className,
  ...props
}: ComponentProps<typeof Base.SidebarDrawerContent>) {
  return (
    <>
      <Base.SidebarDrawerOverlay className="data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out fixed inset-0 z-40 bg-(--color-backdrop) backdrop-blur-xs" />
      <Base.SidebarDrawerContent
        className={cn(
          "data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out fixed inset-y-0 end-0 z-40 flex w-[85%] max-w-[320px] flex-col gap-4 bg-background px-3 pt-4 shadow-overlay",
          className,
        )}
        {...props}
      >
        {children}
      </Base.SidebarDrawerContent>
    </>
  );
}

/** Section heading inside the active root (from `---Title---` meta.json separators). */
export function SidebarSeparator({children, className, style, ...props}: ComponentProps<"p">) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarSeparator
      data-sidebar-section=""
      style={{paddingInlineStart: getItemOffset(depth), ...style}}
      className={cn(
        "flex h-7 items-center gap-2 px-2 text-[13px] leading-[18px] font-medium text-(--docs-fg-subtle) [&_svg]:size-3.5 [&_svg]:shrink-0",
        "[&:not(:first-child)]:mt-2",
        className,
      )}
      {...props}
    >
      {children}
    </Base.SidebarSeparator>
  );
}

export function SidebarItem({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarItem>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarItem
      className={cn(itemVariants({variant: "link"}), className)}
      style={{paddingInlineStart: getItemOffset(depth), ...style}}
      {...props}
    >
      {children}
    </Base.SidebarItem>
  );
}

export function SidebarFolderTrigger({
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarFolderTrigger>) {
  const {collapsible, depth} = Base.useFolder()!;

  return (
    <Base.SidebarFolderTrigger
      style={{paddingInlineStart: getItemOffset(depth - 1), ...style}}
      className={cn(
        itemVariants({variant: collapsible ? "button" : undefined}),
        "[&>svg[data-icon]]:size-3 [&>svg[data-icon]]:text-(--docs-fg-faint)",
        className,
      )}
      {...props}
    >
      {props.children}
    </Base.SidebarFolderTrigger>
  );
}

export function SidebarFolderLink({
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarFolderLink>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarFolderLink
      style={{paddingInlineStart: getItemOffset(depth - 1), ...style}}
      className={cn(
        itemVariants({variant: "link"}),
        "[&>svg[data-icon]]:size-3 [&>svg[data-icon]]:text-(--docs-fg-faint)",
        className,
      )}
      {...props}
    >
      {props.children}
    </Base.SidebarFolderLink>
  );
}

export function SidebarFolderContent({
  children,
  className,
  ...props
}: ComponentProps<typeof Base.SidebarFolderContent>) {
  return (
    <Base.SidebarFolderContent
      className={cn(
        "data-[state=closed]:animate-fd-collapsible-up data-[state=open]:animate-fd-collapsible-down overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-0.5 pt-0.5">{children}</div>
    </Base.SidebarFolderContent>
  );
}

export const SidebarLinkItem = createLinkItemRenderer({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
});

"use client";

import type {BreadcrumbOptions} from "fumadocs-core/breadcrumb";
import type * as PageTree from "fumadocs-core/page-tree";
import type {ComponentProps, ReactNode} from "react";

import {useTranslations} from "@fuma-translate/react";
import {ArrowLeft, ArrowRight, ChevronDown, ChevronRight} from "@gravity-ui/icons";
import {Tooltip} from "@heroui/react";
import {getBreadcrumbItemsFromPath} from "fumadocs-core/breadcrumb";
import {usePathname} from "fumadocs-core/framework";
import Link from "fumadocs-core/link";
import {useTOCItems} from "fumadocs-ui/components/toc";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "fumadocs-ui/components/ui/collapsible";
import {useTreeContext, useTreePath} from "fumadocs-ui/contexts/tree";
import {
  Fragment,
  createContext,
  use,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {isActive} from "@/components/fumadocs/utils/urls";
import {cn} from "@/utils/cn";

import {LayoutContext} from "../client";
import {useSidebarNodes} from "../sidebar-nav";

import {useActiveHeading} from "./active-heading";

const TocPopoverContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export function PageTOCPopover({children, className, ...rest}: ComponentProps<"div">) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const {isNavTransparent} = use(LayoutContext)!;

  const onClick = useEffectEvent((e: Event) => {
    if (!open) return;

    if (ref.current && !ref.current.contains(e.target as HTMLElement)) setOpen(false);
  });

  useEffect(() => {
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <TocPopoverContext
      value={useMemo(
        () => ({
          open,
          setOpen,
        }),
        [setOpen, open],
      )}
    >
      <Collapsible
        data-toc-popover=""
        open={open}
        className={cn(
          "max-xl:layout:[--fd-toc-popover-height:--spacing(10)] sticky top-(--fd-docs-row-2) z-10 h-(--fd-toc-popover-height) [grid-area:toc-popover] xl:hidden",
          // From md, the 72px `#nd-nav-actions` bar shares this row above the TOC bar.
          "md:top-[calc(var(--fd-docs-row-2)+72px)] md:mt-[72px]",
          className,
        )}
        onOpenChange={setOpen}
        {...rest}
      >
        <header
          ref={ref}
          className={cn(
            "relative backdrop-blur-sm transition-colors",
            // Content fades out under the bar, like the desktop actions bar but softer.
            "after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-4 after:bg-linear-to-b after:from-background/80 after:to-transparent",
            (!isNavTransparent || open) && "bg-fd-background/80",
            open && "shadow-lg after:hidden",
          )}
        >
          {children}
        </header>
      </Collapsible>
    </TocPopoverContext>
  );
}

export function PageTOCPopoverTrigger({className, ...props}: ComponentProps<"button">) {
  const t = useTranslations({note: "table of contents"});
  const {open} = use(TocPopoverContext)!;
  const items = useTOCItems();
  const active = useActiveHeading();
  const selected = useMemo(
    () => items.findIndex((item) => active === item.url.slice(1)),
    [items, active],
  );
  const path = useTreePath().at(-1);
  const showItem = selected !== -1 && !open;

  return (
    <CollapsibleTrigger
      data-toc-popover-trigger=""
      className={cn(
        "text-fd-muted-foreground flex h-10 w-full items-center gap-2.5 px-4 py-2.5 text-start text-sm focus-visible:outline-none md:px-6 [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      <ProgressCircle
        className={cn("shrink-0", open && "text-fd-primary")}
        max={1}
        value={(selected + 1) / Math.max(1, items.length)}
      />
      <span className="grid flex-1 *:col-start-1 *:row-start-1 *:my-auto">
        <span
          className={cn(
            "truncate transition-all",
            open && "text-fd-foreground",
            showItem && "pointer-events-none -translate-y-full opacity-0",
          )}
        >
          {path?.name ?? t("On this page")}
        </span>
        <span
          className={cn(
            "truncate transition-all",
            !showItem && "pointer-events-none translate-y-full opacity-0",
          )}
        >
          {items[selected]?.title}
        </span>
      </span>
      <ChevronDown className={cn("mx-0.5 shrink-0 transition-transform", open && "rotate-180")} />
    </CollapsibleTrigger>
  );
}

interface ProgressCircleProps extends Omit<React.ComponentProps<"svg">, "strokeWidth"> {
  value: number;
  strokeWidth?: number;
  size?: number;
  min?: number;
  max?: number;
}

function clamp(input: number, min: number, max: number): number {
  if (input < min) return min;
  if (input > max) return max;

  return input;
}

function ProgressCircle({
  max = 100,
  min = 0,
  size = 24,
  strokeWidth = 2,
  value,
  ...restSvgProps
}: ProgressCircleProps) {
  const normalizedValue = clamp(value, min, max);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (normalizedValue / max) * circumference;
  const circleProps = {
    cx: size / 2,
    cy: size / 2,
    fill: "none",
    r: radius,
    strokeWidth,
  };

  return (
    <svg
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={normalizedValue}
      role="progressbar"
      viewBox={`0 0 ${size} ${size}`}
      {...restSvgProps}
    >
      <circle {...circleProps} className="stroke-current/25" />
      <circle
        {...circleProps}
        className="transition-all"
        stroke="currentColor"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export function PageTOCPopoverContent(props: ComponentProps<"div">) {
  return (
    <CollapsibleContent
      data-toc-popover-content=""
      {...props}
      className={cn("flex max-h-[50vh] flex-col px-4 md:px-6", props.className)}
    >
      {props.children}
    </CollapsibleContent>
  );
}

const subscribeToClientDate = () => () => {};

export function PageLastUpdate({
  date: value,
  ...props
}: Omit<ComponentProps<"p">, "children"> & {date: Date}) {
  const t = useTranslations({note: "page footer"});
  // to the timezone of client
  const date = useSyncExternalStore(
    subscribeToClientDate,
    () => value.toLocaleDateString(),
    () => "",
  );

  return (
    <p {...props} className={cn("text-fd-muted-foreground text-sm", props.className)}>
      {t("Last updated on")} {date}
    </p>
  );
}

type Item = Pick<PageTree.Item, "name" | "description" | "url">;
/** A previous / next page, with its sidebar section when the link leaves the current one. */
type NeighbourItem = Item & {section?: ReactNode};
export interface FooterProps extends ComponentProps<"div"> {
  /**
   * Items including information for the next and previous page
   */
  items?: {
    previous?: NeighbourItem;
    next?: NeighbourItem;
  };
}

interface SectionedPage extends Item {
  /** Separator, tab or folder name the page sits under in the sidebar. */
  section?: ReactNode;
  /** Tells apart sections that share a name, e.g. a "Components" separator and the Components tab. */
  sectionId: number;
}

const EXTERNAL_URL = /^[a-z][a-z\d+.-]*:/i;

/** Flattens tree nodes into their pages in reading order, each tagged with its section. */
function toSectionedPages(nodes: PageTree.Node[], rootSection?: ReactNode): SectionedPage[] {
  const list: SectionedPage[] = [];
  const seen = new Set<string>();
  let lastId = 0;

  const add = (page: PageTree.Item, section: ReactNode, sectionId: number) => {
    // Off-site links such as Roadmap and Figma stay in the sidebar only.
    if (page.external || EXTERNAL_URL.test(page.url) || seen.has(page.url)) return;

    seen.add(page.url);
    list.push({
      description: page.description,
      name: page.name,
      section,
      sectionId,
      url: page.url,
    });
  };

  const walk = (children: PageTree.Node[], section: ReactNode, sectionId: number) => {
    let current = section;
    let currentId = sectionId;

    for (const node of children) {
      if (node.type === "separator") {
        // A bare `---` is only a divider, so the pages below stay in the same section.
        if (node.name) {
          current = node.name;
          currentId = ++lastId;
        }
      } else if (node.type === "page") {
        add(node, current, currentId);
      } else {
        const folderId = ++lastId;

        if (node.index) add(node.index, node.name, folderId);
        walk(node.children, node.name, folderId);
      }
    }
  };

  walk(nodes, rootSection, lastId);

  return list;
}

/**
 * Pages in the order the sidebar lists them, so previous / next cross its sections and tabs:
 * the last Getting Started page leads to the first component. Release entries are not in the
 * sidebar (its Releases link stands for all of them), so they step through their own tab.
 */
function useSectionedPages(): SectionedPage[] {
  const sidebarNodes = useSidebarNodes();
  const {root} = useTreeContext();
  const pathname = usePathname();

  return useMemo(() => {
    const pages = toSectionedPages(sidebarNodes);

    return pages.some((page) => isActive(page.url, pathname, false))
      ? pages
      : toSectionedPages(root.children, root.name);
  }, [pathname, root, sidebarNodes]);
}

/** Previous and next pages of the current page in sidebar order, across tabs. */
function usePageNeighbours(items?: FooterProps["items"]): {
  previous?: NeighbourItem;
  next?: NeighbourItem;
} {
  const pages = useSectionedPages();
  const pathname = usePathname();

  return useMemo(() => {
    if (items) return items;

    const idx = pages.findIndex((item) => isActive(item.url, pathname, false));

    if (idx === -1) return {};

    const current = pages[idx];
    const isSameSection = (page: SectionedPage) =>
      page.sectionId === current?.sectionId ||
      (typeof page.section === "string" && page.section === current?.section);
    const toNeighbour = (page?: SectionedPage): NeighbourItem | undefined =>
      page && {
        description: page.description,
        name: page.name,
        section: isSameSection(page) ? undefined : page.section,
        url: page.url,
      };

    return {
      next: toNeighbour(pages[idx + 1]),
      previous: toNeighbour(pages[idx - 1]),
    };
  }, [items, pages, pathname]);
}

/** Accessible name for a neighbour link: "Next Page: Buttons: Button". */
function neighbourLabel(label: string, item: NeighbourItem): string {
  if (typeof item.name !== "string") return label;

  return typeof item.section === "string"
    ? `${label}: ${item.section}: ${item.name}`
    : `${label}: ${item.name}`;
}

/**
 * Page name, led by its muted section name when the link leaves the current section. The
 * section gives way first, so a long label ends up as "UI for Ag… Theming".
 */
function NeighbourName({item}: {item: NeighbourItem}) {
  return (
    <span className="flex min-w-0 gap-1">
      {item.section ? (
        <span className="min-w-0 shrink-[10000] truncate text-(--docs-fg-muted)">
          {item.section}:
        </span>
      ) : null}
      <span className="min-w-0 truncate">{item.name}</span>
    </span>
  );
}

const NAV_BUTTON =
  "docs-pill docs-pill-segment inline-flex size-8 items-center justify-center [&_svg]:size-3.5 rtl:[&_svg]:rotate-180";

/** Round previous / next page buttons for the page header. */
export function PageNavButtons({className, ...props}: ComponentProps<"div">) {
  const t = useTranslations({note: "pagination"});
  const {next, previous} = usePageNeighbours();

  if (!previous && !next) return null;

  const links = [
    {Icon: ArrowLeft, item: previous, label: t("Previous Page")},
    {Icon: ArrowRight, item: next, label: t("Next Page")},
  ];

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {links.map(({Icon, item, label}) =>
        item ? (
          <Tooltip key={label} delay={300}>
            <Tooltip.Trigger role="presentation" tabIndex={-1}>
              <Link
                aria-label={neighbourLabel(label, item)}
                className={NAV_BUTTON}
                data-strong=""
                href={item.url}
              >
                <Icon />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content placement="bottom">
              <NeighbourName item={item} />
            </Tooltip.Content>
          </Tooltip>
        ) : (
          <span
            key={label}
            aria-hidden
            className={cn(NAV_BUTTON, "pointer-events-none opacity-40")}
          >
            <Icon />
          </span>
        ),
      )}
    </div>
  );
}

export function PageFooter({items, ...props}: FooterProps) {
  const {next, previous} = usePageNeighbours(items);

  return (
    <div
      {...props}
      className={cn("my-10 flex items-center justify-between gap-4", props.className)}
    >
      {previous ? <FooterItem index={0} item={previous} /> : null}
      {next ? <FooterItem index={1} item={next} /> : null}
    </div>
  );
}

/** Pill link to the previous / next page: arrow, then the section when it changes and the page name. */
function FooterItem({index, item}: {item: NeighbourItem; index: 0 | 1}) {
  const t = useTranslations({note: "pagination"});
  const isNext = index === 1;
  const Icon = isNext ? ArrowRight : ArrowLeft;
  const label = isNext ? t("Next Page") : t("Previous Page");

  return (
    <Link
      aria-label={neighbourLabel(label, item)}
      data-strong=""
      href={item.url}
      className={cn(
        // Capped so two long labels share the row: the text ends in "…" instead.
        "docs-pill docs-pill-segment inline-flex h-9 max-w-[min(50%_-_0.5rem,18rem)] min-w-0 items-center gap-2 text-sm font-medium",
        isNext ? "ms-auto flex-row-reverse ps-4 pe-3" : "ps-3 pe-4",
      )}
    >
      <Icon className="size-3.5 shrink-0 rtl:rotate-180" />
      <NeighbourName item={item} />
    </Link>
  );
}

export type BreadcrumbProps = BreadcrumbOptions & ComponentProps<"div">;

export function PageBreadcrumb({
  includePage,
  includeRoot,
  includeSeparator,
  ...props
}: BreadcrumbProps) {
  const path = useTreePath();
  const {root} = useTreeContext();
  const items = useMemo(() => {
    return getBreadcrumbItemsFromPath(root, path, {
      includePage,
      includeRoot,
      includeSeparator,
    });
  }, [includePage, includeRoot, includeSeparator, path, root]);

  if (items.length === 0) return null;

  return (
    <div
      {...props}
      className={cn("text-fd-muted-foreground flex items-center gap-1.5 text-sm", props.className)}
    >
      {items.map((item, i) => {
        const className = cn("truncate", i === items.length - 1 && "text-fd-primary font-medium");

        return (
          <Fragment key={i}>
            {i !== 0 && <ChevronRight className="size-3.5 shrink-0" />}
            {item.url ? (
              <Link
                className={cn(className, "transition-opacity hover:opacity-80")}
                href={item.url}
              >
                {item.name}
              </Link>
            ) : (
              <span className={className}>{item.name}</span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

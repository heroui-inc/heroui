"use client";

import type {ProSearchItem} from "@/lib/pro-components";
import type {Item, Node} from "fumadocs-core/page-tree";
import type {SearchItemType, SharedProps} from "fumadocs-ui/components/dialog/search";
import type {ComponentProps, ReactNode} from "react";

import {useTranslations} from "@fuma-translate/react";
import {Cube, FileText, Hashtag, Magnifier, Sparkles} from "@gravity-ui/icons";
import {useAgent} from "@heroui/agent/next";
import {Kbd, Tabs} from "@heroui/react";
import {useDocsSearch} from "fumadocs-core/search/client";
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
  useSearch,
} from "fumadocs-ui/components/dialog/search";
import {useI18n} from "fumadocs-ui/contexts/i18n";
import {useTreeContext} from "fumadocs-ui/contexts/tree";
import {usePathname, useRouter} from "next/navigation";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

import {useProComponents} from "@/components/pro-components-provider";
import {useDictionary} from "@/hooks/use-dictionary";
import {HEROUI_DOCS_AGENT_ID} from "@/lib/heroui-agent";
import {readsAsQuestion} from "@/lib/search-question";
import {cn} from "@/utils/cn";
import {currentVersion} from "@/utils/version";

type Framework = "web" | "native";
type Filter = "all" | "components" | "guides" | "pro";
type GroupKey = "components" | "guides" | "pro" | "sections" | "suggested";
type RowKind = "ai" | "page" | "section";

interface Row {
  group?: GroupKey;
  id: string;
  kind: RowKind;
  node: ReactNode;
  onSelect: () => void;
}

interface RowMeta {
  divider: boolean;
  heading?: GroupKey;
  kind: RowKind;
}

// Default suggested pages for each framework
const DEFAULT_SUGGESTIONS: Record<Framework, string[]> = {
  native: [
    "/docs/native/getting-started",
    "/docs/native/getting-started/quick-start",
    "/docs/native/getting-started/design-principles",
    "/docs/native/getting-started/provider",
    "/docs/native/getting-started/colors",
    "/docs/native/getting-started/theming",
  ],
  web: [
    "/docs/react/getting-started",
    "/docs/react/getting-started/quick-start",
    "/docs/react/getting-started/design-principles",
    "/docs/react/getting-started/colors",
    "/docs/react/getting-started/theming",
  ],
};

const FILTERS: Filter[] = ["all", "components", "guides", "pro"];

/** Rows per group: a short mix under "All", a longer list once a filter narrows it. */
const ALL_LIMITS = {components: 5, guides: 4, pro: 3, sections: 5};
const FOCUSED_LIMIT = 20;

/** Pro components whose name, slug or description contain every word of the query; names first. */
function useProSearch(query: string, framework: Framework): ProSearchItem[] {
  const items = useProComponents();

  return useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    if (words.length === 0) return [];

    const platform = framework === "native" ? "native" : "react";
    const normalized = words.join(" ");
    const titleRank = (item: ProSearchItem) => {
      const title = item.title.toLowerCase();

      return title.startsWith(normalized) ? 0 : title.includes(normalized) ? 1 : 2;
    };

    return items
      .filter((item) => {
        if (item.platform !== platform) return false;

        const searchable =
          `${item.title} ${item.name.replaceAll("-", " ")} ${item.description}`.toLowerCase();

        return words.every((word) => searchable.includes(word));
      })
      .sort((a, b) => titleRank(a) - titleRank(b));
  }, [framework, items, query]);
}

interface SectionHit {
  isHeading: boolean;
  page: ReactNode;
  path: string;
  text: string;
  url: string;
}

/** Search hits are raw markdown; drop the inline markers so rows read as plain text. */
function toPlainText(content: string) {
  return content
    .replace(/`|\*\*|^>\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getFrameworkFromPath(path: string): Framework {
  return path.includes("/docs/native") ? "native" : "web";
}

/** Small key cap, as in the Paper design (`esc`, `↵`, `⌘`). */
function Key({children, className}: {children: ReactNode; className?: string}) {
  return (
    <Kbd
      className={cn(
        "h-5 min-w-5 justify-center rounded-md bg-(--docs-control) px-1.5 text-[11px] leading-none font-normal text-(--docs-fg-muted) shadow-none",
        className,
      )}
    >
      <Kbd.Content>{children}</Kbd.Content>
    </Kbd>
  );
}

function PageRow({
  description,
  icon,
  isPro,
  title,
}: {
  description?: ReactNode;
  icon: ReactNode;
  isPro?: boolean;
  title: ReactNode;
}) {
  return (
    <>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-(--search-fill) text-(--docs-fg-muted) group-aria-selected:bg-(--search-fill-strong) group-aria-selected:text-foreground [&_svg]:size-4">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm leading-[18px] font-medium text-(--docs-fg) group-aria-selected:text-foreground">
          {title}
        </span>
        {description ? (
          <span className="truncate text-xs leading-4 text-(--docs-fg-muted)">{description}</span>
        ) : null}
      </span>
      {isPro ? (
        <span className="inline-flex h-4.5 shrink-0 items-center rounded-full bg-accent-soft px-1.5 text-[10px] leading-none font-semibold tracking-[0.07em] text-accent-soft-foreground">
          PRO
        </span>
      ) : null}
      <Key className="hidden group-aria-selected:inline-flex">↵</Key>
    </>
  );
}

function SectionRow({icon, page, section}: {icon: ReactNode; page: ReactNode; section: ReactNode}) {
  return (
    <>
      <span className="flex h-6 w-8 shrink-0 items-center justify-center text-(--docs-fg-muted) [&_svg]:size-3.5">
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-[13px] leading-[18px] text-(--docs-fg-muted)">
        {page}
        <span className="text-(--docs-fg-faint)"> › </span>
        <span className="text-(--docs-fg) group-aria-selected:text-foreground">{section}</span>
      </span>
      <Key className="hidden group-aria-selected:inline-flex">↵</Key>
    </>
  );
}

const ROW_CLASSES: Record<RowKind, string> = {
  ai: "h-11 rounded-xl",
  page: "h-13 rounded-[14px]",
  section: "h-10 rounded-xl",
};

export default function CustomSearchDialog(props: SharedProps) {
  const agent = useAgent(HEROUI_DOCS_AGENT_ID);
  const dict = useDictionary();
  const searchDict = dict.searchDialog;
  const pathname = usePathname();
  const router = useRouter();
  const {locale} = useI18n();
  const {full} = useTreeContext();

  const [framework, setFramework] = useState<Framework>(() => getFrameworkFromPath(pathname));
  const [filter, setFilter] = useState<Filter>("all");
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    // Follow the docs the reader navigated to.
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      setFramework(getFrameworkFromPath(pathname));
    }
  }, [pathname]);

  const {query, search, setSearch} = useDocsSearch({locale, tag: framework, type: "fetch"});
  const {onOpenChange, open, ...restProps} = props;

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (!isOpen) {
      setSearch("");
      setFilter("all");
    }
  };

  const prompt = search.trim();
  const isAiEnabled = locale === "en";

  const askAi = useCallback(() => {
    if (!prompt) return;
    agent.newConversation(prompt);
  }, [agent, prompt]);

  // ⌘↵ / Ctrl+↵ asks AI. Capture phase, so the list's Enter handler never opens a result.
  useEffect(() => {
    if (!open || !isAiEnabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || !(event.metaKey || event.ctrlKey) || !prompt) return;
      event.preventDefault();
      event.stopPropagation();
      askAi();
      onOpenChange?.(false);
      setSearch("");
    };

    window.addEventListener("keydown", onKeyDown, true);

    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [askAi, isAiEnabled, onOpenChange, open, prompt, setSearch]);

  // fumadocs scrolls the active row only until it touches the list edge, where the scroll
  // shadow fades it out. After arrow-key moves, nudge it past the fade (`.docs-search-list`).
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

      requestAnimationFrame(() => {
        const list = document.getElementById("fd-search-list");
        const row = list?.querySelector<HTMLElement>('[aria-selected="true"]');

        if (!list || !row) return;

        const fade = parseFloat(getComputedStyle(list).getPropertyValue("--scroll-shadow-size"));

        if (!fade) return;

        const listRect = list.getBoundingClientRect();
        const rowRect = row.getBoundingClientRect();
        const overTop = listRect.top + fade - rowRect.top;
        const overBottom = rowRect.bottom - (listRect.bottom - fade);

        if (overTop > 0) list.scrollTop -= overTop;
        else if (overBottom > 0) list.scrollTop += overBottom;
      });
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Strip the locale prefix so URLs compare against paths like `/docs/react/...`.
  const stripLocale = useCallback(
    (url: string | undefined) => {
      if (!url) return "";
      if (locale && url.startsWith(`/${locale}/`)) return url.slice(locale.length + 1);

      return url;
    },
    [locale],
  );

  const allPages = useMemo(() => {
    const pages: Item[] = [];

    function onNode(node: Node) {
      if (node.type === "page") {
        pages.push(node);
      } else if (node.type === "folder") {
        if (node.index) onNode(node.index);
        for (const item of node.children) onNode(item);
      }
    }

    for (const item of full.children) onNode(item);

    return pages;
  }, [full]);

  const pageByPath = useMemo(
    () => new Map(allPages.map((page) => [stripLocale(page.url), page])),
    [allPages, stripLocale],
  );

  const docsPrefix = framework === "web" ? "/docs/react/" : "/docs/native/";
  const releasesPrefix = `${docsPrefix}releases`;
  const migrationPath = "/docs/react/migration";

  const isListed = useCallback(
    (path: string) =>
      path.startsWith(docsPrefix) &&
      !path.startsWith(releasesPrefix) &&
      !(path.startsWith(migrationPath) && path !== migrationPath),
    [docsPrefix, releasesPrefix],
  );

  const isComponentPath = useCallback(
    (path: string) => path.startsWith(`${docsPrefix}components/`),
    [docsPrefix],
  );

  const proComponents = useProSearch(search, framework);

  const rows = useMemo<Row[]>(() => {
    const goTo = (url: string) => () => router.push(url as never);

    const pageRow = (page: Item, group: GroupKey): Row => {
      const path = stripLocale(page.url);

      return {
        group,
        id: `page-${path}`,
        kind: "page",
        node: (
          <PageRow
            description={page.description}
            icon={isComponentPath(path) ? <Cube /> : <FileText />}
            title={page.name}
          />
        ),
        onSelect: goTo(page.url),
      };
    };

    if (!prompt) {
      if (filter === "pro") return [];

      return DEFAULT_SUGGESTIONS[framework].flatMap((url) => {
        const page = pageByPath.get(url);

        return page ? [pageRow(page, "suggested")] : [];
      });
    }

    const normalized = prompt.toLowerCase();
    const seen = new Set<string>();
    const componentPages: Row[] = [];
    const guidePages: Row[] = [];

    const addPage = (page: Item) => {
      const path = stripLocale(page.url);

      if (seen.has(path) || !isListed(path)) return;
      seen.add(path);
      const isComponent = isComponentPath(path);

      (isComponent ? componentPages : guidePages).push(
        pageRow(page, isComponent ? "components" : "guides"),
      );
    };

    // Title matches come first: names that start with the query, then names that contain it
    // (e.g. "button" → Button, ButtonGroup, then CloseButton, ToggleButton).
    const named = allPages.filter(
      (page) => typeof page.name === "string" && page.name.toLowerCase().includes(normalized),
    );
    const startsWithQuery = (page: Item) => String(page.name).toLowerCase().startsWith(normalized);

    for (const page of [
      ...named.filter(startsWithQuery),
      ...named.filter((page) => !startsWithQuery(page)),
    ]) {
      addPage(page);
    }

    const results = query.data && query.data !== "empty" ? query.data : [];
    const sections = new Map<string, SectionHit>();

    for (const result of results) {
      const [base = ""] = result.url.split("#");
      const path = stripLocale(base);

      if (!isListed(path)) continue;
      const page = pageByPath.get(path);

      if (result.type === "page") {
        if (page) addPage(page);
        continue;
      }

      const isHeading = result.type === "heading";
      const text = toPlainText(result.content);
      const existing = sections.get(result.url);

      // Skip table rows (raw `| prop | type |` markdown), and headings that repeat the page title.
      if (!text || text.startsWith("|") || (isHeading && text === page?.name)) continue;
      // One row per anchor; a heading wins over the text matches under it.
      if (existing && (existing.isHeading || !isHeading)) continue;
      sections.set(result.url, {isHeading, page: page?.name ?? "", path, text, url: result.url});
    }

    // Headings read better than raw text matches, so they lead.
    const sectionRows = [...sections.values()]
      .sort((a, b) => Number(b.isHeading) - Number(a.isHeading))
      .map((hit): Row & {isComponent: boolean} => ({
        group: "sections",
        id: `section-${hit.url}`,
        isComponent: isComponentPath(hit.path),
        kind: "section",
        node: (
          <SectionRow
            icon={hit.isHeading ? <Hashtag /> : <FileText />}
            page={hit.page}
            section={hit.text}
          />
        ),
        onSelect: goTo(hit.url),
      }));
    const componentSections = sectionRows.filter((row) => row.isComponent);
    const guideSections = sectionRows.filter((row) => !row.isComponent);

    const proRows = proComponents.map((comp): Row => ({
      group: filter === "pro" ? "pro" : "components",
      id: `pro-${comp.platform}-${comp.name}`,
      kind: "page",
      node: <PageRow isPro description={comp.description} icon={<Cube />} title={comp.title} />,
      // Pro components live on the Pro docs, a separate site.
      onSelect: () => window.open(comp.url, "_blank", "noopener,noreferrer"),
    }));

    let out: Row[];

    switch (filter) {
      case "components":
        out = [
          ...componentPages.slice(0, FOCUSED_LIMIT),
          ...componentSections.slice(0, FOCUSED_LIMIT / 2),
        ];
        break;
      case "guides":
        out = [...guidePages.slice(0, FOCUSED_LIMIT), ...guideSections.slice(0, FOCUSED_LIMIT / 2)];
        break;
      case "pro":
        out = proRows.slice(0, FOCUSED_LIMIT);
        break;
      default:
        out = [
          ...componentPages.slice(0, ALL_LIMITS.components),
          ...proRows.slice(0, ALL_LIMITS.pro),
          ...guidePages.slice(0, ALL_LIMITS.guides),
          ...sectionRows.slice(0, ALL_LIMITS.sections),
        ];
    }

    if (isAiEnabled) {
      const aiRow: Row = {
        id: "ask-ai",
        kind: "ai",
        node: (
          <>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent-soft-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] leading-[18px] text-(--docs-fg)">
              {searchDict.askAiAbout}{" "}
              <span className="font-medium text-foreground">“{prompt}”</span>
            </span>
            <span className="flex shrink-0 items-center gap-1">
              <Key>⌘</Key>
              <Key>↵</Key>
            </span>
          </>
        ),
        onSelect: askAi,
      };

      // Questions go to Ask AI first, since keyword hits rarely answer them.
      out = readsAsQuestion(search) ? [aiRow, ...out] : [...out, aiRow];
    }

    return out;
  }, [
    allPages,
    askAi,
    filter,
    framework,
    isAiEnabled,
    isComponentPath,
    isListed,
    pageByPath,
    proComponents,
    prompt,
    query.data,
    router,
    search,
    searchDict.askAiAbout,
    stripLocale,
  ]);

  // Group headings and the divider above Ask AI, keyed by row id for the item renderer.
  const rowMeta = useMemo(() => {
    const meta = new Map<string, RowMeta>();
    let previousGroup: GroupKey | undefined;

    rows.forEach((row, index) => {
      const isNewGroup = row.group !== undefined && row.group !== previousGroup;

      meta.set(row.id, {
        divider: row.kind === "ai" && index > 0,
        heading: isNewGroup ? row.group : undefined,
        kind: row.kind,
      });
      previousGroup = row.group;
    });

    return meta;
  }, [rows]);

  const items = useMemo<SearchItemType[] | null>(() => {
    if (rows.length === 0) return prompt ? [] : null;

    return rows.map((row) => ({
      id: row.id,
      node: row.node,
      onSelect: row.onSelect,
      type: "action",
    }));
  }, [prompt, rows]);

  const otherFramework: Framework = framework === "web" ? "native" : "web";
  const frameworkLabel = framework === "web" ? `React · v${currentVersion}` : "React Native";

  return (
    <SearchDialog
      isLoading={query.isLoading}
      open={open}
      search={search}
      onOpenChange={handleOpenChange}
      onSearchChange={setSearch}
      {...restProps}
    >
      <SearchDialogOverlay />
      <SearchDialogContent
        className={cn(
          "max-w-[640px] overflow-hidden rounded-3xl border-none bg-(--docs-popover) p-0 shadow-overlay *:border-b-0",
          "[--search-fill-strong:color-mix(in_oklab,var(--foreground)_9%,transparent)] [--search-fill:color-mix(in_oklab,var(--foreground)_5%,transparent)] [--search-line:color-mix(in_oklab,var(--foreground)_6%,transparent)]",
        )}
      >
        <div className="flex h-14 shrink-0 items-center gap-3 ps-4.5 pe-3">
          <Magnifier className="size-4.5 shrink-0 text-(--docs-fg-muted)" />
          <SearchDialogInput placeholder={searchDict.placeholder} />
          <SearchDialogClose />
        </div>
        <div aria-hidden className="h-px shrink-0 bg-(--search-line)" />
        <div className="px-3 pt-2.5 pb-1">
          <Tabs
            selectedKey={filter}
            onSelectionChange={(key) => {
              if (FILTERS.includes(key as Filter)) setFilter(key as Filter);
            }}
          >
            <Tabs.List aria-label={searchDict.filters.all} className="gap-1 p-0">
              {FILTERS.map((id) => (
                <Tabs.Tab
                  key={id}
                  className="h-7 w-auto rounded-full px-3 text-xs font-medium whitespace-nowrap text-(--docs-fg-muted) data-[hovered=true]:text-(--docs-fg) data-[hovered=true]:opacity-100 data-[selected=true]:text-foreground"
                  id={id}
                >
                  {searchDict.filters[id]}
                  <Tabs.Indicator className="rounded-full bg-(--docs-control) shadow-none" />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </div>
        <SearchDialogList
          items={items}
          className={cn(
            "docs-search-list [&_#fd-search-list]:max-h-[min(460px,60vh)] [&_#fd-search-list]:gap-0.5 [&_#fd-search-list]:px-2 [&_#fd-search-list]:pt-2 [&_#fd-search-list]:pb-3",
          )}
          Empty={() => (
            <p className="py-10 text-center text-sm text-(--docs-fg-muted)" role="status">
              {searchDict.noResults}
            </p>
          )}
          Item={({item, onClick}) => {
            const meta = rowMeta.get(item.id);

            return (
              <>
                {meta?.divider ? (
                  <div className="mx-1 my-2 h-px shrink-0 bg-(--search-line)" role="presentation" />
                ) : null}
                {meta?.heading ? (
                  <div
                    className="px-3 pt-1 pb-1.5 text-xs font-medium text-(--docs-fg-muted) [&:not(:first-child)]:mt-2.5"
                    role="presentation"
                  >
                    {searchDict.groups[meta.heading]}
                  </div>
                ) : null}
                <SearchDialogListItem
                  item={item}
                  className={cn(
                    "group flex cursor-pointer items-center gap-3 px-2.5 py-0 aria-selected:bg-(--search-fill)",
                    ROW_CLASSES[meta?.kind ?? "page"],
                  )}
                  onClick={onClick}
                />
              </>
            );
          }}
        />
        <div className="flex h-11 shrink-0 items-center gap-4 bg-(--docs-search-footer) px-4.5 text-xs text-(--docs-fg-faint)">
          <span className="flex items-center gap-1.5 max-sm:hidden">
            <Key>↑</Key>
            <Key>↓</Key>
            {searchDict.hintNavigate}
          </span>
          <span className="flex items-center gap-1.5 max-sm:hidden">
            <Key>↵</Key>
            {searchDict.hintOpen}
          </span>
          {isAiEnabled ? (
            <span className="flex items-center gap-1.5 max-sm:hidden">
              <Key>⌘ ↵</Key>
              {searchDict.hintAskAi}
            </span>
          ) : null}
          <button
            className="ms-auto rounded-md text-xs text-(--docs-fg-faint) transition-colors hover:text-(--docs-fg) focus-visible:outline-2 focus-visible:outline-focus"
            type="button"
            aria-label={searchDict.switchFramework.replace(
              "{framework}",
              dict.frameworksTabs[otherFramework],
            )}
            onClick={() => setFramework(otherFramework)}
          >
            {frameworkLabel}
          </button>
        </div>
      </SearchDialogContent>
    </SearchDialog>
  );
}

function SearchDialogInput(props: ComponentProps<"input">) {
  const t = useTranslations({note: "search dialog"});
  const {onSearchChange, search} = useSearch();

  return (
    <input
      {...props}
      autoFocus
      className="w-0 flex-1 bg-transparent text-base leading-[22px] text-foreground placeholder:text-(--docs-fg-faint) focus-visible:outline-none"
      placeholder={props.placeholder || t("Search")}
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

function SearchDialogClose() {
  const {onOpenChange} = useSearch();

  return (
    <button
      aria-label="Close search"
      className="flex h-6 shrink-0 items-center rounded-lg bg-(--docs-control) px-2 text-[11px] leading-none font-medium text-(--docs-fg-muted) transition-colors hover:text-(--docs-fg)"
      type="button"
      onClick={() => onOpenChange(false)}
    >
      esc
    </button>
  );
}

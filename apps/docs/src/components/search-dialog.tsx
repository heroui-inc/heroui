"use client";

import type {Key} from "@heroui/react";
import type {Item, Node} from "fumadocs-core/page-tree";
import type {SearchItemType, SharedProps} from "fumadocs-ui/components/dialog/search";
import type {ComponentProps} from "react";

import {Kbd, Tag, TagGroup} from "@heroui/react";
import {useDocsSearch} from "fumadocs-core/search/client";
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogList,
  SearchDialogOverlay,
  useSearch,
} from "fumadocs-ui/components/dialog/search";
import {useI18n} from "fumadocs-ui/contexts/i18n";
import {useTreeContext} from "fumadocs-ui/contexts/tree";
import {ArrowRight} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useMemo, useRef, useState} from "react";
import {tv} from "tailwind-variants";

// Default suggested pages for each tag
const DEFAULT_SUGGESTIONS: Record<"native" | "web", string[]> = {
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

const tagStyles = tv({
  base: "bg-default/80 px-2 data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent",
});

export default function CustomSearchDialog(props: SharedProps) {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);

  const getDefaultTag = (path: string): "web" | "native" => {
    if (path.startsWith("/docs/native/")) return "native";
    if (path.startsWith("/docs/react/")) return "web";

    return "web";
  };

  const [selected, setSelected] = useState<Iterable<Key>>(() => new Set([getDefaultTag(pathname)]));

  useEffect(() => {
    // Only update if pathname actually changed
    if (previousPathnameRef.current !== pathname) {
      const defaultTag = getDefaultTag(pathname);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(new Set([defaultTag]));
      previousPathnameRef.current = pathname;
    }
  }, [pathname]);

  const selectedTag = useMemo(() => {
    return Array.from(selected).includes("web") ? "web" : "native";
  }, [selected]);

  const {query, search, setSearch} = useDocsSearch({
    tag: selectedTag,
    type: "fetch",
  });
  const {onOpenChange, ...restProps} = props;
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (!isOpen) {
      setSearch("");
    }
  };
  const {full} = useTreeContext();
  const router = useRouter();

  // Collect all pages from the tree
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

  // Filter pages by tag and create a map
  const searchMap = useMemo(() => {
    const map = new Map<string, Item>();
    const tagPrefix = selectedTag === "web" ? "/docs/react/" : "/docs/native/";

    for (const page of allPages) {
      if (page.url?.startsWith(tagPrefix) && typeof page.name === "string") {
        map.set(page.name.toLowerCase(), page);
      }
    }

    return map;
  }, [allPages, selectedTag]);

  // Get default suggestions for the current tag
  const defaultSuggestions = useMemo(() => {
    if (search.length > 0) return [];

    const suggestionUrls = DEFAULT_SUGGESTIONS[selectedTag];
    const suggestions: SearchItemType[] = [];

    for (const url of suggestionUrls) {
      const page = allPages.find((p) => p.url === url);

      if (page && page.name) {
        suggestions.push({
          id: `suggestion-${url}`,
          node: (
            <div className="inline-flex items-center gap-2">
              {page.icon}
              <span>{page.name}</span>
            </div>
          ),
          onSelect: () => router.push(url as any),
          type: "action",
        });
      }
    }

    return suggestions;
  }, [allPages, selectedTag, search, router]);

  let pageTreeAction: SearchItemType | undefined;

  if (search.length > 0) {
    const normalized = search.toLowerCase();

    for (const [k, page] of searchMap) {
      if (!k.startsWith(normalized)) continue;

      pageTreeAction = {
        id: "quick-action",
        node: (
          <div className="text-fd-muted-foreground inline-flex items-center gap-2">
            <ArrowRight className="size-4" />
            <p>
              Jump to <span className="text-fd-foreground font-medium">{page.name}</span>
            </p>
          </div>
        ),
        onSelect: () => router.push(page.url as any),
        type: "action",
      };
      break;
    }
  }

  return (
    <SearchDialog
      isLoading={query.isLoading}
      search={search}
      onOpenChange={handleOpenChange}
      onSearchChange={setSearch}
      {...restProps}
    >
      <SearchDialogOverlay />
      <SearchDialogContent className="border-none">
        <div className="border-none px-2 pt-2">
          <TagGroup
            disallowEmptySelection
            aria-label="Framework"
            selectedKeys={selected}
            selectionMode="single"
            onSelectionChange={(keys) => setSelected(keys)}
          >
            <TagGroup.List className="gap-1">
              <Tag className={tagStyles()} id="web">
                Web
              </Tag>
              <Tag className={tagStyles()} id="native">
                Native
              </Tag>
            </TagGroup.List>
          </TagGroup>
        </div>
        <SearchDialogHeader className="border-b border-separator">
          <SearchDialogIcon />
          <SearchDialogInput placeholder="What are you searching for?" />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          items={
            search.length === 0
              ? defaultSuggestions.length > 0
                ? defaultSuggestions
                : null
              : query.data !== "empty" || pageTreeAction
                ? [
                    ...(pageTreeAction ? [pageTreeAction] : []),
                    ...(Array.isArray(query.data) ? query.data : []),
                  ]
                : null
          }
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}

function SearchDialogInput(props: ComponentProps<"input">) {
  const {text} = useI18n();
  const {onSearchChange, search} = useSearch();

  return (
    <input
      {...props}
      autoFocus
      className="placeholder:text-fd-muted-foreground w-0 flex-1 bg-transparent text-lg focus-visible:outline-none"
      placeholder={props.placeholder || text.search}
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

function SearchDialogClose({children = "ESC", className, ...props}: ComponentProps<"kbd">) {
  const {onOpenChange} = useSearch();

  return (
    <Kbd className={className} onClick={() => onOpenChange(false)} {...props}>
      <Kbd.Content>{children}</Kbd.Content>
    </Kbd>
  );
}

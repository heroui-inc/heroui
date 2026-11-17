"use client";

import type {CatalogCategory, CatalogItem, ComponentsCatalog} from "@/lib/components-catalog";
import type {Key} from "@heroui/react";

import {SearchField, Tabs} from "@heroui/react";
import {useDeferredValue, useMemo, useState} from "react";

import {useDictionary} from "@/hooks/use-dictionary";
import {cn} from "@/utils/cn";

import {ComponentTile} from "./component-tile";

type License = "all" | "free" | "pro";

const LICENSES: License[] = ["all", "free", "pro"];

function matchesQuery(item: CatalogItem, query: string) {
  if (!query) return true;

  return `${item.title} ${item.name.replaceAll("-", " ")}`.toLowerCase().includes(query);
}

function matchesLicense(item: CatalogItem, license: License) {
  return license === "all" || (license === "pro") === item.pro;
}

function CategorySection({category, isFirst}: {category: CatalogCategory; isFirst: boolean}) {
  return (
    <section className={cn("flex flex-col gap-4", isFirst ? "pt-9" : "pt-12")}>
      <h2
        className="scroll-m-28 text-xl leading-7 font-semibold tracking-[-0.015em] text-(--docs-fg)"
        id={category.id}
      >
        {category.title}
      </h2>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <ComponentTile key={`${item.pro ? "pro" : "free"}-${item.name}`} item={item} />
        ))}
      </div>
    </section>
  );
}

export function ComponentsIndexView({catalog}: {catalog: ComponentsCatalog}) {
  const dict = useDictionary().componentsIndex;
  const [license, setLicense] = useState<License>("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const hasPro = useMemo(
    () => catalog.categories.some((category) => category.items.some((item) => item.pro)),
    [catalog],
  );

  const visibleCategories = useMemo(
    () =>
      catalog.categories
        .map((category) => ({
          ...category,
          items: category.items.filter(
            (item) => matchesLicense(item, license) && matchesQuery(item, deferredQuery),
          ),
        }))
        .filter((category) => category.items.length > 0),
    [catalog, deferredQuery, license],
  );

  // Hide TOC entries whose section is filtered out.
  const hiddenTocCss = useMemo(() => {
    const visibleIds = new Set(visibleCategories.map((category) => category.id));

    return catalog.categories
      .filter((category) => !visibleIds.has(category.id))
      .map(
        (category) =>
          `:is(#nd-toc,[data-toc-popover-content]) a[href="#${category.id}"]{display:none}`,
      )
      .join("");
  }, [catalog, visibleCategories]);

  return (
    <div className="not-prose flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {hasPro ? (
          <Tabs
            selectedKey={license}
            onSelectionChange={(key: Key) => setLicense(String(key) as License)}
          >
            <Tabs.ListContainer>
              <Tabs.List aria-label={dict.licenseLabel}>
                {LICENSES.map((id) => (
                  <Tabs.Tab key={id} className="h-7 px-3 text-[13px] whitespace-nowrap" id={id}>
                    {dict[id]}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        ) : null}
        <SearchField
          aria-label={dict.filterLabel}
          className="w-full sm:ms-auto sm:w-60"
          value={query}
          variant="secondary"
          onChange={setQuery}
        >
          <SearchField.Group className="h-8.5 rounded-full">
            <SearchField.SearchIcon />
            <SearchField.Input className="text-[13px]" placeholder={dict.filterLabel} />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

      {visibleCategories.map((category, index) => (
        <CategorySection key={category.id} category={category} isFirst={index === 0} />
      ))}

      {visibleCategories.length === 0 ? (
        <p className="pt-12 text-sm text-(--docs-fg-muted)">
          {dict.noResults.replace("{query}", query.trim())}
        </p>
      ) : null}

      {hiddenTocCss ? <style>{hiddenTocCss}</style> : null}
    </div>
  );
}

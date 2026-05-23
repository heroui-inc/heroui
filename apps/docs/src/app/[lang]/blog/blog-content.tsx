"use client";

import type {BlogPost} from "@/lib/blog";
import type {Dictionary} from "@/lib/dictionaries";

import {Tag, TagGroup} from "@heroui/react";
import {parseAsStringLiteral, useQueryState} from "nuqs";
import {useMemo} from "react";

import {ProBanner} from "@/app/[lang]/(home)/components/pro-banner";

import {PostCard} from "./post-card";

const CATEGORY_VALUES = ["all", "tutorial", "comparison", "native", "ui-libraries"] as const;

type CategoryValue = (typeof CATEGORY_VALUES)[number];

interface BlogContentProps {
  posts: BlogPost[];
  lang: string;
  dict: Dictionary["blog"];
}

export function BlogContent({dict, lang, posts}: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsStringLiteral(CATEGORY_VALUES).withDefault("all"),
  );

  const categories: {label: string; value: CategoryValue}[] = [
    {label: dict.categories.all, value: "all"},
    {label: dict.categories.tutorial, value: "tutorial"},
    {label: dict.categories.comparison, value: "comparison"},
    {label: dict.categories.native, value: "native"},
    {label: dict.categories.uiLibraries, value: "ui-libraries"},
  ];

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;

    return posts.filter((post) => post.tags.includes(activeCategory));
  }, [posts, activeCategory]);

  const featuredPosts = filteredPosts.slice(0, 2);
  const latestPosts = filteredPosts.slice(2);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{dict.heading}</h1>
      </div>

      <TagGroup
        aria-label={dict.categoriesAriaLabel}
        className="mb-10"
        selectedKeys={new Set([activeCategory])}
        selectionMode="single"
        size="lg"
        onSelectionChange={(keys) => {
          const selected = [...keys][0];

          if (selected) setActiveCategory(String(selected) as CategoryValue);
        }}
      >
        <TagGroup.List>
          {categories.map((cat) => (
            <Tag key={cat.value} id={cat.value}>
              {cat.label}
            </Tag>
          ))}
        </TagGroup.List>
      </TagGroup>

      {featuredPosts.length > 0 && (
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} featured lang={lang} post={post} />
          ))}
        </div>
      )}

      <ProBanner />

      {latestPosts.length > 0 && (
        <>
          <h2 className="mb-6 text-xl font-semibold">{dict.latestPosts}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} lang={lang} post={post} />
            ))}
          </div>
        </>
      )}

      {filteredPosts.length === 0 && (
        <p className="text-fd-muted-foreground py-20 text-center text-lg">{dict.emptyState}</p>
      )}
    </main>
  );
}

"use client";

import type {BlogPost} from "@/lib/blog";

import {Tag, TagGroup} from "@heroui/react";
import {parseAsStringLiteral, useQueryState} from "nuqs";
import {useMemo} from "react";

import {ProBanner} from "@/app/(home)/components/pro-banner";

import {PostCard} from "./post-card";

const CATEGORIES = [
  {label: "All", value: "all"},
  {label: "Guides", value: "tutorial"},
  {label: "Comparisons", value: "comparison"},
  {label: "Native", value: "native"},
  {label: "Resources", value: "ui-libraries"},
] as const;

const categoryValues = CATEGORIES.map((c) => c.value);

export function BlogContent({posts}: {posts: BlogPost[]}) {
  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsStringLiteral(categoryValues).withDefault("all"),
  );

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;

    return posts.filter((post) => post.tags.includes(activeCategory));
  }, [posts, activeCategory]);

  const featuredPosts = filteredPosts.slice(0, 2);
  const latestPosts = filteredPosts.slice(2);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
      </div>

      <TagGroup
        aria-label="Blog categories"
        className="mb-10"
        selectedKeys={new Set([activeCategory])}
        selectionMode="single"
        size="lg"
        onSelectionChange={(keys) => {
          const selected = [...keys][0];

          if (selected) setActiveCategory(String(selected) as (typeof categoryValues)[number]);
        }}
      >
        <TagGroup.List>
          {CATEGORIES.map((cat) => (
            <Tag key={cat.value} id={cat.value}>
              {cat.label}
            </Tag>
          ))}
        </TagGroup.List>
      </TagGroup>

      {featuredPosts.length > 0 && (
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} featured post={post} />
          ))}
        </div>
      )}

      <ProBanner />

      {latestPosts.length > 0 && (
        <>
          <h2 className="mb-6 text-xl font-semibold">Latest Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}

      {filteredPosts.length === 0 && (
        <p className="text-fd-muted-foreground py-20 text-center text-lg">
          No posts found for this category.
        </p>
      )}
    </main>
  );
}

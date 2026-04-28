"use client";

import type {BlogPost} from "@/lib/blog";

import {Tag, TagGroup} from "@heroui/react";
import Link from "next/link";
import {parseAsStringLiteral, useQueryState} from "nuqs";
import {useMemo} from "react";

import {ProBanner} from "@/app/(home)/components/pro-banner";

const TAG_COLORS: Record<string, string> = {
  admin: "from-slate-500 to-zinc-600",
  comparison: "from-violet-500 to-fuchsia-500",
  dashboards: "from-amber-500 to-orange-500",
  "design-system": "from-pink-500 to-rose-500",
  ecommerce: "from-yellow-500 to-amber-500",
  heroui: "from-blue-600 to-violet-600",
  "landing-page": "from-teal-500 to-cyan-500",
  native: "from-fuchsia-500 to-pink-600",
  react: "from-sky-500 to-blue-600",
  saas: "from-indigo-500 to-blue-500",
  templates: "from-orange-500 to-red-500",
  tutorial: "from-emerald-500 to-teal-500",
  "ui-libraries": "from-blue-500 to-cyan-500",
};

function getGradient(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  }

  return "from-zinc-600 to-zinc-800";
}

const CATEGORIES = [
  {label: "All", value: "all"},
  {label: "Guides", value: "tutorial"},
  {label: "Comparisons", value: "comparison"},
  {label: "Native", value: "native"},
  {label: "Resources", value: "ui-libraries"},
] as const;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function PostCard({featured = false, post}: {post: BlogPost; featured?: boolean}) {
  const gradient = getGradient(post.tags);

  return (
    <Link className="group flex flex-col" href={`/blog/${post.slug}`}>
      <div
        className={`bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden rounded-2xl ${featured ? "aspect-[16/10]" : "aspect-[16/9]"}`}
      >
        <span className="px-6 text-center text-lg font-bold text-white/90 sm:text-xl">
          {post.title}
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <h3
          className={`group-hover:text-fd-primary leading-snug font-semibold transition-colors ${featured ? "text-xl" : "text-base"}`}
        >
          {post.title}
        </h3>
        {!!featured && (
          <p className="text-fd-muted-foreground line-clamp-2 text-sm">{post.description}</p>
        )}
        <div className="text-fd-muted-foreground mt-1 flex items-center gap-2 text-sm">
          {post.authorAvatar ? (
            <img
              alt=""
              className="size-5 rounded-full"
              height={20}
              src={post.authorAvatar}
              width={20}
            />
          ) : null}
          <span>{post.author}</span>
          <span>&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </Link>
  );
}

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

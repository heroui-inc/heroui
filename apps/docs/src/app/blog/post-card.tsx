"use client";

import type {BlogPost} from "@/lib/blog";

import {Chip} from "@heroui/react";
import Link from "next/link";
import {useState} from "react";

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

export function getPostGradient(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  }

  return "from-zinc-600 to-zinc-800";
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  /** Renders a denser version of the card. Use in narrow layouts (e.g. related posts). */
  compact?: boolean;
}

export function PostCard({compact = false, featured = false, post}: PostCardProps) {
  const gradient = getPostGradient(post.tags);
  const [imgFailed, setImgFailed] = useState(false);
  const hasExternalImage = post.image && post.image.startsWith("http");
  const showImage = hasExternalImage && !imgFailed;

  const coverTitleClass = compact ? "px-4 text-xs sm:text-sm" : "px-6 text-lg sm:text-xl";

  return (
    <Link className="group flex flex-col" href={`/blog/${post.slug}`}>
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${featured ? "aspect-[2/1]" : "aspect-[16/9]"} ${showImage ? "bg-fd-muted" : `bg-gradient-to-br ${gradient}`}`}
      >
        {showImage ? (
          <img
            alt={post.title}
            className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={post.image}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className={`text-center font-bold text-white/90 ${coverTitleClass}`}>
            {post.title}
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
        {!!post.draft && (
          <Chip
            className="absolute top-3 right-3 shadow-sm"
            color="warning"
            size="sm"
            variant="soft"
          >
            Draft
          </Chip>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <h3
          className={`group-hover:text-fd-primary line-clamp-2 leading-snug font-semibold transition-colors ${featured ? "text-xl" : "text-base"}`}
        >
          {post.title}
        </h3>
        {!!featured && (
          <p className="text-fd-muted-foreground line-clamp-2 text-sm">{post.description}</p>
        )}
        <div
          className={`text-fd-muted-foreground mt-1 flex items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}
        >
          <span>{post.author}</span>
          <span>&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </Link>
  );
}

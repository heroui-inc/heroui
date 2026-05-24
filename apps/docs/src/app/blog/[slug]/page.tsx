import type {Metadata} from "next";

import {ChevronLeft} from "@gravity-ui/icons";
import {Chip} from "@heroui/react";
import {rehypeCode, rehypeCodeDefaultOptions} from "fumadocs-core/mdx-plugins";
import Link from "next/link";
import {notFound} from "next/navigation";
import {compileMDX} from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import {ProBanner} from "@/app/(home)/components/pro-banner";
import {DocsImage} from "@/components/docs-image";
import {siteConfig} from "@/config/site";
import {getAllBlogPosts, getBlogPost, getRelatedPosts} from "@/lib/blog";
import {getTechArticleJsonLd} from "@/lib/json-ld";
import {getMDXComponents} from "@/mdx-components";

import {PostCard} from "../post-card";

interface BlogPostPageProps {
  params: Promise<{slug: string}>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();

  return posts.map((post) => ({slug: post.slug}));
}

export async function generateMetadata({params}: BlogPostPageProps): Promise<Metadata> {
  const {slug} = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  const url = `/blog/${slug}`;

  return {
    alternates: {
      canonical: url,
    },
    description: post.description,
    openGraph: {
      authors: [post.author],
      description: post.description,
      publishedTime: post.date,
      title: post.title,
      type: "article",
      url,
      ...(post.image && {images: [post.image]}),
    },
    title: post.title,
    twitter: {
      card: "summary_large_image",
      description: post.description,
      title: post.title,
      ...(post.image && {images: [post.image]}),
    },
  };
}

export default async function BlogPostPage({params}: BlogPostPageProps) {
  const {slug} = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const {content} = await compileMDX({
    components: getMDXComponents(),
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypeCode, {...rehypeCodeDefaultOptions}]],
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: false,
    },
    source: post.content,
  });

  const postUrl = new URL(`/blog/${slug}`, siteConfig.siteUrl).toString();
  const articleJsonLd = getTechArticleJsonLd({
    authorName: post.author,
    authorUrl: post.authorUrl,
    dateModified: post.date,
    datePublished: post.date,
    description: post.description,
    image: post.image ? new URL(post.image, siteConfig.siteUrl).toString() : undefined,
    title: post.title,
    url: postUrl,
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{__html: JSON.stringify(articleJsonLd)}}
        type="application/ld+json"
      />
      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        <Link
          className="button button--tertiary mb-12 -ml-2 inline-flex items-center gap-1"
          href="/blog"
        >
          <ChevronLeft className="size-4" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-10">
            {!!post.draft && (
              <Chip className="mb-3" color="warning" size="sm" variant="soft">
                Draft
              </Chip>
            )}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="text-fd-muted-foreground mt-4 text-lg leading-relaxed">
              {post.description}
            </p>
          </header>

          {!!post.image && post.image.startsWith("http") && (
            <div className="mb-8">
              <DocsImage alt={post.title} darkSrc={post.darkImage} src={post.image} />
            </div>
          )}

          <div className="text-fd-muted-foreground mb-10 flex items-center gap-2 text-sm">
            {post.authorUrl ? (
              <a
                className="group/author hover:text-fd-foreground flex items-center transition-colors"
                href={post.authorUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {post.authorAvatar ? (
                  <img
                    alt=""
                    className="mr-0 size-0 rounded-full opacity-0 transition-all group-hover/author:mr-2 group-hover/author:size-6 group-hover/author:opacity-100"
                    src={post.authorAvatar}
                  />
                ) : null}
                <span>{post.author}</span>
              </a>
            ) : (
              <span>{post.author}</span>
            )}
            <span>&middot;</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none [&_pre]:overflow-x-auto [&_table]:overflow-x-auto">
            {content}
          </div>

          <ProBanner />

          {(() => {
            const related = getRelatedPosts(slug, post.tags, 3);

            if (related.length === 0) return null;

            return (
              <nav aria-label="Related posts" className="border-fd-border mt-12 border-t pt-10">
                <h2 className="mb-6 text-lg font-semibold">Related Posts</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <PostCard key={r.slug} compact post={r} />
                  ))}
                </div>
              </nav>
            );
          })()}
        </article>
      </main>
    </>
  );
}

import type {Metadata} from "next";

import {ChevronLeft} from "@gravity-ui/icons";
import {rehypeCode, rehypeCodeDefaultOptions} from "fumadocs-core/mdx-plugins";
import Link from "next/link";
import {notFound} from "next/navigation";
import {compileMDX} from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import {ProBanner} from "@/app/(home)/components/pro-banner";
import {siteConfig} from "@/config/site";
import {getAllBlogPosts, getBlogPost, getRelatedPosts} from "@/lib/blog";
import {getTechArticleJsonLd} from "@/lib/json-ld";
import {getMDXComponents} from "@/mdx-components";

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
      <main className="container mx-auto max-w-3xl px-4 py-16">
        <Link className="button button--tertiary -ml-2 mb-12 inline-flex items-center gap-1" href="/blog">
          <ChevronLeft className="size-4" />
          Back to Blog
        </Link>

        <article>
          <header className="border-fd-border mb-12 border-b pb-10">
            <time className="text-fd-muted-foreground text-sm" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="text-fd-muted-foreground mt-4 text-lg leading-relaxed">
              {post.description}
            </p>
            <div className="text-fd-muted-foreground mt-6 flex items-center gap-3 text-sm">
              {post.authorAvatar ? (
                <img
                  alt=""
                  className="size-8 rounded-full"
                  height={32}
                  src={post.authorAvatar}
                  width={32}
                />
              ) : null}
              <div className="flex flex-col">
                <span className="text-fd-foreground font-medium">{post.author}</span>
                {post.authorUrl && post.authorHandle ? (
                  <a className="hover:text-fd-foreground" href={post.authorUrl}>
                    {post.authorHandle}
                  </a>
                ) : post.authorHandle ? (
                  <span>{post.authorHandle}</span>
                ) : null}
              </div>
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">{content}</div>

          <ProBanner />

          {(() => {
            const related = getRelatedPosts(slug, post.tags, 3);

            if (related.length === 0) return null;

            return (
              <nav aria-label="Related posts" className="border-fd-border mt-12 border-t pt-10">
                <h2 className="text-lg font-semibold">Related Posts</h2>
                <ul className="mt-4 space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                        href={`/blog/${r.slug}`}
                      >
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })()}
        </article>
      </main>
    </>
  );
}

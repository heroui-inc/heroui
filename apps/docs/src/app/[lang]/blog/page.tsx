import type {Metadata} from "next";

import {notFound} from "next/navigation";
import {Suspense} from "react";

import {siteConfig} from "@/config/site";
import {getAllBlogPosts} from "@/lib/blog";
import {getDictionary, hasLocale} from "@/lib/dictionaries";
import {i18n} from "@/lib/i18n";
import {getBlogJsonLd} from "@/lib/json-ld";

import {BlogContent} from "./blog-content";

interface BlogPageProps {
  params: Promise<{lang: string}>;
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({lang}));
}

export async function generateMetadata({params}: BlogPageProps): Promise<Metadata> {
  const {lang} = await params;
  const dict = hasLocale(lang) ? await getDictionary(lang) : await getDictionary("en");
  const {blog} = dict;

  return {
    alternates: {
      canonical: `/${lang}/blog`,
    },
    description: blog.metaDescription,
    openGraph: {
      description: blog.metaDescription,
      title: blog.metaTitle,
      url: `/${lang}/blog`,
    },
    title: blog.metaTitle,
  };
}

export default async function BlogPage({params}: BlogPageProps) {
  const {lang} = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const posts = getAllBlogPosts(lang);
  const baseUrl = siteConfig.siteUrl;

  const blogJsonLd = getBlogJsonLd({
    description: dict.blog.metaDescription,
    name: dict.blog.metaTitle,
    posts: posts.map((post) => ({
      datePublished: post.date,
      description: post.description,
      title: post.title,
      url: new URL(`/${lang}/blog/${post.slug}`, baseUrl).toString(),
    })),
    url: new URL(`/${lang}/blog`, baseUrl).toString(),
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{__html: JSON.stringify(blogJsonLd)}}
        type="application/ld+json"
      />
      <Suspense>
        <BlogContent dict={dict.blog} lang={lang} posts={posts} />
      </Suspense>
    </>
  );
}

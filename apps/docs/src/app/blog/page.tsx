import type {Metadata} from "next";

import {Suspense} from "react";

import {siteConfig} from "@/config/site";
import {getAllBlogPosts} from "@/lib/blog";
import {getBlogJsonLd} from "@/lib/json-ld";

import {BlogContent} from "./blog-content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/blog",
  },
  description:
    "Guides, tutorials, and resources for building modern React applications with HeroUI. Comparisons, best practices, and more.",
  openGraph: {
    description:
      "Guides, tutorials, and resources for building modern React applications with HeroUI.",
    title: "Blog | HeroUI",
    url: "/blog",
  },
  title: "Blog | HeroUI",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const baseUrl = siteConfig.siteUrl;

  const blogJsonLd = getBlogJsonLd({
    posts: posts.map((post) => ({
      datePublished: post.date,
      description: post.description,
      title: post.title,
      url: new URL(`/blog/${post.slug}`, baseUrl).toString(),
    })),
    url: new URL("/blog", baseUrl).toString(),
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{__html: JSON.stringify(blogJsonLd)}}
        type="application/ld+json"
      />
      <Suspense>
        <BlogContent posts={posts} />
      </Suspense>
    </>
  );
}

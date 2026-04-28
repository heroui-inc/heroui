import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorAvatar?: string;
  authorHandle?: string;
  authorUrl?: string;
  tags: string[];
  image?: string;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const rawContent = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const {content, data} = matter(rawContent);

    return {
      author: data["author"] || "HeroUI Team",
      authorAvatar: data["authorAvatar"],
      authorHandle: data["authorHandle"],
      authorUrl: data["authorUrl"],
      content,
      date: data["date"],
      description: data["description"],
      image: data["image"],
      slug,
      tags: data["tags"] || [],
      title: data["title"],
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return undefined;

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const {content, data} = matter(rawContent);

  return {
    author: data["author"] || "HeroUI Team",
    authorAvatar: data["authorAvatar"],
    authorHandle: data["authorHandle"],
    authorUrl: data["authorUrl"],
    content,
    date: data["date"],
    description: data["description"],
    image: data["image"],
    slug,
    tags: data["tags"] || [],
    title: data["title"],
  };
}

export function getAllBlogTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = new Set<string>();

  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));

  return Array.from(tags).sort();
}

export function getRelatedPosts(slug: string, tags: string[], limit = 3): BlogPost[] {
  const allPosts = getAllBlogPosts().filter((p) => p.slug !== slug);

  const scored = allPosts.map((post) => {
    const sharedTags = post.tags.filter((t) => tags.includes(t)).length;

    return {post, score: sharedTags};
  });

  scored.sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime());

  return scored.slice(0, limit).map((s) => s.post);
}

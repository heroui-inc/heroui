"use client";

import {Popover, PopoverContent, PopoverTrigger} from "fumadocs-ui/components/ui/popover";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {ChevronDown} from "lucide-react";
import {useMemo, useState} from "react";
import {tv} from "tailwind-variants";

import {AnthropicIcon, GithubIcon, OpenAIIcon} from "@/icons/dev";
import {LinkIcon} from "@/icons/link";
import {cn} from "@/utils/cn";
import {__DEV__} from "@/utils/env";
import {docsButtonVariants} from "@/utils/variants";

import {Iconify} from "../iconify";

const MAX_CACHE_SIZE = 50;
const cache = new Map<string, string>();

function setCache(key: string, value: string) {
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value;

    if (firstKey) {
      cache.delete(firstKey);
    }
  }

  cache.set(key, value);
}

function markdownUrlToSlug(markdownUrl: string): string {
  const slug = markdownUrl.replace(/^\/docs\//, "").replace(/\.mdx$/, "");

  return slug || "index";
}

export function LLMCopyButton({markdownUrl}: {markdownUrl: string}) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    if (!__DEV__) {
      const cached = cache.get(markdownUrl);

      if (cached) {
        return navigator.clipboard.writeText(cached);
      }
    }

    const slug = markdownUrlToSlug(markdownUrl);
    const slugArray = slug.split("/").filter(Boolean);
    const apiUrl = `/llms-raw.mdx/${slugArray.join("/")}`;

    setLoading(true);

    try {
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error(`Failed to fetch content: ${res.statusText}`);
      }

      const content = await res.text();

      if (!__DEV__) {
        setCache(markdownUrl, content);
      }

      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error("Failed to copy markdown:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={docsButtonVariants({
        className: "text-sm [&_svg]:size-3.5 [&_svg]:text-muted",
      })}
      onClick={onClick}
    >
      <Iconify
        className="absolute left-2.5 scale-50 opacity-0 transition-all data-[visible=true]:scale-100 data-[visible=true]:opacity-100"
        data-visible={checked}
        icon="check"
      />
      <Iconify
        className="scale-50 opacity-0 transition-all data-[visible=true]:scale-100 data-[visible=true]:opacity-100"
        data-visible={!checked}
        icon="copy"
      />
      Copy Markdown
    </button>
  );
}

const optionVariants = tv({
  base: "hover:text-fd-accent-foreground hover:bg-fd-accent inline-flex items-center gap-2 rounded-lg p-2 text-sm [&_svg]:flex-none",
});

export function ViewOptions({githubUrl, markdownUrl}: {markdownUrl: string; githubUrl: string}) {
  const items = useMemo(() => {
    let fullMarkdownUrl = "";

    if (typeof window !== "undefined") {
      try {
        fullMarkdownUrl = new URL(markdownUrl, window.location.origin).href;
      } catch {
        fullMarkdownUrl = `${window.location.origin}${markdownUrl}`;
      }
    }

    const query = fullMarkdownUrl
      ? `Read ${fullMarkdownUrl}, I want to ask questions about it.`
      : "I want to ask questions about this documentation.";

    return [
      {
        href: githubUrl,
        icon: <GithubIcon size={18} />,
        title: "Open in GitHub",
      },
      {
        href: `https://chatgpt.com/?${new URLSearchParams({hints: "search", q: query})}`,
        icon: <OpenAIIcon size={16} />,
        title: "Open in ChatGPT",
      },
      {
        href: `https://claude.ai/new?${new URLSearchParams({q: query})}`,
        icon: <AnthropicIcon size={16} />,
        title: "Open in Claude",
      },
    ];
  }, [githubUrl, markdownUrl]);

  return (
    <Popover>
      <PopoverTrigger className={docsButtonVariants()}>
        Open
        <ChevronDown className="text-fd-muted-foreground size-3.5" />
      </PopoverTrigger>
      <PopoverContent align="end" className="flex flex-col overflow-auto">
        {items.map((item) => (
          <a
            key={item.href}
            className={cn(optionVariants())}
            href={item.href}
            rel="noreferrer noopener"
            target="_blank"
          >
            {item.icon}
            {item.title}
            <LinkIcon className="ms-auto size-3 flex-none text-muted" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}

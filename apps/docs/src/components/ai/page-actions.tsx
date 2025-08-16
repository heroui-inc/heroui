"use client";

import {buttonVariants} from "@heroui/react";
import {Popover, PopoverContent, PopoverTrigger} from "fumadocs-ui/components/ui/popover";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {ChevronDown} from "lucide-react";
import {useMemo, useState} from "react";
import {tv} from "tailwind-variants";

import {AnthropicIcon, GithubIcon, OpenAIIcon} from "@/icons/dev";
import {LinkIcon} from "@/icons/link";
import {cn} from "@/utils/cn";
import {__DEV__} from "@/utils/env";

import {Iconify} from "../iconify";

const cache = new Map<string, string>();

export function LLMCopyButton({
  /**
   * A URL to fetch the raw Markdown/MDX content of page
   */
  markdownUrl,
}: {
  markdownUrl: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    // Skip cache in development mode
    if (!__DEV__) {
      const cached = cache.get(markdownUrl);

      if (cached) return navigator.clipboard.writeText(cached);
    }

    let url = markdownUrl;

    if (markdownUrl === "/docs.mdx") {
      url = "/docs/index.mdx";
    }

    setLoading(true);

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": fetch(url).then(async (res) => {
            const content = await res.text();

            // Only cache in production
            if (!__DEV__) {
              cache.set(markdownUrl, content);
            }

            return content;
          }),
        }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={cn(
        buttonVariants({
          className: "[&_svg]:text-muted relative gap-2 [&_svg]:size-3.5",
          size: "sm",
          variant: "tertiary",
        }),
      )}
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

export function ViewOptions({
  githubUrl,
  markdownUrl,
}: {
  /**
   * A URL to the raw Markdown/MDX content of page
   */
  markdownUrl: string;

  /**
   * Source file URL on GitHub
   */
  githubUrl: string;
}) {
  const items = useMemo(() => {
    const fullMarkdownUrl =
      typeof window !== "undefined" ? new URL(markdownUrl, window.location.origin) : "loading";
    const q = `Read ${fullMarkdownUrl}, I want to ask questions about it.`;

    return [
      {
        href: githubUrl,
        icon: <GithubIcon size={18} />,
        title: "Open in GitHub",
      },
      {
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: "search",
          q,
        })}`,
        icon: <OpenAIIcon size={16} />,
        title: "Open in ChatGPT",
      },
      {
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: <AnthropicIcon size={16} />,
        title: "Open in Claude",
      },
    ];
  }, [githubUrl, markdownUrl]);

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({
            className: "gap-2",
            size: "sm",
            variant: "tertiary",
          }),
        )}
      >
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
            <LinkIcon className="text-muted ms-auto size-3 flex-none" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}

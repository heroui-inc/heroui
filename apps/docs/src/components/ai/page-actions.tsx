"use client";

import {Button, ButtonGroup, Description, Label, ListBox, ListBoxItem} from "@heroui/react";
import {Popover, PopoverContent, PopoverTrigger} from "fumadocs-ui/components/ui/popover";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {ChevronDown} from "lucide-react";
import {useMemo, useState} from "react";
import {cn, tv} from "tailwind-variants";

import {ClaudeIcon, CursorIcon, MarkdownIcon, OpenAIIcon, VSCodeIcon} from "@/icons/dev";
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

const optionVariants = tv({
  base: "inline-flex items-center gap-2 rounded-lg text-sm [&_svg]:flex-none [&_svg]:text-muted",
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
        description: "View page as Markdown format",
        href: githubUrl,
        icon: <MarkdownIcon size={18} />,
        key: "markdown",
        title: "View as Markdown",
      },
      {
        description: "Install MCP Server on Cursor",
        href: "https://link.heroui.com/mcp-cursor-install",
        icon: <CursorIcon size={18} />,
        key: "cursor",
        title: "Add to Cursor",
      },
      {
        description: "Install MCP Server on VS Code",
        href: "vscode:mcp/install?%7B%22name%22%3A%22heroui-react%22%2C%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40heroui%2Freact-mcp%40latest%22%5D%7D",
        icon: <VSCodeIcon size={18} />,
        key: "vscode",
        title: "Add to VS Code",
      },
      {
        description: "Ask questions about this page",
        href: `https://chatgpt.com/?${new URLSearchParams({hints: "search", q: query})}`,
        icon: <OpenAIIcon size={16} />,
        key: "chatgpt",
        title: "Open in ChatGPT",
      },
      {
        description: "Ask questions about this page",
        href: `https://claude.ai/new?${new URLSearchParams({q: query})}`,
        icon: <ClaudeIcon size={16} />,
        key: "claude",
        title: "Open in Claude",
      },
    ];
  }, [githubUrl, markdownUrl]);

  const [isLoading, setLoading] = useState(false);

  const [isOpen, setOpen] = useState(false);
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
    <ButtonGroup variant="tertiary">
      <Button isDisabled={isLoading} onClick={onClick}>
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
        {checked ? "Copied" : "Copy Markdown"}
      </Button>
      <Popover open={isOpen} onOpenChange={setOpen}>
        <PopoverTrigger className={docsButtonVariants({size: "md"})}>
          <ChevronDown
            className={cn(
              "text-fd-muted-foreground size-3.5 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </PopoverTrigger>
        <PopoverContent align="end" className="flex flex-col overflow-auto p-1">
          <ListBox>
            {items.map((item) => (
              <ListBoxItem
                key={item.key}
                className={cn(optionVariants())}
                href={item.href}
                id={item.key}
                rel="noreferrer noopener"
                target="_blank"
              >
                {item.icon}
                <div className="flex w-full flex-col">
                  <Label className="flex gap-0.5">{item.title}</Label>
                  <Description>{item.description}</Description>
                </div>
                {(item.key === "chatgpt" || item.key === "claude") && (
                  <Iconify className="text-foreground/70" icon="arrow-up-right-from-square" />
                )}
              </ListBoxItem>
            ))}
          </ListBox>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
}

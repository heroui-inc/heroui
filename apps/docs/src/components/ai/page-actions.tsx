"use client";

import type {Key} from "@heroui/react";

import {
  ArrowUpRightFromSquare,
  Check,
  ChevronDown,
  Copy,
  LogoMarkdown,
  Sparkles,
} from "@gravity-ui/icons";
import {Button, Description, Dropdown, Label} from "@heroui/react";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {useMemo, useState} from "react";

import {useDictionary} from "@/hooks/use-dictionary";
import {ClaudeIcon, CursorIcon, OpenAIIcon, VSCodeIcon} from "@/icons/dev";
import {cn} from "@/utils/cn";
import {__DEV__} from "@/utils/env";

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

function parseMarkdownUrl(markdownUrl: string): {slug: string; lang?: string} {
  const url = markdownUrl.replace(/\.mdx$/, "");
  const match = url.match(/^\/(?:(en|cn)\/)?docs\/(.*)$/);

  if (!match) return {slug: "index"};

  const [, lang, rest] = match;

  return {lang, slug: rest || "index"};
}

async function fetchPageMarkdown(markdownUrl: string) {
  if (!__DEV__) {
    const cached = cache.get(markdownUrl);

    if (cached) return cached;
  }

  const {lang, slug} = parseMarkdownUrl(markdownUrl);
  const slugArray = slug.split("/").filter(Boolean);
  const res = await fetch(`/llms-raw.mdx/${[lang, ...slugArray].filter(Boolean).join("/")}`);

  if (!res.ok) throw new Error(`Failed to fetch content: ${res.statusText}`);

  const content = await res.text();

  if (!__DEV__) setCache(markdownUrl, content);

  return content;
}

/** fumadocs' `useCopyButton` ignores the click event, so it also serves RAC `onPress` / `onAction`. */
function useCopyAction(onCopy: () => void | Promise<void>) {
  return useCopyButton(onCopy) as unknown as [checked: boolean, copy: () => void];
}

interface MenuItem {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  external?: boolean;
}

export interface PageActionsProps {
  /** Site-relative URL of the page's Markdown, e.g. `/en/docs/react/components/button.mdx`. */
  markdownUrl: string;
  /** Text the main button copies. */
  prompt: string;
}

/**
 * Page header split button. The main segment copies an AI prompt for the page;
 * the menu copies or opens the page as Markdown, installs the MCP server, or
 * opens the page in ChatGPT or Claude.
 */
export function PageActions({markdownUrl, prompt}: PageActionsProps) {
  const dict = useDictionary();
  const actions = dict.pageActions;
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [promptCopied, copyPrompt] = useCopyAction(() => {
    void navigator.clipboard.writeText(prompt);
  });

  const [markdownCopied, copyMarkdown] = useCopyAction(async () => {
    setLoading(true);

    try {
      await navigator.clipboard.writeText(await fetchPageMarkdown(markdownUrl));
    } catch (error) {
      console.error("Failed to copy markdown:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  });

  const items = useMemo<MenuItem[]>(() => {
    let fullMarkdownUrl = "";

    if (typeof window !== "undefined") {
      try {
        fullMarkdownUrl = new URL(markdownUrl, window.location.origin).href;
      } catch {
        fullMarkdownUrl = `${window.location.origin}${markdownUrl}`;
      }
    }

    const query = fullMarkdownUrl
      ? actions.askWithUrl.replace("{url}", fullMarkdownUrl)
      : actions.askFallback;

    return [
      {
        description: actions.items.copyPage.description,
        icon: <Copy />,
        key: "copy-page",
        title: actions.items.copyPage.title,
      },
      {
        description: actions.items.markdown.description,
        href: fullMarkdownUrl,
        icon: <LogoMarkdown />,
        key: "markdown",
        title: actions.items.markdown.title,
      },
      {
        description: actions.items.cursor.description,
        href: "cursor://anysphere.cursor-deeplink/mcp/install?name=heroui-react&config=eyJjb21tYW5kIjoibnB4IC15IEBoZXJvdWkvcmVhY3QtbWNwQGxhdGVzdCJ9",
        icon: <CursorIcon size={16} />,
        key: "cursor",
        title: actions.items.cursor.title,
      },
      {
        description: actions.items.vscode.description,
        href: "vscode:mcp/install?%7B%22name%22%3A%22heroui-react%22%2C%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40heroui%2Freact-mcp%40latest%22%5D%7D",
        icon: <VSCodeIcon size={16} />,
        key: "vscode",
        title: actions.items.vscode.title,
      },
      {
        description: actions.items.chatgpt.description,
        external: true,
        href: `https://chatgpt.com/?${new URLSearchParams({hints: "search", q: query})}`,
        icon: <OpenAIIcon size={16} />,
        key: "chatgpt",
        title: actions.items.chatgpt.title,
      },
      {
        description: actions.items.claude.description,
        external: true,
        href: `https://claude.ai/new?${new URLSearchParams({q: query})}`,
        icon: <ClaudeIcon size={16} />,
        key: "claude",
        title: actions.items.claude.title,
      },
    ];
  }, [markdownUrl, actions]);

  // Link items navigate through their own `<a target="_blank">`; RAC still calls
  // onAction for them, so only the copy item is handled here.
  const onAction = (key: Key) => {
    if (key === "copy-page") copyMarkdown();
  };

  return (
    <div className="docs-pill flex h-8 items-center gap-0.5 p-0.5" data-page-actions="">
      <Button
        aria-label={promptCopied ? dict.copyPrompt.ariaLabelCopied : dict.copyPrompt.ariaLabelCopy}
        className="docs-pill-segment h-7 min-w-0 gap-1.5 ps-2.5 pe-3 text-[13px] font-medium [&_svg]:size-3.5"
        data-strong=""
        size="sm"
        variant="ghost"
        onPress={copyPrompt}
      >
        {promptCopied ? <Check /> : <Sparkles />}
        {promptCopied ? dict.copyPrompt.copied : dict.copyPrompt.copy}
      </Button>
      <span aria-hidden className="h-4 w-px shrink-0 bg-(--docs-divider)" />
      <Dropdown isOpen={isOpen} onOpenChange={setOpen}>
        <Button
          isIconOnly
          aria-label={actions.moreOptions}
          className="docs-pill-segment h-7 w-[30px] min-w-0"
          data-open={isOpen}
          size="sm"
          variant="ghost"
        >
          <ChevronDown
            className={cn(
              "size-3 text-(--docs-fg-subtle) transition-transform duration-150",
              isOpen && "rotate-180",
            )}
          />
        </Button>
        <Dropdown.Popover
          className="min-w-[264px] rounded-2xl bg-(--docs-popover)"
          offset={8}
          placement="bottom end"
        >
          <Dropdown.Menu onAction={onAction}>
            {items.map((item) => {
              const isCopy = item.key === "copy-page";

              return (
                <Dropdown.Item
                  key={item.key}
                  className="gap-3 rounded-xl [&_svg]:size-4 [&_svg]:shrink-0"
                  href={item.href}
                  id={item.key}
                  isDisabled={!!isCopy && isLoading}
                  rel={item.href ? "noreferrer noopener" : undefined}
                  target={item.href ? "_blank" : undefined}
                  textValue={item.title}
                >
                  <span className="text-(--docs-fg-muted)">
                    {isCopy && markdownCopied ? <Check /> : item.icon}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Label className="text-[13px]">
                      {isCopy && markdownCopied ? actions.copied : item.title}
                    </Label>
                    <Description className="text-xs">{item.description}</Description>
                  </div>
                  {item.external ? (
                    <ArrowUpRightFromSquare className="size-3! text-(--docs-fg-faint)" />
                  ) : null}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}

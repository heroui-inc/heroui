"use client";

import {Button, ButtonGroup, Description, Dropdown, Label} from "@heroui/react";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {ChevronDown} from "lucide-react";
import {useMemo, useState} from "react";
import {cn} from "tailwind-variants";

import {useDictionary} from "@/hooks/use-dictionary";
import {ClaudeIcon, CursorIcon, MarkdownIcon, OpenAIIcon, VSCodeIcon} from "@/icons/dev";
import {__DEV__} from "@/utils/env";

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

function parseMarkdownUrl(markdownUrl: string): {slug: string; lang?: string} {
  const url = markdownUrl.replace(/\.mdx$/, "");
  const match = url.match(/^\/(?:(en|cn)\/)?docs\/(.*)$/);

  if (!match) return {slug: "index"};

  const [, lang, rest] = match;

  return {lang, slug: rest || "index"};
}

export function ViewOptions({markdownUrl}: {markdownUrl: string}) {
  const dict = useDictionary().pageActions;
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
      ? dict.askWithUrl.replace("{url}", fullMarkdownUrl)
      : dict.askFallback;

    return [
      {
        description: dict.items.markdown.description,
        href: fullMarkdownUrl,
        icon: <MarkdownIcon size={18} />,
        key: "markdown",
        title: dict.items.markdown.title,
      },
      {
        description: dict.items.cursor.description,
        href: "cursor://anysphere.cursor-deeplink/mcp/install?name=heroui-react&config=eyJjb21tYW5kIjoibnB4IC15IEBoZXJvdWkvcmVhY3QtbWNwQGxhdGVzdCJ9",
        icon: <CursorIcon size={18} />,
        key: "cursor",
        title: dict.items.cursor.title,
      },
      {
        description: dict.items.vscode.description,
        href: "vscode:mcp/install?%7B%22name%22%3A%22heroui-react%22%2C%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40heroui%2Freact-mcp%40latest%22%5D%7D",
        icon: <VSCodeIcon size={18} />,
        key: "vscode",
        title: dict.items.vscode.title,
      },
      {
        description: dict.items.chatgpt.description,
        href: `https://chatgpt.com/?${new URLSearchParams({hints: "search", q: query})}`,
        icon: <OpenAIIcon size={16} />,
        key: "chatgpt",
        title: dict.items.chatgpt.title,
      },
      {
        description: dict.items.claude.description,
        href: `https://claude.ai/new?${new URLSearchParams({q: query})}`,
        icon: <ClaudeIcon size={16} />,
        key: "claude",
        title: dict.items.claude.title,
      },
    ];
  }, [markdownUrl, dict]);

  const [isLoading, setLoading] = useState(false);

  const [isOpen, setOpen] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    if (!__DEV__) {
      const cached = cache.get(markdownUrl);

      if (cached) {
        return navigator.clipboard.writeText(cached);
      }
    }

    const {lang, slug} = parseMarkdownUrl(markdownUrl);
    const slugArray = slug.split("/").filter(Boolean);
    const apiUrl = `/llms-raw.mdx/${[lang, ...slugArray].filter(Boolean).join("/")}`;

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
    <ButtonGroup size="md" variant="tertiary">
      <Button className={isLoading ? "animate-pulse" : ""} isDisabled={isLoading} onClick={onClick}>
        {checked ? (
          <>
            <Iconify icon="check" />
            {dict.copied}
          </>
        ) : (
          <>
            <Iconify icon="copy" />
            {dict.copyMarkdown}
          </>
        )}
      </Button>
      <Dropdown isOpen={isOpen} onOpenChange={setOpen}>
        <Button isIconOnly aria-label={dict.moreOptions} size="md" variant="tertiary">
          <ButtonGroup.Separator />
          <ChevronDown
            className={cn(
              "text-fd-muted-foreground size-3.5 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </Button>
        <Dropdown.Popover placement="bottom end">
          <Dropdown.Menu
            onAction={(key) => {
              const item = items.find((i) => i.key === key);

              if (item?.href) {
                window.open(item.href, "_blank", "noreferrer noopener");
              }
            }}
          >
            {items.map((item) => (
              <Dropdown.Item
                key={item.key}
                href={item.href}
                id={item.key}
                rel="noreferrer noopener"
                target="_blank"
                textValue={item.title}
              >
                {item.icon}
                <div className="flex w-full flex-col">
                  <Label className="flex gap-0.5">{item.title}</Label>
                  <Description>{item.description}</Description>
                </div>
                {(item.key === "chatgpt" || item.key === "claude") && (
                  <Iconify className="text-foreground/70" icon="arrow-up-right-from-square" />
                )}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </ButtonGroup>
  );
}

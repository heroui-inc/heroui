"use client";

import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";

import {ChevronDown} from "@gravity-ui/icons";
import {Button} from "@heroui/react";
import * as React from "react";

import {useDictionary} from "@/hooks/use-dictionary";
import {FumadocsCustomCodeblock as BaseCodeBlock} from "@/mdx-components/fumadocs-custom-codeblock";
import {cn} from "@/utils/cn";

/** Code longer than this collapses to a peek with a "View code" button. */
const PEEK_MAX_LINES = 5;

export function CodeBlock({
  children,
  className,
  code,
  collapsible,
  isIsolated = false,
  preview,
  showLineNumbers,
  title,
  ...props
}: {
  isIsolated?: boolean;
  lang?: string;
  code?: string;
  collapsible?: boolean;
  showLineNumbers?: boolean;
  title: string | undefined;
  children: React.ReactNode | React.ReactElement;
  preview?: React.ReactNode;
} & CodeBlockProps) {
  const dict = useDictionary().codeBlock;
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const lineCount = code ? code.split("\n").length : 0;

  if (!collapsible || lineCount <= PEEK_MAX_LINES) {
    return (
      <BaseCodeBlock
        code={code}
        title={title}
        className={cn(
          "code-block-wrapper docs-code-block",
          isIsolated && "is-isolated",
          showLineNumbers && "docs-code-block-line-numbers",
          className,
        )}
        {...props}
      >
        {children}
      </BaseCodeBlock>
    );
  }

  return (
    <div
      data-code-peek={isCollapsed ? "collapsed" : "expanded"}
      className={cn(
        "relative",
        // Standalone (MDX) blocks draw their own panel; demo code sits in `.code-section`.
        isIsolated && "rounded-2xl bg-(--docs-demo) [--docs-code:var(--docs-demo)]",
      )}
    >
      <div
        className={cn(
          "code-block-wrapper",
          isIsolated && "is-isolated",
          isCollapsed && "max-h-[120px] overflow-hidden",
        )}
      >
        <BaseCodeBlock
          code={code}
          title={title}
          className={cn(
            "docs-code-block shadow-none",
            showLineNumbers && "docs-code-block-line-numbers",
            className,
          )}
          {...props}
        >
          {isCollapsed && preview ? preview : children}
        </BaseCodeBlock>
      </div>
      {isCollapsed ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent via-(--docs-code)/85 via-55% to-(--docs-code)"
        />
      ) : null}
      <div
        className={cn(
          "flex justify-center",
          isCollapsed ? "absolute inset-x-0 bottom-5" : "pt-1 pb-4",
        )}
      >
        <Button
          aria-expanded={!isCollapsed}
          className="docs-soft-pill h-7 min-w-0 gap-1 rounded-full ps-3 pe-2.5 text-xs font-medium"
          size="sm"
          variant="ghost"
          onPress={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? dict.viewCode : dict.hideCode}
          <ChevronDown
            className={cn("size-3 transition-transform duration-150", !isCollapsed && "rotate-180")}
          />
        </Button>
      </div>
    </div>
  );
}

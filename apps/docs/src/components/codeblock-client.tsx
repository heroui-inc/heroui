"use client";

import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";

import {Button} from "@heroui/react";
import * as React from "react";

import {FumadocsCustomCodeblock as BaseCodeBlock} from "@/mdx-components/fumadocs-custom-codeblock";
import {cn} from "@/utils/cn";

export function CodeBlock({
  children,
  className,
  collapsible,
  isIsolated = false,
  preview,
  showLineNumbers,
  title,
  ...props
}: {
  isIsolated?: boolean;
  lang?: string;
  collapsible?: boolean;
  showLineNumbers?: boolean;
  title: string | undefined;
  children: React.ReactNode | React.ReactElement;
  preview?: React.ReactNode;
} & CodeBlockProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  if (!collapsible) {
    return (
      <BaseCodeBlock
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
    <div className="relative">
      <div
        className={cn(
          "code-block-wrapper",
          isIsolated && "is-isolated",
          isCollapsed && "mask-to-bottom relative max-h-[150px] overflow-hidden",
          !isCollapsed && "pb-10",
        )}
      >
        <BaseCodeBlock
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
      <Button
        className="absolute right-1/2 bottom-2 translate-x-1/2 bg-surface text-xs shadow-sm shadow-black/5"
        size="sm"
        type="button"
        variant="tertiary"
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Expand code" : "Collapse code"}
      </Button>
    </div>
  );
}

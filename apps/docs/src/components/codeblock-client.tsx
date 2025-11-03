"use client";

import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";

import {Button} from "@heroui/react";
import * as Base from "fumadocs-ui/components/codeblock";
import * as React from "react";

import {cn} from "@/utils/cn";

export function CodeBlock({
  children,
  className,
  collapsible,
  isIsolated = false,
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
} & CodeBlockProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  if (!collapsible) {
    return (
      <Base.CodeBlock
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
      </Base.CodeBlock>
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
        <Base.CodeBlock
          title={title}
          className={cn(
            "docs-code-block",
            showLineNumbers && "docs-code-block-line-numbers",
            className,
          )}
          {...props}
        >
          {children}
        </Base.CodeBlock>
      </div>
      <Button
        className="bg-surface absolute bottom-2 right-1/2 translate-x-1/2 text-xs shadow-sm shadow-black/5"
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

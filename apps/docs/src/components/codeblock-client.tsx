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
  showLineNumbers,
  title,
  ...props
}: {
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
          isCollapsed && "mask-to-bottom relative max-h-[300px] overflow-hidden",
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
        className={cn("absolute bottom-0 right-1/2 translate-x-1/2", !isCollapsed && "bottom-4")}
        size="sm"
        type="button"
        variant="secondary"
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Expand code" : "Collapse code"}
      </Button>
    </div>
  );
}

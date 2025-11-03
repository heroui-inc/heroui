import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";

import {highlight} from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";
import * as React from "react";

import {CodeBlock as CodeBlockClient} from "./codeblock-client";

export async function CodeBlock({
  className,
  code,
  collapsible,
  isIsolated = false,
  lang,
  showLineNumbers,
  title,
  ...props
}: {
  code: string;
  lang: string;
  // Means the code block is rendered directly in the MDX file using <CollapsibleCode>
  isIsolated?: boolean;
  showLineNumbers?: boolean;
  title: string | undefined;
  collapsible?: boolean;
} & CodeBlockProps) {
  let rendered;

  try {
    // Trim the code to avoid issues with leading/trailing whitespace
    const trimmedCode = code?.trim() || "";

    // Skip highlighting for empty code blocks
    if (!trimmedCode) {
      rendered = (
        <Base.Pre>
          <code />
        </Base.Pre>
      );
    } else {
      rendered = await highlight(trimmedCode, {
        components: {
          pre: (props) => <Base.Pre {...props} />,
        },
        lang: lang || "text",
        // other Shiki options
      });
    }
  } catch (error) {
    console.error("Syntax highlighting error:", error);
    // Fallback to plain code block without syntax highlighting
    rendered = (
      <Base.Pre>
        <code>{code}</code>
      </Base.Pre>
    );
  }

  return (
    <CodeBlockClient
      className={className}
      collapsible={collapsible}
      isIsolated={isIsolated}
      lang={lang}
      showLineNumbers={showLineNumbers}
      title={title}
      {...props}
    >
      {rendered}
    </CodeBlockClient>
  );
}

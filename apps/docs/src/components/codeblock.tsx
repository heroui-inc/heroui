import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";

import {highlight} from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";
import * as React from "react";

import {docsShikiOptions} from "@/lib/shiki-themes";

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
  const {failed, preview, rendered} = await highlightCode(code, lang);

  return (
    <CodeBlockClient
      className={className}
      code={code?.trim() || ""}
      collapsible={collapsible}
      isIsolated={isIsolated}
      lang={lang}
      preview={preview}
      showLineNumbers={showLineNumbers}
      title={title}
      {...props}
    >
      {failed ? (
        <Base.Pre>
          <code>{code}</code>
        </Base.Pre>
      ) : (
        rendered
      )}
    </CodeBlockClient>
  );
}

/** Code longer than this gets a highlighted 5-line `preview` for its collapsed peek. */
const PREVIEW_MIN_LINES = 10;

/** Server-side highlighting shared by code blocks and controlled demos. */
export async function highlightCode(
  code: string | undefined,
  lang: string | undefined,
): Promise<{rendered: React.ReactNode; preview?: React.ReactNode; failed: boolean}> {
  const components = {
    pre: (props: React.ComponentProps<typeof Base.Pre>) => <Base.Pre {...props} />,
  };
  const options = {components, lang: lang || "text", ...docsShikiOptions};
  // Trim the code to avoid issues with leading/trailing whitespace
  const trimmedCode = code?.trim() || "";

  // Skip highlighting for empty code blocks
  if (!trimmedCode) {
    return {
      failed: false,
      rendered: (
        <Base.Pre>
          <code />
        </Base.Pre>
      ),
    };
  }

  try {
    const lines = trimmedCode.split("\n");
    const preview =
      lines.length > PREVIEW_MIN_LINES
        ? await highlight(lines.slice(0, 5).join("\n"), options)
        : undefined;

    return {failed: false, preview, rendered: await highlight(trimmedCode, options)};
  } catch (error) {
    console.error("Syntax highlighting error:", error);

    return {failed: true, rendered: null};
  }
}

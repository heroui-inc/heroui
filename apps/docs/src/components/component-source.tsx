import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";

import fs from "node:fs/promises";
import path from "node:path";

import {highlight} from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";
import * as React from "react";

import {CodeDisclosureWrapper} from "@/components/disclosure-code-wrapper";
import {getDemo} from "@/demos";
import {cn} from "@/utils/cn";

export async function ComponentSource({
  className,
  // TODO: Disclosure is not ready yet, so we need to use collapsible for now
  collapsible = false,
  language,
  name,
  showCodeTitle = false,
  showLineNumbers = true,
  title,
}: React.ComponentProps<"div"> & {
  name?: string;
  title?: string;
  language?: string;
  showCodeTitle?: boolean;
  showLineNumbers?: boolean;
  collapsible?: boolean;
}) {
  if (!name) {
    return null;
  }

  let src: string | undefined;
  let code: string | undefined;

  if (name) {
    const item = await getDemo(name);

    src = item?.file;
  }

  if (src) {
    try {
      const file = await fs.readFile(path.join(process.cwd(), "src", "demos", src), "utf-8");

      code = file;
    } catch (error) {
      // Failed to read demo file

      return null;
    }
  }

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx";

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <CodeBlock
          code={code}
          lang={lang}
          showLineNumbers={showLineNumbers}
          title={showCodeTitle ? title : undefined}
        />
      </div>
    );
  }

  return (
    <CodeDisclosureWrapper className={className}>
      <CodeBlock
        code={code}
        lang={lang}
        showLineNumbers={showLineNumbers}
        title={showCodeTitle ? title : undefined}
      />
    </CodeDisclosureWrapper>
  );
}

async function CodeBlock({
  className,
  code,
  lang,
  showLineNumbers,
  title,
  ...props
}: {
  code: string;
  lang: string;
  showLineNumbers?: boolean;
  title: string | undefined;
} & CodeBlockProps) {
  const rendered = await highlight(code, {
    components: {
      pre: (props) => <Base.Pre {...props} />,
    },
    lang,
    // other Shiki options
  });

  return (
    <Base.CodeBlock
      title={title}
      className={cn(
        "docs-code-block",
        showLineNumbers && "docs-code-block-line-numbers",
        className,
      )}
      {...props}
    >
      {rendered}
    </Base.CodeBlock>
  );
}

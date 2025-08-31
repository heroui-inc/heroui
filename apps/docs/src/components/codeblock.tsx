import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";

import {highlight} from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";
import * as React from "react";

import {CodeBlock as CodeBlockClient} from "./codeblock-client";

export async function CodeBlock({
  className,
  code,
  collapsible,
  lang,
  showLineNumbers,
  title,
  ...props
}: {
  code: string;
  lang: string;
  showLineNumbers?: boolean;
  title: string | undefined;
  collapsible?: boolean;
} & CodeBlockProps) {
  const rendered = await highlight(code, {
    components: {
      pre: (props) => <Base.Pre {...props} />,
    },
    lang,
    // other Shiki options
  });

  return (
    <CodeBlockClient
      className={className}
      collapsible={collapsible}
      lang={lang}
      showLineNumbers={showLineNumbers}
      title={title}
      {...props}
    >
      {rendered}
    </CodeBlockClient>
  );
}

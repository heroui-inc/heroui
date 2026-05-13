import fs from "node:fs/promises";
import path from "node:path";

import * as React from "react";

import {getShowcase} from "@/showcases";
import {cn} from "@/utils/cn";

import {CodeBlock} from "./codeblock";

export async function ShowcaseSource({
  allowCopy = true,
  className,
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
  allowCopy?: boolean;
}) {
  if (!name) {
    return null;
  }

  const item = getShowcase(name);
  const src = item?.file;
  let code: string | undefined;

  if (src && item?.category) {
    try {
      // Extract category from the showcase data
      const category = item.category.toLowerCase();
      const file = await fs.readFile(
        path.join(process.cwd(), "src", "showcases", category, src),
        "utf-8",
      );

      code = file;
    } catch (error) {
      // Failed to read showcase file
      return null;
    }
  }

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx";

  return (
    <div className={cn("relative", className)}>
      <CodeBlock
        allowCopy={allowCopy}
        code={code}
        collapsible={collapsible}
        lang={lang}
        showLineNumbers={showLineNumbers}
        title={showCodeTitle ? title : undefined}
      />
    </div>
  );
}

import fs from "node:fs/promises";
import path from "node:path";

import * as React from "react";

import {getDemo} from "@/demos";
import {cn} from "@/utils/cn";

import {CodeBlock} from "./codeblock";

export async function ComponentSource({
  className,
  // TODO: Disclosure is not ready yet, so we need to use collapsible for now
  collapsible = true,
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

  return (
    <div className={cn("relative", className)}>
      <CodeBlock
        code={code}
        collapsible={collapsible}
        lang={lang}
        showLineNumbers={showLineNumbers}
        title={showCodeTitle ? title : undefined}
      />
    </div>
  );
}

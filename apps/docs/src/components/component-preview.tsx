"use client";

import {Tab, Tabs} from "fumadocs-ui/components/tabs";
import * as React from "react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
}

export function ComponentPreview({
  align = "center",
  children,
  className,
  ...props
}: ComponentPreviewProps) {
  const [Example, Code, ...Children] = React.Children.toArray(children) as React.ReactElement[];

  return (
    <div className={className} {...props}>
      <Tabs className="relative my-4 w-full" items={["Preview", "Code"]}>
        <Tab value="Preview">
          <div
            className={`bg-background flex min-h-[350px] rounded-lg border p-10 ${
              align === "center" ? "items-center justify-center" : ""
            } ${align === "start" ? "items-start justify-start" : ""} ${
              align === "end" ? "items-end justify-end" : ""
            }`}
          >
            {Example}
          </div>
        </Tab>
        <Tab value="Code">
          <div className="flex flex-col space-y-4">
            <div className="w-full overflow-auto rounded-md">{Code}</div>
            {Children?.length ? <div className="rounded-md">{Children}</div> : null}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

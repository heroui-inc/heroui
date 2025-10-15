import {Tab, Tabs} from "fumadocs-ui/components/tabs";
import React from "react";

import {cn} from "@/utils/cn";

interface ComponentPreviewTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  isBgSolid?: boolean;
  description?: string;
  hideCode?: boolean;
  name: string;
}

export function ComponentPreviewTabs({
  align = "center",
  children,
  className,
  description,
  hideCode = false,
  isBgSolid = false,
  name,
  ...props
}: React.PropsWithChildren<ComponentPreviewTabsProps>) {
  const [Component, Code] = React.Children.toArray(children) as React.ReactElement[];

  const alignmentClasses = {
    center: "items-center justify-center",
    end: "items-end justify-end",
    start: "items-start justify-start",
  };

  return (
    <div
      className={cn("component-preview-tabs group relative my-4 w-full", className)}
      data-name={name}
      {...props}
    >
      {!!description && <p className="text-muted-foreground mb-2 text-sm">{description}</p>}
      <Tabs
        className="relative w-full border-none bg-transparent p-0"
        items={hideCode ? ["Preview"] : ["Preview", "Code"]}
      >
        <Tab className="border-border overflow-hidden border bg-transparent p-0" value="Preview">
          <div
            data-name={name}
            className={cn(
              "preview not-prose relative min-h-[350px] w-full overflow-hidden rounded-md p-4 before:absolute before:inset-0 before:z-[-1] before:bg-white/40 sm:p-10 dark:before:bg-black/25",
              isBgSolid && "bg-background",
              alignmentClasses[align],
              "flex",
            )}
            style={{
              contain: "layout style",
              isolation: "isolate",
            }}
          >
            {Component}
          </div>
        </Tab>

        {!hideCode && !!Code && (
          <Tab className="bg-transparent p-0" value="Code">
            <div className="relative">
              <div className="code-block-wrapper max-h-[650px] min-h-[350px] overflow-auto">
                {Code}
              </div>
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

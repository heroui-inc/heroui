import {Tab, Tabs} from "fumadocs-ui/components/tabs";
import React from "react";

import {cn} from "@/utils/cn";

interface ComponentPreviewTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
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
    <div className={cn("group relative my-4 w-full", className)} data-name={name} {...props}>
      {!!description && <p className="text-muted-foreground mb-2 text-sm">{description}</p>}
      <Tabs
        className="relative w-full border-none bg-transparent p-0"
        items={hideCode ? ["Preview"] : ["Preview", "Code"]}
      >
        <Tab className="border-border border bg-transparent" value="Preview">
          <div
            data-name={name}
            className={cn(
              "preview relative min-h-[350px] w-full rounded-md p-10",
              alignmentClasses[align],
              "flex",
            )}
          >
            {Component}
          </div>
        </Tab>

        {!hideCode && !!Code && (
          <Tab className="bg-transparent p-0" value="Code">
            <div className="relative">
              <div className="code-tab-wrapper max-h-[650px] min-h-[350px] overflow-auto">
                {Code}
              </div>
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

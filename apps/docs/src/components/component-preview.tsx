// import {Pre} from "fumadocs-ui/components/codeblock";
import * as React from "react";

import {getDemo} from "@/demos";
import {cn} from "@/utils/cn";

import {ComponentPreviewTabs} from "./component-preview-tabs";
import {ComponentSource} from "./component-source";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  description?: string;
  hideCode?: boolean;
  name: string;
}

export function ComponentPreview({
  align = "center",
  className,
  description,
  hideCode = false,
  name,
  ...props
}: ComponentPreviewProps) {
  const demo = getDemo(name);

  if (!demo) {
    return (
      <div className={cn("my-4 rounded-md border border-red-200 bg-red-50 p-4", className)}>
        <p className="text-sm text-red-600">
          Component demo &quot;{name}&quot; not found. Make sure the demo is registered in the demos
          index.
        </p>
      </div>
    );
  }

  const Component = demo.component;

  return (
    <ComponentPreviewTabs
      align={align}
      className={className}
      description={description}
      hideCode={hideCode}
      name={name}
      {...props}
    >
      <Component />
      {!hideCode && !!demo.file && <ComponentSource language="tsx" name={name} title={name} />}
    </ComponentPreviewTabs>
  );
}

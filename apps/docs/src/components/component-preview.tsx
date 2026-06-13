// import {Pre} from "fumadocs-ui/components/codeblock";
import * as React from "react";

import {getDemo} from "@/demos";
import {cn} from "@/utils/cn";

import {ComponentPreviewContainer} from "./component-preview-container";
import {ComponentSource} from "./component-source";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
  isBgSolid?: boolean;
  description?: string;
  hideCode?: boolean;
  minHeight?: string;
  /**
   * Locale used to resolve which demo registry to read from. Falls back to the
   * default locale (en) if the requested translation is missing. Usually
   * injected by the page route via `getMDXComponents` overrides.
   */
  locale?: string;
}

export function ComponentPreviewFallback() {
  return (
    <div
      aria-hidden="true"
      className="component-preview-container my-4 h-[200px] animate-pulse rounded-lg border bg-muted/30"
    />
  );
}

export async function ComponentPreview({
  align = "center",
  className,
  description,
  hideCode = false,
  isBgSolid = false,
  locale,
  minHeight,
  name,
  ...props
}: ComponentPreviewProps) {
  const demo = getDemo(name, locale);

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

  const Component = await demo.loader();

  return (
    <ComponentPreviewContainer
      align={align}
      className={className}
      description={description}
      hideCode={hideCode}
      isBgSolid={isBgSolid}
      minHeight={minHeight}
      name={name}
      {...props}
    >
      <Component />
      {!hideCode && !!demo.file && (
        <ComponentSource language="tsx" locale={locale} name={name} title={name} />
      )}
    </ComponentPreviewContainer>
  );
}

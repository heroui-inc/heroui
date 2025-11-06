"use client";

import React from "react";
import {useIntersectionObserver} from "usehooks-ts";

import {cn} from "@/utils/cn";

interface ComponentPreviewContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  isBgSolid?: boolean;
  description?: string;
  hideCode?: boolean;
  name: string;
}

export function ComponentPreviewContainer({
  align = "center",
  children,
  className,
  description,
  hideCode = false,
  isBgSolid = false,
  name,
  ...props
}: React.PropsWithChildren<ComponentPreviewContainerProps>) {
  const [Component, Code] = React.Children.toArray(children) as React.ReactElement[];
  const {isIntersecting: previewInView, ref: previewRef} = useIntersectionObserver({
    initialIsIntersecting: true,
    rootMargin: "400px 0px 100px 0px",
    threshold: 0,
  });
  const {isIntersecting: codeInView, ref: codeRef} = useIntersectionObserver({
    initialIsIntersecting: true,
    rootMargin: "300px 0px 0px 0px",
    threshold: 0,
  });

  const alignmentClasses = {
    center: "items-center justify-center",
    end: "items-end justify-end",
    start: "items-start justify-start",
  };

  return (
    <div
      className={cn("component-preview-container group relative my-4 w-full", className)}
      data-name={name}
      {...props}
    >
      {!!description && <p className="text-muted-foreground mb-2 text-sm">{description}</p>}

      {/* Preview Section */}
      <div
        ref={previewRef}
        data-name={name}
        className={cn(
          "preview not-prose border-divider relative min-h-[350px] w-full overflow-hidden rounded-t-xl border-l border-r border-t p-4 sm:p-10",
          isBgSolid && "bg-background",
          alignmentClasses[align],
          "flex",
        )}
        style={{
          contain: "layout style",
          isolation: "isolate",
        }}
      >
        {previewInView ? Component : null}
      </div>

      {/* Code Section */}
      {!hideCode && !!Code && (
        <div
          ref={codeRef}
          className="code-section border-divider relative rounded-b-xl border bg-transparent"
        >
          <div className="code-block-wrapper min-h-[124px]">{codeInView ? Code : null}</div>
        </div>
      )}
    </div>
  );
}

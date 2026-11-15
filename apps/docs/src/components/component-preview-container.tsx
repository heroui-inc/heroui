"use client";

import type {HighlightedDemoCode} from "./demo-controls";
import type {DemoControlValue, DemoControlValues, DemoControls} from "@/lib/demo-controls";

import React, {useCallback, useEffect, useId, useMemo, useRef, useState} from "react";

import {
  getChangedProps,
  getInitialControlValues,
  renderDemoSource,
  setControlValue,
} from "@/lib/demo-controls";
import {cn} from "@/utils/cn";

import {DemoControlsCode, DemoControlsPanel, DemoControlsToggle} from "./demo-controls";

/** Block `href="#"` in previews so placeholder links don't scroll the docs page. */
const preventPlaceholderHashNavigation = (event: React.MouseEvent<HTMLDivElement>) => {
  const anchor = (event.target as HTMLElement).closest("a");

  if (!anchor) return;

  const href = anchor.getAttribute("href");

  if (href === "#") {
    event.preventDefault();
  }
};

interface ComponentPreviewContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  minHeight?: string;
  /** @deprecated The stage always uses the page background now. */
  isBgSolid?: boolean;
  description?: string;
  hideCode?: boolean;
  name: string;
  /** Prop controls; the single child is the demo, which receives the changed props. */
  controls?: DemoControls;
  /** Raw demo source, re-rendered for the current control values. */
  source?: string;
  /** Server-highlighted code for the initial control values. */
  initialCode?: HighlightedDemoCode;
}

export function ComponentPreviewContainer({
  align = "center",
  children,
  className,
  controls,
  description,
  hideCode = false,
  initialCode,
  isBgSolid: _isBgSolid,
  minHeight,
  name,
  source,
  style,
  ...props
}: React.PropsWithChildren<ComponentPreviewContainerProps>) {
  const [Demo, StaticCode] = React.Children.toArray(children) as React.ReactElement[];

  // Controls state lives here, above the off-screen unmount, so values survive scrolling.
  const controlsId = useId();
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [values, setValues] = useState<DemoControlValues>(() =>
    controls ? getInitialControlValues(controls) : {},
  );
  const initialValues = useMemo(
    () => (controls ? getInitialControlValues(controls) : {}),
    [controls],
  );
  const setValue = useCallback(
    (prop: string, value: DemoControlValue) => {
      setValues((current) =>
        controls ? setControlValue(controls, current, prop, value) : {...current, [prop]: value},
      );
    },
    [controls],
  );
  const resetValues = useCallback(() => setValues(initialValues), [initialValues]);
  const isDirty = Object.keys(values).some((prop) => values[prop] !== initialValues[prop]);
  const changedProps = useMemo(
    () => (controls ? getChangedProps(controls, values) : undefined),
    [controls, values],
  );
  const liveCode = useMemo(
    () => (controls && source ? renderDemoSource(source, controls, values) : undefined),
    [controls, source, values],
  );

  const Component = changedProps && Demo ? React.cloneElement(Demo, changedProps) : Demo;
  const Code =
    liveCode == null ? StaticCode : <DemoControlsCode code={liveCode} initial={initialCode} />;
  const showCode = !hideCode && !!Code;

  const alignmentClasses = {
    center: "items-center justify-center",
    end: "items-end justify-end",
    start: "items-start justify-start",
  };

  const shouldPreventNavigation = useMemo(() => {
    return ["breadcrumbs-", "card-", "link-"].some((pattern) => name.includes(pattern));
  }, [name]);
  const containerRef = useRef<HTMLDivElement>(null);
  // Off-screen examples stay mounted otherwise. Opening a menu marks the rest
  // of the page inert, and WebKit then styles every preview before the popover
  // can paint. Storybook only has the one open example, so it toggles immediately.
  const [showContent, setShowContent] = useState(true);
  const [reservedHeight, setReservedHeight] = useState<number>();

  useEffect(() => {
    const element = containerRef.current;

    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setShowContent(true);

          return;
        }

        const height = Math.ceil(entry.boundingClientRect.height);

        if (height <= 0) return;

        setReservedHeight(height);
        setShowContent(false);
      },
      {rootMargin: "600px 0px"},
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn("component-preview-container group relative my-6 w-full", className)}
      data-name={name}
      {...props}
      ref={containerRef}
      style={{
        ...style,
        contain: style?.contain ?? "content",
        ...(reservedHeight != null ? {minHeight: reservedHeight} : null),
      }}
    >
      {showContent ? (
        <>
          {!!description && (
            <p className="mb-3 text-sm leading-5 text-(--docs-fg-muted)">{description}</p>
          )}

          {/* The stage sits on the page background; the code (and its fade) on the frame. */}
          <div className="demo-frame flex flex-col rounded-[20px] bg-(--docs-demo) p-2 [--docs-code:var(--docs-demo)]">
            {/* Preview Section */}
            <div
              data-controls-open={isControlsOpen || undefined}
              data-name={name}
              className={cn(
                "preview not-prose relative flex min-h-[220px] w-full overflow-hidden rounded-[14px] bg-background",
                !controls && ["p-4 sm:p-8", alignmentClasses[align]],
              )}
              onClickCapture={
                shouldPreventNavigation ? preventPlaceholderHashNavigation : undefined
              }
            >
              {controls ? (
                <>
                  {/*
                   * From md, the demo and the panel share one grid cell: the closed panel still
                   * sizes the stage, so opening it never moves the content below.
                   */}
                  <div className="docs-demo-stage w-full">
                    <div
                      className={cn(
                        "docs-demo-stage__demo flex min-w-0 p-4 sm:p-8",
                        alignmentClasses[align],
                      )}
                    >
                      <div className="flex w-full items-center justify-center" style={{minHeight}}>
                        {Component}
                      </div>
                    </div>
                    <DemoControlsPanel
                      className="docs-demo-stage__panel"
                      controls={controls}
                      id={controlsId}
                      isDirty={isDirty}
                      isOpen={isControlsOpen}
                      values={values}
                      onChange={setValue}
                      onReset={resetValues}
                    />
                  </div>
                  <DemoControlsToggle
                    controlsId={controlsId}
                    isOpen={isControlsOpen}
                    onToggle={() => setIsControlsOpen((open) => !open)}
                  />
                </>
              ) : (
                <div className="flex w-full items-center justify-center" style={{minHeight}}>
                  {Component}
                </div>
              )}
            </div>

            {/* Code Section */}
            {showCode ? (
              <div className="code-section relative overflow-hidden rounded-b-[14px]">{Code}</div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

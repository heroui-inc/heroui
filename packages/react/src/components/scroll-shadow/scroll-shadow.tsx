"use client";

import type {ScrollShadowVariants} from "./scroll-shadow.styles";
import type {RefObject} from "react";

import {mergeRefs} from "@react-aria/utils";
import {useMemo, useRef} from "react";

import {useSafeLayoutEffect} from "../../hooks/use-safe-layout-effect";

import {scrollShadowVariants} from "./scroll-shadow.styles";
import {useScrollShadow} from "./use-scroll-shadow";

export type ScrollShadowVisibility = "auto" | "both" | "top" | "bottom" | "left" | "right" | "none";

export interface ScrollShadowRootProps
  extends Omit<React.ComponentProps<"div">, "size">, ScrollShadowVariants {
  /**
   * The shadow size in pixels
   * @default 40
   */
  size?: number;

  /**
   * The scroll offset before showing shadows (in pixels)
   * @default 0
   */
  offset?: number;

  /**
   * Controlled shadow visibility state
   * @default "auto"
   */
  visibility?: ScrollShadowVisibility;

  /**
   * Whether scroll shadow detection is enabled
   * @default true
   */
  isEnabled?: boolean;

  /**
   * Callback invoked when shadow visibility changes
   */
  onVisibilityChange?: (visibility: ScrollShadowVisibility) => void;
}

export const ScrollShadowRoot = ({
  children,
  className,
  hideScrollBar = false,
  isEnabled = true,
  offset = 0,
  onVisibilityChange,
  orientation = "vertical",
  ref,
  size = 40,
  variant = "fade",
  visibility = "auto",
  ...props
}: ScrollShadowRootProps) => {
  const internalRef = useRef<HTMLDivElement | null>(null);

  useScrollShadow({
    containerRef: internalRef as RefObject<HTMLElement>,
    isEnabled,
    offset,
    onVisibilityChange,
    orientation,
    visibility,
  });

  // Handle controlled visibility mode
  useSafeLayoutEffect(() => {
    const el = internalRef.current;

    if (!el || visibility === "auto") return;

    // Clear all data attributes
    delete el.dataset["topScroll"];
    delete el.dataset["bottomScroll"];
    delete el.dataset["topBottomScroll"];
    delete el.dataset["leftScroll"];
    delete el.dataset["rightScroll"];
    delete el.dataset["leftRightScroll"];

    // Set controlled visibility
    if (visibility === "both") {
      el.dataset[orientation === "vertical" ? "topBottomScroll" : "leftRightScroll"] = "true";
    } else if (visibility !== "none") {
      el.dataset[`${visibility}Scroll`] = "true";
    }
  }, [visibility, orientation]);

  const slots = useMemo(
    () =>
      scrollShadowVariants({
        hideScrollBar,
        orientation,
        variant,
      }),
    [orientation, hideScrollBar, variant],
  );

  return (
    <div
      ref={mergeRefs(internalRef, ref)}
      className={slots.base({className})}
      data-orientation={orientation}
      data-scroll-shadow-size={size}
      style={{
        // @ts-expect-error - CSS variables are not typed
        "--scroll-shadow-size": `${size}px`,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

ScrollShadowRoot.displayName = "HeroUI.ScrollShadow";

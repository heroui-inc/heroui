"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SkeletonVariants} from "@heroui/styles";

import {skeletonVariants} from "@heroui/styles";
import React from "react";

import {useCSSVariable} from "../../hooks/use-css-variable";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Skeleton Root
 * -----------------------------------------------------------------------------------------------*/
interface SkeletonRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
  /** Animation type. */
  animationType?: SkeletonVariants["animationType"];
}

const SkeletonRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  animationType,
  className,
  ...props
}: SkeletonRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SkeletonRootProps<E>>) => {
  // Use the new hook to get CSS variable value with SSR support
  const resolvedAnimationType = useCSSVariable("--skeleton-animation", animationType);
  const slots = React.useMemo(
    () =>
      skeletonVariants({
        animationType: resolvedAnimationType as SkeletonVariants["animationType"],
      }),
    [resolvedAnimationType],
  );

  return <dom.div className={slots.base({className})} {...(props as any)} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SkeletonRoot};

export type {SkeletonRootProps};

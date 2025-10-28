"use client";

import type {SkeletonVariants} from "./skeleton.styles.js";

import React from "react";

import {useCSSVariable} from "../../hooks/use-css-variable.js";

import {skeletonVariants} from "./skeleton.styles.js";
/* -------------------------------------------------------------------------------------------------
 * Skeleton
 * -----------------------------------------------------------------------------------------------*/
interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    SkeletonVariants {}

const Skeleton = ({animationType, className, ...props}: SkeletonProps) => {
  // Use the new hook to get CSS variable value with SSR support
  const resolvedAnimationType = useCSSVariable("--skeleton-animation", animationType);
  const slots = React.useMemo(
    () =>
      skeletonVariants({
        animationType: resolvedAnimationType as SkeletonVariants["animationType"],
      }),
    [resolvedAnimationType],
  );

  return <div className={slots.base({className})} {...props} />;
};

export type {SkeletonProps};
export {Skeleton};

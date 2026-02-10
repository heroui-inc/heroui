"use client";

import type {SkeletonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {skeletonVariants} from "@heroui/styles";
import React from "react";

import {useCSSVariable} from "../../hooks/use-css-variable";

/* -------------------------------------------------------------------------------------------------
 * Skeleton Root
 * -----------------------------------------------------------------------------------------------*/
interface SkeletonRootProps
  extends Omit<ComponentPropsWithRef<"div">, "children">, SkeletonVariants {}

const SkeletonRoot = ({animationType, className, ...props}: SkeletonRootProps) => {
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

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SkeletonRoot};

export type {SkeletonRootProps};

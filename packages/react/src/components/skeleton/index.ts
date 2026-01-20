import type {ComponentProps} from "react";

import {SkeletonRoot} from "./skeleton";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Skeleton = Object.assign(SkeletonRoot, {
  Root: SkeletonRoot,
});

export type Skeleton = {
  Props: ComponentProps<typeof SkeletonRoot>;
  RootProps: ComponentProps<typeof SkeletonRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SkeletonRoot};

export type {SkeletonRootProps, SkeletonRootProps as SkeletonProps} from "./skeleton";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {skeletonVariants} from "@heroui/styles";

export type {SkeletonVariants} from "@heroui/styles";

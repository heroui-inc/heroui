import type {ComponentProps} from "react";

import {EmptyStateRoot} from "./empty-state";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const EmptyState = Object.assign(EmptyStateRoot, {
  Root: EmptyStateRoot,
});

export type EmptyState = {
  Props: ComponentProps<typeof EmptyStateRoot>;
  RootProps: ComponentProps<typeof EmptyStateRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {EmptyStateRoot};

export type {EmptyStateRootProps, EmptyStateRootProps as EmptyStateProps} from "./empty-state";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {emptyStateVariants} from "@heroui/styles";

export type {EmptyStateVariants} from "@heroui/styles";

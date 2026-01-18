import type {ComponentProps} from "react";

import {SurfaceRoot} from "./surface";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Surface = Object.assign(SurfaceRoot, {
  Root: SurfaceRoot,
});

export type Surface = {
  Props: ComponentProps<typeof SurfaceRoot>;
  RootProps: ComponentProps<typeof SurfaceRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SurfaceRoot} from "./surface";

export type {SurfaceRootProps, SurfaceRootProps as SurfaceProps} from "./surface";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {SurfaceContext} from "./surface";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {surfaceVariants} from "@heroui/styles";

export type {SurfaceVariants} from "@heroui/styles";

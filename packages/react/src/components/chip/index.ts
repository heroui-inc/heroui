import type {ComponentProps} from "react";

import {ChipRoot} from "./chip";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Chip = Object.assign(ChipRoot, {
  Root: ChipRoot,
});

export type Chip = {
  Props: ComponentProps<typeof ChipRoot>;
  RootProps: ComponentProps<typeof ChipRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ChipRoot};

export type {ChipRootProps, ChipRootProps as ChipProps} from "./chip";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {chipVariants} from "@heroui/styles";

export type {ChipVariants} from "@heroui/styles";

import type {ComponentProps} from "react";

import {ChipLabel, ChipRoot} from "./chip";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Chip = Object.assign(ChipRoot, {
  Root: ChipRoot,
  Label: ChipLabel,
});

export type Chip = {
  Props: ComponentProps<typeof ChipRoot>;
  RootProps: ComponentProps<typeof ChipRoot>;
  LabelProps: ComponentProps<typeof ChipLabel>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ChipRoot, ChipLabel};

export type {ChipRootProps, ChipRootProps as ChipProps, ChipLabelProps} from "./chip";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {chipVariants} from "@heroui/styles";

export type {ChipVariants} from "@heroui/styles";

import type {ComponentProps} from "react";

import {SwitchContent, SwitchControl, SwitchIcon, SwitchRoot, SwitchThumb} from "./switch";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  Content: SwitchContent,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Icon: SwitchIcon,
});

export type Switch = {
  Props: ComponentProps<typeof SwitchRoot>;
  RootProps: ComponentProps<typeof SwitchRoot>;
  ContentProps: ComponentProps<typeof SwitchContent>;
  ControlProps: ComponentProps<typeof SwitchControl>;
  ThumbProps: ComponentProps<typeof SwitchThumb>;
  IconProps: ComponentProps<typeof SwitchIcon>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SwitchRoot, SwitchContent, SwitchControl, SwitchIcon, SwitchThumb};

export type {
  SwitchRootProps,
  SwitchRootProps as SwitchProps,
  SwitchContentProps,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchIconProps,
} from "./switch";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {switchVariants} from "@heroui/styles";

export type {SwitchVariants} from "@heroui/styles";

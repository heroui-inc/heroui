import type {ComponentProps} from "react";

import {RadioContent, RadioControl, RadioIndicator, RadioRoot} from "./radio";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Radio = Object.assign(RadioRoot, {
  Root: RadioRoot,
  Control: RadioControl,
  Indicator: RadioIndicator,
  Content: RadioContent,
});

export type Radio = {
  Props: ComponentProps<typeof RadioRoot>;
  RootProps: ComponentProps<typeof RadioRoot>;
  ControlProps: ComponentProps<typeof RadioControl>;
  IndicatorProps: ComponentProps<typeof RadioIndicator>;
  ContentProps: ComponentProps<typeof RadioContent>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {RadioContent, RadioControl, RadioIndicator, RadioRoot};

export type {
  RadioRootProps,
  RadioRootProps as RadioProps,
  RadioControlProps,
  RadioIndicatorProps,
  RadioContentProps,
} from "./radio";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {radioVariants} from "./radio.styles";

export type {RadioVariants} from "./radio.styles";

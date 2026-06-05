import type {ComponentProps} from "react";

import {RadioButtonRoot, RadioControl, RadioIndicator, RadioRoot} from "./radio";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Radio = Object.assign(RadioRoot, {
  Root: RadioRoot,
  Button: RadioButtonRoot,
  Control: RadioControl,
  Indicator: RadioIndicator,
});

export type Radio = {
  Props: ComponentProps<typeof RadioRoot>;
  RootProps: ComponentProps<typeof RadioRoot>;
  ButtonProps: ComponentProps<typeof RadioButtonRoot>;
  ControlProps: ComponentProps<typeof RadioControl>;
  IndicatorProps: ComponentProps<typeof RadioIndicator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {RadioButtonRoot, RadioControl, RadioIndicator, RadioRoot};

export {RadioButtonContext, RadioFieldIdContext} from "./radio";

export type {
  RadioRootProps,
  RadioRootProps as RadioProps,
  RadioButtonRootProps,
  RadioControlProps,
  RadioIndicatorProps,
  RadioFieldRenderProps,
  RadioButtonRenderProps,
} from "./radio";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {radioVariants} from "@heroui/styles";

export type {RadioVariants} from "@heroui/styles";

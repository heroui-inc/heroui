import type {ComponentProps} from "react";

import {ToolbarRoot} from "./toolbar";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Toolbar = Object.assign(ToolbarRoot, {
  Root: ToolbarRoot,
});

export type Toolbar = {
  Props: ComponentProps<typeof ToolbarRoot>;
  RootProps: ComponentProps<typeof ToolbarRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ToolbarRoot} from "./toolbar";

export type {ToolbarRootProps, ToolbarRootProps as ToolbarProps} from "./toolbar";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {toolbarVariants} from "@heroui/styles";

export type {ToolbarVariants} from "@heroui/styles";

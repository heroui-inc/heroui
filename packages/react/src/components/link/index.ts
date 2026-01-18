import type {ComponentProps} from "react";

import {LinkIcon, LinkRoot} from "./link";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Link = Object.assign(LinkRoot, {
  Root: LinkRoot,
  Icon: LinkIcon,
});

export type Link = {
  Props: ComponentProps<typeof LinkRoot>;
  RootProps: ComponentProps<typeof LinkRoot>;
  IconProps: ComponentProps<typeof LinkIcon>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {LinkRoot, LinkIcon};

export type {LinkRootProps, LinkIconProps, LinkRootProps as LinkProps} from "./link";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {linkVariants} from "@heroui/styles";

export type {LinkVariants} from "@heroui/styles";

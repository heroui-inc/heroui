import type {ComponentProps} from "react";

import {BadgeAnchor, BadgeLabel, BadgeRoot} from "./badge";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Badge = Object.assign(BadgeRoot, {
  Anchor: BadgeAnchor,
  Label: BadgeLabel,
  Root: BadgeRoot,
});

export type Badge = {
  AnchorProps: ComponentProps<typeof BadgeAnchor>;
  LabelProps: ComponentProps<typeof BadgeLabel>;
  Props: ComponentProps<typeof BadgeRoot>;
  RootProps: ComponentProps<typeof BadgeRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {BadgeRoot, BadgeLabel, BadgeAnchor};

export type {
  BadgeRootProps,
  BadgeRootProps as BadgeProps,
  BadgeLabelProps,
  BadgeAnchorProps,
} from "./badge";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {badgeVariants} from "@heroui/styles";

export type {BadgeVariants} from "@heroui/styles";

import type {ComponentProps} from "react";

import {AvatarGroupCount, AvatarGroupRoot} from "./avatar-group";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const AvatarGroup = Object.assign(AvatarGroupRoot, {
  Root: AvatarGroupRoot,
  Count: AvatarGroupCount,
});

export type AvatarGroup = {
  Props: ComponentProps<typeof AvatarGroupRoot>;
  RootProps: ComponentProps<typeof AvatarGroupRoot>;
  CountProps: ComponentProps<typeof AvatarGroupCount>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {AvatarGroupRoot, AvatarGroupCount};

export type {
  AvatarGroupRootProps,
  AvatarGroupRootProps as AvatarGroupProps,
  AvatarGroupCountProps,
} from "./avatar-group";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {AvatarGroupContext, AVATAR_GROUP_CHILD} from "./avatar-group";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {avatarGroupVariants} from "@heroui/styles";

export type {AvatarGroupVariants} from "@heroui/styles";

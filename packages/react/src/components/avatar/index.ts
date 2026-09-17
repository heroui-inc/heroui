import type {ComponentProps} from "react";

import {AVATAR_GROUP_CHILD} from "../avatar-group/avatar-group-context";

import {AvatarFallback, AvatarImage, AvatarRoot} from "./avatar";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export type Avatar = {
  Props: ComponentProps<typeof AvatarRoot>;
  RootProps: ComponentProps<typeof AvatarRoot>;
  ImageProps: ComponentProps<typeof AvatarImage>;
  FallbackProps: ComponentProps<typeof AvatarFallback>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {AvatarRoot, AvatarImage, AvatarFallback};

export type {
  AvatarRootProps,
  AvatarRootProps as AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from "./avatar";

/* -------------------------------------------------------------------------------------------------
 * Re-export AVATAR_GROUP_CHILD for type declarations
 * -----------------------------------------------------------------------------------------------*/
export {AVATAR_GROUP_CHILD};

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {avatarVariants} from "@heroui/styles";

export type {AvatarVariants} from "@heroui/styles";

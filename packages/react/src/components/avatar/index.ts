import type {ComponentProps} from "react";

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
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {avatarVariants} from "@heroui/styles";

export type {AvatarVariants} from "@heroui/styles";

import {AvatarFallback, AvatarImage, AvatarRoot} from "./avatar";

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export {AvatarRoot, AvatarImage, AvatarFallback};
export type {
  AvatarRootProps,
  AvatarRootProps as AvatarProps,
  AvatarFallbackProps,
  AvatarImageProps,
} from "./avatar";

export {avatarVariants} from "./avatar.styles";
export type {AvatarVariants} from "./avatar.styles";

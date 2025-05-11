"use client";

import type {AvatarVariants} from "./avatar.styles";
import type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps as AvatarPrimitiveProps,
} from "@radix-ui/react-avatar";

import {
  Fallback as AvatarFallbackPrimitive,
  Image as AvatarImagePrimitive,
  Root as AvatarRootPrimitive,
} from "@radix-ui/react-avatar";
import React, {createContext} from "react";

import {avatarVariants} from "./avatar.styles";

const AvatarContext = createContext<{slots?: ReturnType<typeof avatarVariants>}>({});

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/

interface AvatarProps extends Omit<AvatarPrimitiveProps, "color">, AvatarVariants {}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarRootPrimitive>, AvatarProps>(
  ({children, className, color, size, ...props}, ref) => {
    const slots = React.useMemo(() => avatarVariants({color, size}), [color, size]);

    return (
      <AvatarContext.Provider value={{slots}}>
        <AvatarRootPrimitive ref={ref} className={slots.base({className})} {...props}>
          {children}
        </AvatarRootPrimitive>
      </AvatarContext.Provider>
    );
  },
);

Avatar.displayName = "HeroUI.Avatar";

/* -----------------------------------------------------------------------------------------------*/

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarImagePrimitive>,
  React.ComponentPropsWithoutRef<typeof AvatarImagePrimitive>
>(({className, ...props}, ref) => {
  const {slots} = React.useContext(AvatarContext);

  return <AvatarImagePrimitive ref={ref} className={slots?.image({className})} {...props} />;
});

AvatarImage.displayName = "HeroUI.AvatarImage";

/* -----------------------------------------------------------------------------------------------*/

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarFallbackPrimitive>,
  React.ComponentPropsWithoutRef<typeof AvatarFallbackPrimitive> & {color?: AvatarVariants["color"]}
>(({className, color, ...props}, ref) => {
  const {slots} = React.useContext(AvatarContext);

  return (
    <AvatarFallbackPrimitive ref={ref} className={slots?.fallback({className, color})} {...props} />
  );
});

AvatarFallback.displayName = "HeroUI.AvatarFallback";

/* -----------------------------------------------------------------------------------------------*/

const Root = Avatar;
const Image = AvatarImage;
const Fallback = AvatarFallback;

export {Root, Image, Fallback};

export type {AvatarProps, AvatarImageProps, AvatarFallbackProps};

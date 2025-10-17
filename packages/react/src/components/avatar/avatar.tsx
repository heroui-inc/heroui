"use client";

import type {AvatarVariants} from "./avatar.styles";
import type {UseImageProps} from "../../hooks";
import type {
  AvatarFallbackProps,
  Image as AvatarImagePrimitive,
  AvatarImageProps,
  AvatarProps as AvatarPrimitiveProps,
} from "@radix-ui/react-avatar";

import {
  Fallback as AvatarFallbackPrimitive,
  Root as AvatarRootPrimitive,
} from "@radix-ui/react-avatar";
import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext} from "react";

import {useImage} from "../../hooks";
import {dataAttr} from "../../utils/assertion";

import {avatarVariants} from "./avatar.styles";

const AvatarContext = createContext<{
  slots?: ReturnType<typeof avatarVariants>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/

interface AvatarRootProps extends Omit<AvatarPrimitiveProps, "color">, AvatarVariants {}

const AvatarRoot = React.forwardRef<
  React.ComponentRef<typeof AvatarRootPrimitive>,
  AvatarRootProps
>(({children, className, color, size, ...props}, ref) => {
  const slots = React.useMemo(() => avatarVariants({color, size}), [color, size]);

  return (
    <AvatarContext.Provider value={{slots}}>
      <AvatarRootPrimitive ref={ref} className={slots.base({className})} {...props}>
        {children}
      </AvatarRootPrimitive>
    </AvatarContext.Provider>
  );
});

AvatarRoot.displayName = "HeroUI.AvatarRoot";

/* -----------------------------------------------------------------------------------------------*/

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarImagePrimitive>,
  React.ComponentPropsWithoutRef<typeof AvatarImagePrimitive> & {
    asChild?: boolean;
    ignoreFallback?: UseImageProps["ignoreFallback"];
    shouldBypassImageLoad?: UseImageProps["shouldBypassImageLoad"];
    onLoadingStatusChange?: UseImageProps["onLoadingStatusChange"];
  }
>(({asChild = false, className, ...props}, ref) => {
  const {slots} = React.useContext(AvatarContext);

  const Comp = asChild ? SlotPrimitive : "img";

  const loadingStatus = useImage(props);

  return (
    <Comp
      ref={ref}
      className={slots?.image({className})}
      data-loaded={dataAttr(loadingStatus === "loaded")}
      data-loading-status={loadingStatus}
      {...props}
    />
  );
});

AvatarImage.displayName = "HeroUI.AvatarImage";

/* -----------------------------------------------------------------------------------------------*/

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarFallbackPrimitive>,
  React.ComponentPropsWithoutRef<typeof AvatarFallbackPrimitive> & {color?: AvatarVariants["color"]}
>(({className, color, ...props}, ref) => {
  const {slots} = React.useContext(AvatarContext);

  return (
    <AvatarFallbackPrimitive ref={ref} className={slots?.fallback({className, color})} {...props} />
  );
});

AvatarFallback.displayName = "HeroUI.AvatarFallback";

/* -----------------------------------------------------------------------------------------------*/

export {AvatarRoot, AvatarImage, AvatarFallback};
export type {AvatarRootProps, AvatarImageProps, AvatarFallbackProps};

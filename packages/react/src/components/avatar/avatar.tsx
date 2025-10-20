"use client";

import type {AvatarVariants} from "./avatar.styles";
import type {UseImageProps} from "../../hooks";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
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
interface AvatarProps
  extends Omit<React.ComponentProps<typeof AvatarPrimitive.Root>, "color">,
    AvatarVariants {}
const Avatar = ({children, className, color, size, ...props}: AvatarProps) => {
  const slots = React.useMemo(() => avatarVariants({color, size}), [color, size]);

  return (
    <AvatarContext value={{slots}}>
      <AvatarPrimitive.Root className={slots.base({className})} {...props}>
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Avatar Image
 * -----------------------------------------------------------------------------------------------*/
interface AvatarImageProps
  extends Omit<React.ComponentProps<typeof AvatarPrimitive.Image>, "onLoadingStatusChange"> {
  asChild?: boolean;
  ignoreFallback?: UseImageProps["ignoreFallback"];
  shouldBypassImageLoad?: UseImageProps["shouldBypassImageLoad"];
  onLoadingStatusChange?: UseImageProps["onLoadingStatusChange"];
}
const AvatarImage = ({
  asChild = false,
  className,
  crossOrigin,
  ignoreFallback,
  loading,
  onError,
  onLoad,
  onLoadingStatusChange,
  shouldBypassImageLoad,
  sizes,
  src,
  srcSet,
  ...props
}: AvatarImageProps) => {
  const {slots} = React.useContext(AvatarContext);
  const Comp = asChild ? SlotPrimitive : AvatarPrimitive.Image;
  const loadingStatus = useImage({
    src: typeof src === "string" ? src : undefined,
    srcSet,
    sizes,
    crossOrigin,
    loading,
    onLoad,
    onError,
    ignoreFallback,
    shouldBypassImageLoad,
    onLoadingStatusChange,
  });

  return (
    <Comp
      className={slots?.image({className})}
      crossOrigin={crossOrigin}
      data-loaded={dataAttr(loadingStatus === "loaded")}
      data-loading-status={loadingStatus}
      loading={loading}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
      onError={onError}
      onLoad={onLoad}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Avatar Fallback
 * -----------------------------------------------------------------------------------------------*/
interface AvatarFallbackProps extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {
  color?: AvatarVariants["color"];
}
const AvatarFallback = ({className, color, ...props}: AvatarFallbackProps) => {
  const {slots} = React.useContext(AvatarContext);

  return <AvatarPrimitive.Fallback className={slots?.fallback({className, color})} {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export type {AvatarProps, AvatarImageProps, AvatarFallbackProps};
export {Avatar, AvatarImage, AvatarFallback};

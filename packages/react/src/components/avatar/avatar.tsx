"use client";

import type {AvatarVariants} from "./avatar.styles";
import type {UseImageProps} from "../../hooks";
import type {ComponentPropsWithRef} from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext} from "react";

import {useImage} from "../../hooks";
import {dataAttr} from "../../utils/assertion";

import {avatarVariants} from "./avatar.styles";

/* ------------------------------------------------------------------------------------------------
 * Avatar Context
 * --------------------------------------------------------------------------------------------- */
type AvatarContext = {
  slots?: ReturnType<typeof avatarVariants>;
};

const AvatarContext = createContext<AvatarContext>({});

/* -------------------------------------------------------------------------------------------------
 * Avatar Root
 * -----------------------------------------------------------------------------------------------*/
interface AvatarRootProps
  extends Omit<ComponentPropsWithRef<typeof AvatarPrimitive.Root>, "color">, AvatarVariants {}

const AvatarRoot = ({children, className, color, size, variant, ...props}: AvatarRootProps) => {
  const slots = React.useMemo(() => avatarVariants({color, size, variant}), [color, size, variant]);

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
interface AvatarImageProps extends Omit<
  ComponentPropsWithRef<typeof AvatarPrimitive.Image>,
  "onLoadingStatusChange"
> {
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

  if (asChild) {
    return <Comp className={slots?.image({className})} {...props} data-loaded />;
  }

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
interface AvatarFallbackProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Fallback> {
  color?: AvatarVariants["color"];
}

const AvatarFallback = ({className, color, ...props}: AvatarFallbackProps) => {
  const {slots} = React.useContext(AvatarContext);

  return <AvatarPrimitive.Fallback className={slots?.fallback({className, color})} {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {AvatarRoot, AvatarImage, AvatarFallback};

export type {AvatarRootProps, AvatarImageProps, AvatarFallbackProps};

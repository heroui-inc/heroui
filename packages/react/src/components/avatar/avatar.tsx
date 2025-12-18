"use client";

import type {AvatarVariants} from "./avatar.styles";
import type {ComponentPropsWithRef} from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React, {createContext} from "react";

import {composeSlotClassName} from "../../utils/compose";

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
interface AvatarImageProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Image> {}

const AvatarImage = ({
  className,
  crossOrigin,
  loading,
  onError,
  onLoad,
  sizes,
  src,
  srcSet,
  ...props
}: AvatarImageProps) => {
  const {slots} = React.useContext(AvatarContext);

  return (
    <AvatarPrimitive.Image
      className={composeSlotClassName(slots?.image, className)}
      crossOrigin={crossOrigin}
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

  return (
    <AvatarPrimitive.Fallback
      className={composeSlotClassName(slots?.fallback, className, {color})}
      data-slot="avatar-fallback"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {AvatarRoot, AvatarImage, AvatarFallback};

export type {AvatarRootProps, AvatarImageProps, AvatarFallbackProps};

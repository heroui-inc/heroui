"use client";

import type {AvatarVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {avatarVariants} from "@heroui/styles";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React, {createContext, memo, useContext, useMemo} from "react";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

/* ------------------------------------------------------------------------------------------------
 * Avatar Context
 * --------------------------------------------------------------------------------------------- */
type AvatarContext = {
  imageClassName?: string;
  slots?: ReturnType<typeof avatarVariants>;
};

const AvatarContext = createContext<AvatarContext>({});

/* -------------------------------------------------------------------------------------------------
 * Avatar Root
 * -----------------------------------------------------------------------------------------------*/
interface AvatarRootProps
  extends Omit<ComponentPropsWithRef<typeof AvatarPrimitive.Root>, "color">, AvatarVariants {}

const AvatarRoot = memo(function AvatarRoot({
  children,
  className,
  color,
  size,
  variant,
  ...props
}: AvatarRootProps) {
  const slots = useMemo(() => avatarVariants({color, size, variant}), [color, size, variant]);
  const contextValue = useMemo<AvatarContext>(
    () => ({
      imageClassName: slots.image(),
      slots,
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  return (
    <AvatarContext value={contextValue}>
      <AvatarPrimitive.Root className={resolvedClassName} {...props}>
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Avatar Image
 * -----------------------------------------------------------------------------------------------*/
interface AvatarImageProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Image> {}

const AvatarImage = memo(function AvatarImage({
  className,
  crossOrigin,
  loading,
  onError,
  onLoad,
  sizes,
  src,
  srcSet,
  ...props
}: AvatarImageProps) {
  const {imageClassName} = useContext(AvatarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, imageClassName) as string,
    [className, imageClassName],
  );

  return (
    <AvatarPrimitive.Image
      className={resolvedClassName}
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
});

/* -------------------------------------------------------------------------------------------------
 * Avatar Fallback
 * -----------------------------------------------------------------------------------------------*/
interface AvatarFallbackProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Fallback> {
  color?: AvatarVariants["color"];
}

const AvatarFallback = memo(function AvatarFallback({
  className,
  color,
  ...props
}: AvatarFallbackProps) {
  const {slots} = useContext(AvatarContext);

  return (
    <AvatarPrimitive.Fallback
      className={composeSlotClassName(slots?.fallback, className, {color})}
      data-slot="avatar-fallback"
      {...props}
    />
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {AvatarRoot, AvatarImage, AvatarFallback};

export type {AvatarRootProps, AvatarImageProps, AvatarFallbackProps};

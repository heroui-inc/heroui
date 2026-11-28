"use client";

import type {ImageLoadingStatus} from "../../utils/use-image-loading-status";
import type {AvatarVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {avatarVariants} from "@heroui/styles";
import React, {createContext, use} from "react";

import {useIsomorphicLayoutEffect} from "../../hooks/use-isomorphic-layout-effect";
import {composeSlotClassName} from "../../utils/compose";
import {Slot} from "../../utils/slot";
import {useImageLoadingStatus} from "../../utils/use-image-loading-status";
import {AVATAR_GROUP_CHILD, AvatarGroupContext} from "../avatar-group/avatar-group-context";

/* ------------------------------------------------------------------------------------------------
 * Avatar Context
 * --------------------------------------------------------------------------------------------- */
type AvatarContext = {
  slots?: ReturnType<typeof avatarVariants>;
  imageLoadingStatus: ImageLoadingStatus;
  setImageLoadingStatus: (status: ImageLoadingStatus) => void;
};

const AvatarContext = createContext<AvatarContext>({
  imageLoadingStatus: "idle",
  setImageLoadingStatus: () => {},
});

/* -------------------------------------------------------------------------------------------------
 * Avatar Root
 * -----------------------------------------------------------------------------------------------*/
interface AvatarRootProps extends Omit<ComponentPropsWithRef<"span">, "color">, AvatarVariants {
  /** Render the child element instead of a `span`, merging props into it. */
  asChild?: boolean;
  [AVATAR_GROUP_CHILD]?: boolean;
}

const AvatarRoot = ({
  asChild,
  children,
  className,
  color,
  size,
  variant,
  [AVATAR_GROUP_CHILD]: isAvatarGroupChild,
  ...props
}: AvatarRootProps) => {
  const avatarGroupContext = use(AvatarGroupContext);

  // Only use group context when this avatar is a direct child of AvatarGroup
  const shouldUseContext = isAvatarGroupChild === true;

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? (shouldUseContext ? avatarGroupContext?.size : undefined);
  const finalColor = color ?? (shouldUseContext ? avatarGroupContext?.color : undefined);
  const finalVariant = variant ?? (shouldUseContext ? avatarGroupContext?.variant : undefined);

  const slots = React.useMemo(
    () => avatarVariants({color: finalColor, size: finalSize, variant: finalVariant}),
    [finalColor, finalSize, finalVariant],
  );
  const [imageLoadingStatus, setImageLoadingStatus] = React.useState<ImageLoadingStatus>("idle");
  const contextValue = React.useMemo(
    () => ({imageLoadingStatus, setImageLoadingStatus, slots}),
    [imageLoadingStatus, slots],
  );
  const Component = asChild ? Slot : "span";

  return (
    <AvatarContext value={contextValue}>
      <Component className={slots.base({className})} {...props}>
        {children}
      </Component>
    </AvatarContext>
  );
};

AvatarRoot.displayName = "HeroUI.Avatar";

/* -------------------------------------------------------------------------------------------------
 * Avatar Image
 * -----------------------------------------------------------------------------------------------*/
interface AvatarImageProps extends ComponentPropsWithRef<"img"> {
  /** Render the child element instead of an `img`, merging props into it. */
  asChild?: boolean;
  /** Called when the image loading status changes. */
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

const AvatarImage = ({
  asChild,
  className,
  crossOrigin,
  onLoadingStatusChange,
  referrerPolicy,
  src,
  ...props
}: AvatarImageProps) => {
  const {setImageLoadingStatus, slots} = React.use(AvatarContext);
  const imageLoadingStatus = useImageLoadingStatus(src, {crossOrigin, referrerPolicy});

  // Share the status with `Avatar.Fallback`, which hides once the image loads.
  useIsomorphicLayoutEffect(() => {
    setImageLoadingStatus(imageLoadingStatus);

    return () => setImageLoadingStatus("idle");
  }, [imageLoadingStatus, setImageLoadingStatus]);

  const previousStatusRef = React.useRef(imageLoadingStatus);

  useIsomorphicLayoutEffect(() => {
    if (previousStatusRef.current === imageLoadingStatus) return;

    previousStatusRef.current = imageLoadingStatus;
    onLoadingStatusChange?.(imageLoadingStatus);
  }, [imageLoadingStatus, onLoadingStatusChange]);

  if (imageLoadingStatus !== "loaded") return null;

  const Component = asChild ? Slot : "img";

  return (
    <Component
      className={composeSlotClassName(slots?.image, className)}
      crossOrigin={crossOrigin}
      referrerPolicy={referrerPolicy}
      src={src}
      {...props}
    />
  );
};

AvatarImage.displayName = "HeroUI.Avatar.Image";

/* -------------------------------------------------------------------------------------------------
 * Avatar Fallback
 * -----------------------------------------------------------------------------------------------*/
interface AvatarFallbackProps extends ComponentPropsWithRef<"span"> {
  /** Render the child element instead of a `span`, merging props into it. */
  asChild?: boolean;
  color?: AvatarVariants["color"];
  /** Wait this long before rendering, so fast-loading images never flash the fallback. */
  delayMs?: number;
}

const AvatarFallback = ({asChild, className, color, delayMs, ...props}: AvatarFallbackProps) => {
  const {imageLoadingStatus, slots} = React.use(AvatarContext);
  const [canRender, setCanRender] = React.useState(delayMs === undefined);

  React.useEffect(() => {
    if (delayMs === undefined) return;

    const timerId = window.setTimeout(() => setCanRender(true), delayMs);

    return () => window.clearTimeout(timerId);
  }, [delayMs]);

  if (!canRender || imageLoadingStatus === "loaded") return null;

  const Component = asChild ? Slot : "span";

  return (
    <Component
      className={composeSlotClassName(slots?.fallback, className, {color})}
      data-slot="avatar-fallback"
      {...props}
    />
  );
};

AvatarFallback.displayName = "HeroUI.Avatar.Fallback";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {AvatarRoot, AvatarImage, AvatarFallback};

export type {AvatarRootProps, AvatarImageProps, AvatarFallbackProps};

"use client";

import type {AvatarVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {avatarVariants} from "@heroui/styles";
import React, {createContext, use} from "react";

import {useIsomorphicLayoutEffect} from "../../hooks/use-isomorphic-layout-effect";
import {composeSlotClassName} from "../../utils/compose";
import {Slot} from "../../utils/slot";
import {AVATAR_GROUP_CHILD, AvatarGroupContext} from "../avatar-group/avatar-group-context";

/* ------------------------------------------------------------------------------------------------
 * Avatar Context
 * --------------------------------------------------------------------------------------------- */
type AvatarImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

type AvatarContext = {
  slots?: ReturnType<typeof avatarVariants>;
  imageLoadingStatus: AvatarImageLoadingStatus;
  setImageLoadingStatus: (status: AvatarImageLoadingStatus) => void;
};

const AvatarContext = createContext<AvatarContext>({
  imageLoadingStatus: "idle",
  setImageLoadingStatus: () => {},
});

const getImageLoadingStatus = (image: HTMLImageElement): AvatarImageLoadingStatus => {
  if (!image.complete) return "loading";

  return image.naturalWidth > 0 ? "loaded" : "error";
};

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
  const [imageLoadingStatus, setImageLoadingStatus] =
    React.useState<AvatarImageLoadingStatus>("idle");
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
  onLoadingStatusChange?: (status: AvatarImageLoadingStatus) => void;
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
  const {imageLoadingStatus, setImageLoadingStatus, slots} = React.use(AvatarContext);

  // Preload off-DOM so the `img` only mounts once it can paint; the fallback
  // stays visible until then.
  useIsomorphicLayoutEffect(() => {
    if (!src) {
      setImageLoadingStatus("error");

      return;
    }

    // Only URL strings can be preloaded; anything else React resolves itself.
    if (typeof src !== "string") {
      setImageLoadingStatus("loaded");

      return;
    }

    const image = new window.Image();
    const handleLoad = () => setImageLoadingStatus(getImageLoadingStatus(image));
    const handleError = () => setImageLoadingStatus("error");

    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);

    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }

    image.crossOrigin = crossOrigin ?? null;
    image.src = src;
    setImageLoadingStatus(getImageLoadingStatus(image));

    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
      setImageLoadingStatus("idle");
    };
  }, [src, crossOrigin, referrerPolicy, setImageLoadingStatus]);

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

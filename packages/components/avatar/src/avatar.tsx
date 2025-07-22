import type {UseAvatarProps} from "./use-avatar";

import {useMemo} from "react";
import {forwardRef} from "@heroui/system";

import {AvatarIcon} from "./avatar-icon";
import {useAvatar} from "./use-avatar";

export interface AvatarProps extends UseAvatarProps {}

const Avatar = forwardRef<"span", AvatarProps>((props, ref) => {
  const {
    Component,
    ImgComponent,
    src,
    icon = <AvatarIcon />,
    alt,
    classNames,
    slots,
    name,
    showFallback,
    imageStatus,
    fallback: fallbackComponent,
    getInitials,
    getAvatarProps,
    getImageProps,
  } = useAvatar({
    ...props,
    ref,
  });

  const fallback = useMemo(() => {
    // Don't show fallback if image is loaded successfully
    if (src && imageStatus === "loaded") return null;

    // Don't show fallback if showFallback is false and we have a src that's still loading
    if (!showFallback && src && imageStatus === "loading") return null;

    // Show fallback when image fails to load, regardless of showFallback prop
    if (src && imageStatus === "failed") {
      if (fallbackComponent) {
        return (
          <div
            aria-label={alt}
            className={slots.fallback({class: classNames?.fallback})}
            role="img"
          >
            {fallbackComponent}
          </div>
        );
      }

      return name ? (
        <span aria-label={alt} className={slots.name({class: classNames?.name})} role="img">
          {getInitials(name)}
        </span>
      ) : (
        <span aria-label={alt} className={slots.icon({class: classNames?.icon})} role="img">
          {icon}
        </span>
      );
    }

    // Show fallback for other cases (no src, loading with showFallback=true)
    if (fallbackComponent) {
      return (
        <div aria-label={alt} className={slots.fallback({class: classNames?.fallback})} role="img">
          {fallbackComponent}
        </div>
      );
    }

    return name ? (
      <span aria-label={alt} className={slots.name({class: classNames?.name})} role="img">
        {getInitials(name)}
      </span>
    ) : (
      <span aria-label={alt} className={slots.icon({class: classNames?.icon})} role="img">
        {icon}
      </span>
    );
  }, [showFallback, src, imageStatus, fallbackComponent, name, classNames]);

  return (
    <Component {...getAvatarProps()}>
      {src && <ImgComponent {...getImageProps()} alt={alt} />}
      {fallback}
    </Component>
  );
});

Avatar.displayName = "HeroUI.Avatar";

export default Avatar;

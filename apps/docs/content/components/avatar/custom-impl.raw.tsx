import type {AvatarProps as BaseAvatarProps} from "@heroui/react";

import {forwardRef, useMemo} from "react";
import {AvatarIcon, useAvatar} from "@heroui/react";

export interface AvatarProps extends BaseAvatarProps {}

const MyAvatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const {
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
    ref,
    ...props,
  });

  const fallback = useMemo(() => {
    // Don't show fallback if image is loaded successfully
    if (src && imageStatus === "loaded") return null;

    // Don't show fallback if showFallback is false and we have a src that's still loading
    if (!showFallback && src && imageStatus === "loading") return null;

    const ariaLabel = alt || name || "avatar";

    if (fallbackComponent) {
      return (
        <div
          aria-label={ariaLabel}
          className={slots.fallback({class: classNames?.fallback})}
          role="img"
        >
          {fallbackComponent}
        </div>
      );
    }

    return name ? (
      <span aria-label={ariaLabel} className={slots.name({class: classNames?.name})} role="img">
        {getInitials(name)}
      </span>
    ) : (
      <span aria-label={ariaLabel} className={slots.icon({class: classNames?.icon})} role="img">
        {icon}
      </span>
    );
  }, [showFallback, src, imageStatus, fallbackComponent, name, classNames]);

  return (
    <div {...getAvatarProps()}>
      {src && <img {...getImageProps()} alt={alt} />}
      {fallback}
    </div>
  );
});

MyAvatar.displayName = "MyAvatar";

export default MyAvatar;

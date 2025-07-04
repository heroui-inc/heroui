import type {UseImageProps} from "./use-image";

import {cloneElement} from "react";
import {forwardRef} from "@heroui/system";

import {useImage} from "./use-image";

export interface ImageProps extends Omit<UseImageProps, "showSkeleton"> {}

const Image = forwardRef<"img", ImageProps>((props, ref) => {
  const {
    Component,
    domRef,
    slots,
    classNames,
    isBlurred,
    isLoading,
    isFailed,
    isZoomed,
    loadingSrc,
    fallbackSrc,
    removeWrapper,
    disableSkeleton,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps,
    getLoadingImgProps,
    getFallbackImgProps,
  } = useImage({
    ...props,
    ref,
  });

  const img = <Component ref={domRef} {...getImgProps()} />;

  if (removeWrapper) {
    return img;
  }

  const zoomed = (
    <div className={slots.zoomedWrapper({class: classNames?.zoomedWrapper})}>{img}</div>
  );

  if (isBlurred) {
    // clone element to add isBlurred prop to the cloned image
    return (
      <div {...getWrapperProps()}>
        {isZoomed ? zoomed : img}
        {cloneElement(img, getBlurredImgProps())}
      </div>
    );
  }

  // when zoomed or showSkeleton, we need to wrap the image
  if (isZoomed || !disableSkeleton || loadingSrc || fallbackSrc) {
    return (
      <div
        {...getWrapperProps()}
        {...(isLoading && loadingSrc ? getLoadingImgProps() : {})}
        {...(isFailed && fallbackSrc ? getFallbackImgProps() : {})}
      >
        {isZoomed ? zoomed : img}
      </div>
    );
  }

  return img;
});

Image.displayName = "HeroUI.Image";

export default Image;

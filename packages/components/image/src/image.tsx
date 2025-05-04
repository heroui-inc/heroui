import {cloneElement} from "react";
import {forwardRef} from "@heroui/system";

import {UseImageProps, useImage} from "./use-image";

export interface ImageProps extends Omit<UseImageProps, "showSkeleton"> {}

const Image = forwardRef<"img", ImageProps>((props, ref) => {
  const {
    Component,
    domRef,
    slots,
    classNames,
    isBlurred,
    isZoomed,
    isError,
    fallbackSrc,
    removeWrapper,
    disableSkeleton,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps,
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

  if (isError && fallbackSrc) {
    const errorImgStyle =
      "relative z-10 shadow-black/5 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large";

    const errorImgWrapper = "relative shadow-black/5 shadow-none rounded-large w-max";

    return (
      <div className={errorImgWrapper}>
        <img alt={img.props.alt} className={errorImgStyle} src={fallbackSrc as string} />
      </div>
    );
  }

  // when zoomed or showSkeleton, we need to wrap the image
  if (isZoomed || !disableSkeleton || fallbackSrc) {
    return <div {...getWrapperProps()}> {isZoomed ? zoomed : img}</div>;
  }

  return img;
});

Image.displayName = "HeroUI.Image";

export default Image;

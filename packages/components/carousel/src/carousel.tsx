import {forwardRef} from "@heroui/system";
import {Button, ButtonProps} from "@heroui/button";
import {ChevronRightIcon, ChevronLeftIcon} from "@heroui/shared-icons";

import {UseCarouselProps, useCarousel} from "./use-carousel";
import {CarouselThumb} from "./carousel-thumb";

export interface CarouselProps extends UseCarouselProps {}

const Carousel = forwardRef<"div", CarouselProps>((props, ref) => {
  const {
    Component,
    children,
    slidesCount,
    slots,
    selected,
    thumbRadius,
    mainRef,
    thumbnailRef,
    onThumbClick,
    getBaseProps,
    getPrevSlideButtonProps,
    getNextSlideButtonProps,
    getIndicatorProps,
  } = useCarousel({...props, ref});

  return (
    <Component {...getBaseProps()}>
      <div className={slots.wrapper()}>
        <Button {...(getNextSlideButtonProps() as ButtonProps)}>
          <ChevronRightIcon className={slots.slideControlIcon()} />
        </Button>
        <Button {...(getPrevSlideButtonProps() as ButtonProps)}>
          <ChevronLeftIcon className={slots.slideControlIcon()} />
        </Button>

        <div ref={mainRef} className={slots.slideContainer()}>
          <div className={slots.slideWrapper()}>{children}</div>
        </div>

        <div className={slots.indicatorWrapper()}>
          {Array.from({length: slidesCount}).map((_, index) => (
            <button
              key={index}
              data-selected={selected === index}
              onClick={() => onThumbClick(index)}
              {...getIndicatorProps()}
            />
          ))}
        </div>
      </div>

      <div ref={thumbnailRef} className={slots.thumbnailContainer()}>
        <div className={slots.thumbnailWrapper()}>
          {Array.from({length: slidesCount}).map((_, index) => (
            <CarouselThumb
              key={index}
              index={index}
              radius={thumbRadius}
              selectedSlide={selected}
              onClick={() => {
                onThumbClick(index);
              }}
            />
          ))}
        </div>
      </div>
    </Component>
  );
});

Carousel.displayName = "NextUI.Carousel";

export default Carousel;

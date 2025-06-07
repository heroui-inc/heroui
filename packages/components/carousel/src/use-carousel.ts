import type {
  CarouselSlots,
  CarouselThumbVariantProps,
  CarouselVariantProps,
  SlotsToClasses,
} from "@heroui/theme";
import type {EmblaCarouselType} from "embla-carousel";

import {HTMLHeroUIProps, mapPropsVariants, PropGetter, useProviderContext} from "@heroui/system";
import {carousel} from "@heroui/theme";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {clsx, objectToDeps} from "@heroui/shared-utils";
import {ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The content of the carousel. Should be composed of CarouselItem components.
   */
  children: ReactNode;
  /**
   * The total number of slides in the carousel
   */
  slidesCount: number;
  /**
   * The border radius of the thumbnail items
   */
  thumbRadius?: CarouselThumbVariantProps["radius"];
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Carousel classNames={{
   *    base: "base-classes",
   *    wrapper: "wrapper-classes",
   *    slideContainer: "container-classes",
   *    slideWrapper: "slides-classes",
   *    thumbnailContainer: "thumbs-container-classes",
   *    thumbnailWrapper: "thumbs-wrapper-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CarouselSlots>;
  /**
   * Whether the carousel should loop back to the beginning when reaching the end
   * @default false
   */
  loop?: boolean;
}

export type UseCarouselProps = Props & CarouselVariantProps;

export function useCarousel(originalProps: UseCarouselProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, carousel.variantKeys);

  const {ref, as, className, children, slidesCount, thumbRadius, classNames, loop = false} = props;

  const globalContext = useProviderContext();

  const disableAnimation = globalContext?.disableAnimation ?? originalProps.disableAnimation;
  const size = originalProps.size ?? "md";
  const duration = disableAnimation ? 0 : 25;

  const [selected, setSelected] = useState(0);

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const slots = useMemo(
    () =>
      carousel({
        ...variantProps,
        disableAnimation,
      }),
    [objectToDeps(variantProps)],
  );

  const [mainRef, mainRefApi] = useEmblaCarousel({loop, duration}) as [
    (instance: HTMLElement | null) => void,
    EmblaCarouselType | undefined,
  ];
  const [thumbnailRef, thumbnailRefApi] = useEmblaCarousel({
    dragFree: true,
  }) as [(instance: HTMLElement | null) => void, EmblaCarouselType | undefined];

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainRef || !thumbnailRef) {
        return;
      }
      mainRefApi?.scrollTo(index);
    },
    [mainRef, thumbnailRef, mainRefApi],
  );

  const onSelect = useCallback(() => {
    if (!mainRef || !thumbnailRef || !mainRefApi) {
      return;
    }

    const index = mainRefApi?.selectedScrollSnap();

    setSelected(index);
    thumbnailRefApi?.scrollTo(index);
  }, [mainRef, thumbnailRef, mainRefApi, setSelected]);

  useEffect(() => {
    mainRefApi?.on("select", onSelect).on("init", onSelect);
  }, [selected, onSelect]);

  const baseStyles = clsx(className, classNames?.base);

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => ({
      ref: domRef,
      className: slots.base({class: clsx(baseStyles, props.className)}),
      ...props,
    }),
    [domRef, slots, baseStyles],
  );

  const getNextSlideButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.nextSlideButton({class: clsx(classNames?.nextSlideButton)}),
      isIconOnly: true,
      onPress: () => mainRefApi?.scrollNext(),
      ...props,
    }),
    [slots, mainRefApi],
  );

  const getPrevSlideButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.prevSlideButton({class: clsx(classNames?.prevSlideButton)}),
      isIconOnly: true,
      onPress: () => mainRefApi?.scrollPrev(),
      ...props,
    }),
    [slots, mainRefApi],
  );

  const getIndicatorProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.indicator({class: clsx(classNames?.indicator)}),
      ...props,
    }),
    [slots],
  );

  const getCarouselThumbProps: PropGetter = useCallback(
    (props = {}) => ({
      radius: thumbRadius,
      size,
      disableAnimation,
      ...props,
    }),
    [thumbRadius, size, disableAnimation],
  );

  return {
    Component,
    slots,
    domRef,
    children,
    slidesCount,
    selected,
    mainRef,
    mainRefApi,
    thumbnailRef,
    setSelected,
    onThumbClick,
    getBaseProps,
    getNextSlideButtonProps,
    getPrevSlideButtonProps,
    getIndicatorProps,
    getCarouselThumbProps,
  };
}

export type UseCarouselReturn = ReturnType<typeof useCarousel>;

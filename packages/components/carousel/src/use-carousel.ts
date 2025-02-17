import type {CarouselSlots, CarouselVariantProps, SlotsToClasses} from "@heroui/theme";
import type {EmblaCarouselType} from "embla-carousel";

import {HTMLHeroUIProps, PropGetter} from "@heroui/system";
import {carousel} from "@heroui/theme";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {clsx} from "@heroui/shared-utils";
import {ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  children: ReactNode;
  slidesCount: number;
  classNames?: SlotsToClasses<CarouselSlots>;
}

export type UseCarouselProps = Props & CarouselVariantProps;

export function useCarousel(originalProps: UseCarouselProps) {
  const {ref, as, className, children, slidesCount, classNames} = originalProps;
  const [selected, setSelected] = useState(0);

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const slots = useMemo(() => carousel({}), []);

  const [mainRef, mainRefApi] = useEmblaCarousel({}) as [
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
  };
}

export type UseCarouselReturn = ReturnType<typeof useCarousel>;

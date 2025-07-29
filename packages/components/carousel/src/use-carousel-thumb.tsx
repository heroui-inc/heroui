import {clsx, objectToDeps} from "@heroui/shared-utils";
import {mapPropsVariants, PropGetter} from "@heroui/system";
import {carouselThumb, CarouselThumbVariantProps} from "@heroui/theme";
import {useCallback, useEffect, useMemo} from "react";

interface CaurouselThumbProps {
  index: number;
  selectedSlide: number;
  onClick: () => void;
}

export type UseCarouselThumbProps = CaurouselThumbProps & CarouselThumbVariantProps;

export function useCarouselThumb(originalProps: UseCarouselThumbProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, carouselThumb.variantKeys);

  const slots = useMemo(
    () =>
      carouselThumb({
        ...variantProps,
      }),
    [objectToDeps(variantProps)],
  );

  const {index, selectedSlide, onClick} = props;

  useEffect(() => {
    const thumb = document.getElementById(`thumb-${index}`);
    const bgThumb = document.getElementById(`slide-item-${index}`)?.getAttribute("data-image-url");

    if (thumb && bgThumb) {
      thumb.style.backgroundImage = `url(${bgThumb})`;
      thumb.style.backgroundSize = "cover";
      thumb.style.backgroundPosition = "center";
    }
  }, []);

  const getCarouselThumbProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.base({class: clsx(props.className)}),
      "data-selected": selectedSlide === index,
      id: `thumb-${index}`,
      onClick: onClick,
      ...props,
    }),
    [slots, selectedSlide, index, onClick],
  );

  return {
    getCarouselThumbProps,
  };
}

export type UseCarouselThumbReturn = ReturnType<typeof useCarouselThumb>;

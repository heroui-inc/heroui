import {objectToDeps} from "@heroui/shared-utils";
import {mapPropsVariants} from "@heroui/system";
import {carouselThumb, CarouselThumbVariantProps} from "@heroui/theme";
import {useEffect, useMemo} from "react";

interface CaurouselThumbProps {
  index: number;
  selectedSlide: number;
  onClick: () => void;
}

type UseCarouselThumbProps = CaurouselThumbProps & CarouselThumbVariantProps;

export const CarouselThumb = (originalProps: UseCarouselThumbProps) => {
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

  return (
    <button
      className={slots.base()}
      data-selected={selectedSlide === index}
      id={`thumb-${index}`}
      onClick={onClick}
    />
  );
};

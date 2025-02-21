import {CarouselThumbVariantProps} from "@heroui/theme";

import {useCarouselThumb} from "./use-carousel-thumb";

interface CaurouselThumbProps {
  index: number;
  selectedSlide: number;
  onClick: () => void;
}

type UseCarouselThumbProps = CaurouselThumbProps & CarouselThumbVariantProps;

export const CarouselThumb = (originalProps: UseCarouselThumbProps) => {
  const {getCarouselThumbProps} = useCarouselThumb(originalProps);

  return <button {...getCarouselThumbProps()} />;
};

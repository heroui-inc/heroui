import {carouselThumb} from "@heroui/theme";
import {useEffect, useMemo} from "react";

interface CaurouselThumbProps {
  index: number;
  selectedSlide: number;
  onClick: () => void;
}

export const CarouselThumb = ({index, selectedSlide, onClick}: CaurouselThumbProps) => {
  const slots = useMemo(() => carouselThumb({}), []);

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

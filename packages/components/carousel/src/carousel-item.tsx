import {carouselItem} from "@heroui/theme";
import {useMemo} from "react";

interface CarouselItemProps {
  index: number;
  image?: string;
}

export const CarouselItem = ({index, image}: CarouselItemProps) => {
  const itemId = `slide-item-${index}`;

  const slots = useMemo(() => carouselItem({}), []);

  return (
    <div
      className={slots.base()}
      data-image-url={image}
      id={itemId}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

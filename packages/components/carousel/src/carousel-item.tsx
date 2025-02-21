import {carouselItem} from "@heroui/theme";
import {useMemo} from "react";
import {useImage} from "@heroui/use-image";

interface CarouselItemProps {
  index: number;
  image?: string;
}

export const CarouselItem = ({index, image}: CarouselItemProps) => {
  const itemId = `slide-item-${index}`;

  const slots = useMemo(() => carouselItem({}), []);

  const imageStatus = useImage({src: image});
  const isImgLoaded = imageStatus === "loaded";

  return (
    <div className={slots.base()} data-image-url={image} data-loaded={isImgLoaded} id={itemId}>
      <img
        alt="carousel-item"
        className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
        data-loaded={isImgLoaded}
        src={image}
      />
    </div>
  );
};

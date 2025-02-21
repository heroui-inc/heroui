import {carouselItem} from "@heroui/theme";
import {useMemo} from "react";
import {useImage} from "@heroui/use-image";
import {HTMLHeroUIProps} from "@heroui/system";
import {clsx} from "@heroui/shared-utils";

interface CarouselItemProps extends HTMLHeroUIProps<"div"> {
  index: number;
  image?: string;
}

export const CarouselItem = ({index, image, className}: CarouselItemProps) => {
  const itemId = `slide-item-${index}`;
  const slots = useMemo(() => carouselItem({}), []);

  const imageStatus = useImage({src: image});
  const isImgLoaded = imageStatus === "loaded";

  return (
    <div
      className={slots.base({class: clsx(className)})}
      data-image-url={image}
      data-loaded={isImgLoaded}
      id={itemId}
    >
      <img alt="carousel-item" className={slots.image()} data-loaded={isImgLoaded} src={image} />
    </div>
  );
};

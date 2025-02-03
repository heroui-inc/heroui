import {forwardRef} from "@heroui/system";
import useEmblaCarousel from "embla-carousel-react";
import {useCallback, useEffect, useState} from "react";
import {select} from "@heroui/theme";
import {Button} from "@heroui/button";
import {ChevronRightIcon, ChevronLeftIcon} from "@heroui/shared-icons";

import {UseCarouselProps, useCarousel} from "./use-carousel";

export interface CarouselProps extends UseCarouselProps {}

const Carousel = forwardRef<"div", CarouselProps>((props, ref) => {
  const {Component, domRef} = useCarousel({...props, ref});
  const [selected, setSelected] = useState(0);

  const [mainRef, mainRefApi] = useEmblaCarousel({});
  const [thumbnailRef, thumbnailRefApi] = useEmblaCarousel({
    dragFree: true,
  });

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
  }, [select, onSelect]);

  return (
    <Component ref={domRef} className={"w-fit flex flex-col gap-2"}>
      <div className="relative">
        <Button
          isIconOnly
          className="z-10 min-w-0 min-h-0 w-auto h-auto px-2.5 py-2.5 absolute top-1/2 -translate-y-1/2 right-2"
          onPress={() => mainRefApi?.scrollNext()}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
        <div ref={mainRef} className="relative overflow-hidden w-96 h-96">
          <div className="flex h-full gap-2">
            <div className="min-w-0 flex-none w-full h-full rounded-lg bg-red-200">Slide 1</div>
            <div className="min-w-0 flex-none w-full h-full rounded-lg bg-green-200">Slide 2</div>
            <div className="min-w-0 flex-none w-full h-full rounded-lg bg-blue-200">Slide 3</div>
            <div className="min-w-0 flex-none w-full h-full rounded-lg bg-default-200">Slide 4</div>
            <div className="min-w-0 flex-none w-full h-full rounded-lg bg-secondary-200">
              Slide 5
            </div>
            <div className="min-w-0 flex-none w-full h-full rounded-lg bg-warning-200">Slide 6</div>
          </div>
        </div>
        <Button
          isIconOnly
          className="z-10 min-w-0 min-h-0 w-auto h-auto px-2.5 py-2.5 absolute top-1/2 -translate-y-1/2 left-2"
          onPress={() => mainRefApi?.scrollPrev()}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-1">
          {Array.from({length: 6}).map((_, index) => (
            <button
              key={index}
              className="min-w-0 flex-none w-2 h-2 border border-default-500 rounded-full bg-default-200 data-[selected=true]:bg-default-500"
              data-selected={selected === index}
              onClick={() => onThumbClick(index)}
            />
          ))}
        </div>
      </div>
      <div ref={thumbnailRef} className="overflow-hidden w-96">
        <div className="flex">
          <button
            className="min-w-0 flex-none w-20 h-20 my-2 mx-1 rounded-xl bg-red-200 data-[selected=true]:ring-2 data-[selected=true]:ring-offset-1 data-[selected=true]:ring-offset-background data-[selected=true]:ring-primary"
            data-selected={selected === 0}
            onClick={() => onThumbClick(0)}
          >
            Thumb 1
          </button>
          <button
            className="min-w-0 flex-none w-20 h-20 my-2 mx-1 rounded-xl bg-green-200 data-[selected=true]:ring-2 data-[selected=true]:ring-offset-1 data-[selected=true]:ring-offset-background data-[selected=true]:ring-primary"
            data-selected={selected === 1}
            onClick={() => onThumbClick(1)}
          >
            Thumb 2
          </button>
          <button
            className="min-w-0 flex-none w-20 h-20 my-2 mx-1 rounded-xl bg-blue-200 data-[selected=true]:ring-2 data-[selected=true]:ring-offset-1 data-[selected=true]:ring-offset-background data-[selected=true]:ring-primary"
            data-selected={selected === 2}
            onClick={() => onThumbClick(2)}
          >
            Thumb 3
          </button>
          <button
            className="min-w-0 flex-none w-20 h-20 my-2 mx-1 rounded-xl bg-default-200 data-[selected=true]:ring-2 data-[selected=true]:ring-offset-1 data-[selected=true]:ring-offset-background data-[selected=true]:ring-primary"
            data-selected={selected === 3}
            onClick={() => onThumbClick(3)}
          >
            Thumb 4
          </button>
          <button
            className="min-w-0 flex-none w-20 h-20 my-2 mx-1 rounded-xl bg-secondary-200 data-[selected=true]:ring-2 data-[selected=true]:ring-offset-1 data-[selected=true]:ring-offset-background data-[selected=true]:ring-primary"
            data-selected={selected === 4}
            onClick={() => onThumbClick(4)}
          >
            Thumb 5
          </button>
          <button
            className="min-w-0 flex-none w-20 h-20 my-2 mx-1 rounded-xl bg-warning-200 data-[selected=true]:ring-2 data-[selected=true]:ring-offset-1 data-[selected=true]:ring-offset-background data-[selected=true]:ring-primary"
            data-selected={selected === 5}
            onClick={() => onThumbClick(5)}
          >
            Thumb 6
          </button>
        </div>
      </div>
    </Component>
  );
});

Carousel.displayName = "NextUI.Carousel";

export default Carousel;

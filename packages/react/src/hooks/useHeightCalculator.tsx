import type {RefObject} from "react";

import {useEffect, useState} from "react";

export const useHeightCalculator = (ref: RefObject<HTMLDivElement | null>) => {
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const calculateHeight = () => {
      if (ref.current) {
        const measuredHeight = ref.current.scrollHeight;

        setHeight(measuredHeight);
      }
    };

    calculateHeight();

    const resizeObserver = new ResizeObserver(calculateHeight);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "aria-hidden") {
          calculateHeight();
        }
      });
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
      mutationObserver.observe(ref.current, {
        attributeFilter: ["aria-hidden"],
        attributes: true,
      });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [ref]);

  return {
    height,
  };
};

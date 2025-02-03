import type {CarouselVariantProps} from "@heroui/theme";

import {HTMLHeroUIProps, mapPropsVariants} from "@heroui/system";
import {carousel} from "@heroui/theme";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {objectToDeps} from "@heroui/shared-utils";
import {useMemo} from "react";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export type UseCarouselProps = Props & CarouselVariantProps;

export function useCarousel(originalProps: UseCarouselProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, carousel.variantKeys);

  const {ref, as, className, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      carousel({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  return {Component, styles, domRef, ...otherProps};
}

export type UseCarouselReturn = ReturnType<typeof useCarousel>;

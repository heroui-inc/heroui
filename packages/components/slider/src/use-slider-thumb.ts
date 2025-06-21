import type {SliderVariantProps} from "@heroui/theme";
import type {HTMLHeroUIProps, PropGetter} from "@heroui/system";
import type {ReactRef} from "@heroui/react-utils";
import type {RefObject} from "react";
import type {AriaSliderThumbProps} from "@react-aria/slider";
import type {SliderState} from "@react-stately/slider";
import type {TooltipProps} from "@heroui/tooltip";
import type {UseSliderProps} from "./use-slider";

import {useSliderThumb as useAriaSliderThumb} from "@react-aria/slider";
import {useDOMRef} from "@heroui/react-utils";
import {useRef} from "react";
import {useHover, usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {dataAttr, mergeProps} from "@heroui/shared-utils";
import {useNumberFormatter} from "@react-aria/i18n";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * slider state, created via `useSliderState`.
   */
  state: SliderState;
  /**
   * A ref to the track element.
   */
  trackRef: RefObject<HTMLDivElement>;
  /**
   * @internal
   */
  isVertical: boolean;
  /**
   * @internal
   */
  showTooltip?: boolean;
  /**
   * @internal
   */
  formatOptions?: Intl.NumberFormatOptions;
  /**
   * @internal
   */
  tooltipProps?: UseSliderProps["tooltipProps"];
  /**
   * Function to render the thumb. It can be used to add a tooltip or custom icon.
   */
  renderThumb?: UseSliderProps["renderThumb"];
}

export type UseSliderThumbProps = Props & AriaSliderThumbProps & SliderVariantProps;

export function useSliderThumb(props: UseSliderThumbProps) {
  const {
    ref,
    as,
    state,
    index,
    name,
    trackRef,
    className,
    tooltipProps,
    isVertical,
    showTooltip,
    formatOptions,
    renderThumb,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);
  const inputRef = useRef<HTMLInputElement>(null);

  const numberFormatter = useNumberFormatter(formatOptions);

  const {thumbProps, inputProps, isDragging, isFocused} = useAriaSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
      ...otherProps,
    },
    state,
  );

  const {hoverProps, isHovered} = useHover({
    isDisabled: state.isDisabled,
  });
  const {focusProps, isFocusVisible} = useFocusRing();
  const {pressProps, isPressed} = usePress({
    isDisabled: state.isDisabled,
  });

  const getThumbProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-slot": "thumb",
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      "data-dragging": dataAttr(isDragging),
      "data-focused": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(thumbProps, pressProps, hoverProps, otherProps),
      className,
      ...props,
    };
  };

  const getTooltipProps = () => {
    const value = numberFormatter
      ? numberFormatter.format(state.values[index ?? 0])
      : state.values[index ?? 0];

    return {
      ...tooltipProps,
      placement: tooltipProps?.placement ? tooltipProps?.placement : isVertical ? "right" : "top",
      content: tooltipProps?.content ? tooltipProps?.content : value,
      updatePositionDeps: [isDragging, isHovered, value],
      isOpen: tooltipProps?.isOpen !== undefined ? tooltipProps?.isOpen : isHovered || isDragging,
    } as TooltipProps;
  };

  const getInputProps: PropGetter = (props = {}) => {
    return {
      ref: inputRef,
      ...mergeProps(inputProps, focusProps),
      ...props,
    };
  };

  return {
    Component,
    index,
    showTooltip,
    renderThumb,
    getThumbProps,
    getTooltipProps,
    getInputProps,
  };
}

export type UseSliderThumbReturn = ReturnType<typeof useSliderThumb>;

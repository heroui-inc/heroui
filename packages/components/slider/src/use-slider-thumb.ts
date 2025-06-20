import type {SliderVariantProps} from "@heroui/theme";
import type {HTMLHeroUIProps, PropGetter} from "@heroui/system";
import type {ReactRef} from "@heroui/react-utils";
import type {RefObject} from "react";
import type {AriaSliderThumbProps} from "@react-aria/slider";
import type {SliderState} from "@react-stately/slider";
import type {TooltipProps} from "@heroui/tooltip";
import type {SliderValue, UseSliderProps} from "./use-slider";

import {useSliderThumb as useAriaSliderThumb} from "@react-aria/slider";
import {useDOMRef} from "@heroui/react-utils";
import {useRef} from "react";
import {useHover, usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {dataAttr} from "@heroui/shared-utils";
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
   * A function that returns the content to display as the tooltip label. (in analogy to getValue)
   * @param value - The value of the slider, array or single number.
   * @param index - The index of the thumb, if multiple thumbs are used.
   * In addition to formatting with tooltipValueFormatOptions if number is returned.
   */
  getTooltipValue?: (value: SliderValue, index?: number) => string | number;
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
    getTooltipValue,
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
      "aria-label": props["aria-label"] || `Slider thumb ${index ? `${index + 1}` : ""}`,
      ...mergeProps(thumbProps, pressProps, hoverProps, otherProps),
      className,
      ...props,
    };
  };

  const getTooltipProps = () => {
    const stateValue = tooltipProps?.content
      ? undefined
      : getTooltipValue
        ? state.values.length === 1
          ? getTooltipValue(state.values[index ?? 0])
          : getTooltipValue(state.values, index ?? 0)
        : state.values[index ?? 0];

    const value =
      numberFormatter && typeof stateValue === "number"
        ? numberFormatter.format(stateValue)
        : stateValue;

    return {
      ...tooltipProps,
      placement: tooltipProps?.placement ? tooltipProps?.placement : isVertical ? "right" : "top",
      content: tooltipProps?.content ? tooltipProps?.content : value,
      updatePositionDeps: [isDragging, isHovered, isFocused, isFocusVisible, value],
      isOpen:
        tooltipProps?.isOpen !== undefined
          ? tooltipProps?.isOpen
          : isHovered || isDragging || isFocused || isFocusVisible,
      role: "tooltip",
      "aria-label": `Current value: ${value}`,
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

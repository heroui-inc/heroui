import type {ProgressVariantProps, SlotsToClasses, ProgressSlots} from "@heroui/theme";
import type {PropGetter} from "@heroui/system";
import type {AriaProgressBarProps} from "@react-types/progress";
import type {HTMLHeroUIProps} from "@heroui/system";
import type {ReactRef} from "@heroui/react-utils";

import {mapPropsVariants, useProviderContext} from "@heroui/system";
import {progress} from "@heroui/theme";
import {useDOMRef} from "@heroui/react-utils";
import {clampPercentage, clsx, dataAttr, objectToDeps, mergeProps} from "@heroui/shared-utils";
import {useMemo, useCallback} from "react";
import {useIsMounted} from "@heroui/use-is-mounted";
import {useProgressBar as useAriaProgress} from "@react-aria/progress";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Whether to show the value label.
   * @default false
   */
  showValueLabel?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Progress classNames={{
   *    base:"base-classes",
   *    labelWrapper: "labelWrapper-classes",
   *    label: "label-classes",
   *    value: "value-classes",
   *    track: "track-classes",
   *    indicator: "indicator-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ProgressSlots>;
}

export type UseProgressProps = Props & AriaProgressBarProps & ProgressVariantProps;

export function useProgress(originalProps: UseProgressProps) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, progress.variantKeys);

  const {
    ref,
    as,
    id,
    className,
    classNames,
    label,
    valueLabel,
    value = 0,
    minValue = 0,
    maxValue = 100,
    showValueLabel = false,
    formatOptions = {
      style: "percent",
    },
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const baseStyles = clsx(classNames?.base, className);
  const [, isMounted] = useIsMounted({
    rerender: true,
    delay: 100,
  });

  const isIndeterminate = originalProps.isIndeterminate;

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const {progressBarProps, labelProps} = useAriaProgress({
    id,
    label,
    value,
    minValue,
    maxValue,
    valueLabel,
    formatOptions,
    isIndeterminate,
    "aria-labelledby": originalProps["aria-labelledby"],
    "aria-label": originalProps["aria-label"],
  });

  const slots = useMemo(
    () =>
      progress({
        ...variantProps,
        disableAnimation,
      }),
    [objectToDeps(variantProps), disableAnimation],
  );

  const selfMounted = disableAnimation ? true : isMounted;

  // Calculate the width of the progress bar as a percentage
  const percentage = useMemo(
    () =>
      isIndeterminate || !selfMounted
        ? undefined
        : clampPercentage(((value - minValue) / (maxValue - minValue)) * 100),
    [selfMounted, isIndeterminate, value, minValue, maxValue],
  );

  const getProgressBarProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: domRef,
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(originalProps.isDisabled),
      className: slots.base({class: baseStyles}),
      ...mergeProps(progressBarProps, otherProps, props),
    }),
    [
      domRef,
      slots,
      isIndeterminate,
      originalProps.isDisabled,
      baseStyles,
      progressBarProps,
      otherProps,
    ],
  );

  const getLabelProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.label({class: classNames?.label}),
      ...mergeProps(labelProps, props),
    }),
    [slots, classNames, labelProps],
  );

  return {
    Component,
    domRef,
    slots,
    classNames,
    label,
    percentage,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
  };
}

export type UseProgressReturn = ReturnType<typeof useProgress>;

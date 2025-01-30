import type {SkeletonVariantProps, SkeletonSlots, SlotsToClasses} from "@vezham/theme";
import type {HTMLHeroUIProps, PropGetter} from "@vezham/system";

import {mapPropsVariants} from "@vezham/system";
import {skeleton} from "@vezham/theme";
import {clsx, dataAttr, objectToDeps} from "@vezham/shared-utils";
import {useMemo, Ref} from "react";
import {useProviderContext} from "@vezham/system";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement | null>;
  /**
   * The skeleton will be visible while isLoading is `false`.
   * @default false
   */
  isLoaded?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Skeleton classNames={{
   *    base:"base-classes", // skeleton wrapper
   *    content: "content-classes", // children wrapper
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<SkeletonSlots>;
}

export type UseSkeletonProps = Props & SkeletonVariantProps;

export function useSkeleton(originalProps: UseSkeletonProps) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(originalProps, skeleton.variantKeys);

  const {as, children, isLoaded = false, className, classNames, ...otherProps} = props;

  const Component = as || "div";

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const slots = useMemo(
    () =>
      skeleton({
        ...variantProps,
        disableAnimation,
      }),
    [objectToDeps(variantProps), disableAnimation, children],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getSkeletonProps: PropGetter = (props = {}) => {
    return {
      "data-loaded": dataAttr(isLoaded),
      className: slots.base({class: clsx(baseStyles, props?.className)}),
      ...otherProps,
    };
  };

  const getContentProps: PropGetter = (props = {}) => {
    return {
      className: slots.content({class: clsx(classNames?.content, props?.className)}),
    };
  };

  return {Component, children, slots, classNames, getSkeletonProps, getContentProps};
}

export type UseSkeletonReturn = ReturnType<typeof useSkeleton>;

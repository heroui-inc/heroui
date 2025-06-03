import type {PopoverVariantProps, SlotsToClasses} from "@heroui/theme";
import type {AriaTooltipProps} from "@react-types/tooltip";
import type {OverlayTriggerProps} from "@react-types/overlays";
import type {HTMLMotionProps} from "framer-motion";
import type {OverlayOptions} from "@heroui/aria-utils";

import {ReactNode, Ref, useId, useImperativeHandle, useState, useEffect, useRef} from "react";
import {useTooltipTriggerState} from "@react-stately/tooltip";
import {mergeProps} from "@react-aria/utils";
import {useTooltip as useReactAriaTooltip, useTooltipTrigger} from "@react-aria/tooltip";
import {useOverlayPosition, useOverlay, AriaOverlayProps} from "@react-aria/overlays";
import {HTMLHeroUIProps, mapPropsVariants, PropGetter, useProviderContext} from "@heroui/system";
import {popover} from "@heroui/theme";
import {clsx, dataAttr, objectToDeps} from "@heroui/shared-utils";
import {ReactRef, mergeRefs} from "@heroui/react-utils";
import {createDOMRef} from "@heroui/react-utils";
import {useMemo, useCallback} from "react";
import {toReactAriaPlacement, getArrowPlacement} from "@heroui/aria-utils";
import {useSafeLayoutEffect} from "@heroui/use-safe-layout-effect";

interface Props extends Omit<HTMLHeroUIProps, "content"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The children to render. Usually a trigger element.
   */
  children?: ReactNode;
  /**
   * The content of the tooltip.
   */
  content?: string | React.ReactNode;
  /**
   * Whether the tooltip should be disabled, independent from the trigger.
   */
  isDisabled?: boolean;
  /**
   * The delay time in ms for the tooltip to show up.
   * @default 0
   */
  delay?: number;
  /**
   * The delay time in ms for the tooltip to hide.
   * @default 500
   */
  closeDelay?: number;
  /**
   * By default, opens for both focus and hover. Can be made to open only for focus.
   */
  trigger?: "focus";
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: Omit<HTMLMotionProps<"div">, "ref">;
  /**
   * The container element in which the overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * List of dependencies to update the position of the tooltip.
   * @default []
   */
  updatePositionDeps?: any[];
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Tooltip classNames={{
   *    base:"base-classes",
   *    content: "content-classes",
   *    arrow: "arrow-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<"base" | "arrow" | "content">;
}

export type UseTooltipProps = Props &
  AriaTooltipProps &
  AriaOverlayProps &
  OverlayTriggerProps &
  OverlayOptions &
  PopoverVariantProps;

export function useTooltip(originalProps: UseTooltipProps) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, popover.variantKeys);

  const {
    ref,
    as,
    isOpen: isOpenProp,
    content,
    children,
    defaultOpen,
    onOpenChange,
    isDisabled,
    trigger: triggerAction,
    shouldFlip = true,
    containerPadding = 12,
    placement: placementProp = "top",
    delay = 0,
    closeDelay = 500,
    showArrow = false,
    offset = 7,
    crossOffset = 0,
    isDismissable,
    shouldCloseOnBlur = true,
    portalContainer,
    isKeyboardDismissDisabled = false,
    updatePositionDeps = [],
    shouldCloseOnInteractOutside,
    className,
    onClose,
    motionProps,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "div";

  const disableAnimation =
    originalProps?.disableAnimation ?? globalContext?.disableAnimation ?? false;

  // Custom delay handling when respectDelay is true
  const [customIsOpen, setCustomIsOpen] = useState(false);
  const customDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const customCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const state = useTooltipTriggerState({
    delay: 0, // Always disable React Stately delay to use custom delay
    closeDelay: 0, // Always disable React Stately closeDelay to use custom delay
    isDisabled,
    defaultOpen,
    isOpen: isOpenProp,
    onOpenChange: (isOpen) => {
      // Handle custom delay logic
      if (isOpen) {
        // Clear any existing timeouts
        if (customDelayTimeoutRef.current) {
          clearTimeout(customDelayTimeoutRef.current);
        }
        if (customCloseTimeoutRef.current) {
          clearTimeout(customCloseTimeoutRef.current);
          customCloseTimeoutRef.current = null;
        }

        if (delay > 0) {
          // Apply custom delay
          customDelayTimeoutRef.current = setTimeout(() => {
            setCustomIsOpen(true);
            onOpenChange?.(true);
          }, delay);
        } else {
          // No delay, show immediately
          setCustomIsOpen(true);
          onOpenChange?.(true);
        }
      } else {
        // Handle closing with custom close delay
        if (customDelayTimeoutRef.current) {
          clearTimeout(customDelayTimeoutRef.current);
          customDelayTimeoutRef.current = null;
        }

        if (closeDelay > 0) {
          customCloseTimeoutRef.current = setTimeout(() => {
            setCustomIsOpen(false);
            onOpenChange?.(false);
            onClose?.();
          }, closeDelay);
        } else {
          // No close delay, hide immediately
          setCustomIsOpen(false);
          onOpenChange?.(false);
          onClose?.();
        }
      }
    },
  });

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (customDelayTimeoutRef.current) {
        clearTimeout(customDelayTimeoutRef.current);
      }
      if (customCloseTimeoutRef.current) {
        clearTimeout(customCloseTimeoutRef.current);
      }
    };
  }, []);

  const triggerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const tooltipId = useId();

  // Use custom isOpen state when respectDelay is true, otherwise use React Stately's state
  const isOpen = customIsOpen && !isDisabled;

  // Sync ref with overlayRef from passed ref.
  useImperativeHandle(ref, () =>
    // @ts-ignore
    createDOMRef(overlayRef),
  );

  const {triggerProps, tooltipProps: triggerTooltipProps} = useTooltipTrigger(
    {
      isDisabled,
      trigger: triggerAction,
    },
    state,
    triggerRef,
  );

  const {tooltipProps} = useReactAriaTooltip(
    {
      isOpen,
      ...mergeProps(props, triggerTooltipProps),
    },
    state,
  );

  const {
    overlayProps: positionProps,
    placement,
    updatePosition,
  } = useOverlayPosition({
    isOpen: isOpen,
    targetRef: triggerRef,
    placement: toReactAriaPlacement(placementProp),
    overlayRef,
    offset: showArrow ? offset + 3 : offset,
    crossOffset,
    shouldFlip,
    containerPadding,
  });

  useSafeLayoutEffect(() => {
    if (!updatePositionDeps.length) return;
    // force update position when deps change
    updatePosition();
  }, updatePositionDeps);

  const {overlayProps} = useOverlay(
    {
      isOpen: isOpen,
      onClose: state.close,
      isDismissable,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
    },
    overlayRef,
  );

  const slots = useMemo(
    () =>
      popover({
        ...variantProps,
        disableAnimation,
        radius: originalProps?.radius ?? "md",
        size: originalProps?.size ?? "md",
        shadow: originalProps?.shadow ?? "sm",
      }),
    [
      objectToDeps(variantProps),
      disableAnimation,
      originalProps?.radius,
      originalProps?.size,
      originalProps?.shadow,
    ],
  );

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => ({
      ...mergeProps(triggerProps, props),
      ref: mergeRefs(_ref, triggerRef),
      "aria-describedby": isOpen ? tooltipId : undefined,
    }),
    [triggerProps, isOpen, tooltipId, state],
  );

  const getTooltipProps = useCallback<PropGetter>(
    () => ({
      ref: overlayRef,
      "data-slot": "base",
      "data-open": dataAttr(isOpen),
      "data-arrow": dataAttr(showArrow),
      "data-disabled": dataAttr(isDisabled),
      "data-placement": getArrowPlacement(placement || "top", placementProp),
      ...mergeProps(tooltipProps, overlayProps, otherProps),
      style: mergeProps(positionProps.style, otherProps.style, props.style),
      className: slots.base({class: classNames?.base}),
      id: tooltipId,
    }),
    [
      slots,
      isOpen,
      showArrow,
      isDisabled,
      placement,
      placementProp,
      tooltipProps,
      overlayProps,
      otherProps,
      positionProps,
      props,
      tooltipId,
    ],
  );

  const getTooltipContentProps = useCallback<PropGetter>(
    () => ({
      "data-slot": "content",
      "data-open": dataAttr(isOpen),
      "data-arrow": dataAttr(showArrow),
      "data-disabled": dataAttr(isDisabled),
      "data-placement": getArrowPlacement(placement || "top", placementProp),
      className: slots.content({class: clsx(classNames?.content, className)}),
    }),
    [slots, isOpen, showArrow, isDisabled, placement, placementProp, classNames],
  );

  return {
    Component,
    content,
    children,
    isOpen,
    triggerRef,
    showArrow,
    portalContainer,
    placement: placementProp,
    disableAnimation,
    isDisabled,
    motionProps,
    getTooltipContentProps,
    getTriggerProps,
    getTooltipProps,
  };
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>;

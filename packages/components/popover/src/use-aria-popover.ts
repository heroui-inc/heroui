import type {RefObject} from "react";
import type {AriaPopoverProps, PopoverAria, AriaOverlayProps} from "@react-aria/overlays";
import type {OverlayPlacement} from "@heroui/aria-utils";
import type {OverlayTriggerState} from "@react-stately/overlays";

import {ariaHideOutside, keepVisible, toReactAriaPlacement} from "@heroui/aria-utils";
import {useOverlayPosition} from "@react-aria/overlays";
import {useEffect} from "react";
import {mergeProps} from "@react-aria/utils";
import {useSafeLayoutEffect} from "@heroui/use-safe-layout-effect";
import {useAriaOverlay} from "@heroui/use-aria-overlay";

export interface Props {
  /**
   * Whether the element should render an arrow.
   * @default false
   */
  showArrow?: boolean;
  /**
   * The placement of the element with respect to its anchor element.
   * @default 'top'
   */
  placement?: OverlayPlacement;
  /**
   * A ref for the scrollable region within the overlay.
   * @default popoverRef
   */
  scrollRef?: RefObject<HTMLElement>;
  /**
   * List of dependencies to update the position of the popover.
   * @default []
   */
  updatePositionDeps?: any[];
  /**
   * Whether the popover should close on scroll.
   * @default true
   */
  shouldCloseOnScroll?: boolean;
  /**
   * Whether to close the overlay when the user interacts outside it.
   * @default true
   */
  isDismissable?: boolean;
}

export type ReactAriaPopoverProps = Props &
  Omit<AriaPopoverProps, "placement"> &
  Omit<AriaOverlayProps, "isDismissable">;

/**
 * Provides the behavior and accessibility implementation for a popover component.
 * A popover is an overlay element positioned relative to a trigger.
 */
export function useReactAriaPopover(
  props: ReactAriaPopoverProps,
  state: OverlayTriggerState,
): PopoverAria {
  const {
    groupRef,
    triggerRef,
    popoverRef,
    showArrow,
    offset = 7,
    crossOffset = 0,
    scrollRef,
    shouldFlip,
    boundaryElement,
    isDismissable = true,
    shouldCloseOnBlur = true,
    shouldCloseOnScroll = true,
    placement: placementProp = "top",
    containerPadding,
    shouldCloseOnInteractOutside,
    isNonModal: isNonModalProp,
    isKeyboardDismissDisabled,
    updatePositionDeps = [],
    ...otherProps
  } = props;

  const isNonModal = isNonModalProp ?? true;

  const isSubmenu = otherProps["trigger"] === "SubmenuTrigger";

  const {overlayProps, underlayProps} = useAriaOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur,
      isDismissable: isDismissable || isSubmenu,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside:
        shouldCloseOnInteractOutside || ((el) => !triggerRef.current?.contains(el)),
      disableOutsideEvents: !isNonModal,
    },
    popoverRef,
  );

  const {
    overlayProps: positionProps,
    arrowProps,
    placement,
    updatePosition,
  } = useOverlayPosition({
    ...otherProps,
    shouldFlip,
    crossOffset,
    targetRef: triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    scrollRef,
    boundaryElement,
    containerPadding,
    placement: toReactAriaPlacement(placementProp),
    offset: showArrow ? offset + 3 : offset,
    onClose: isNonModal && !isSubmenu && shouldCloseOnScroll ? state.close : () => {},
  });

  useSafeLayoutEffect(() => {
    if (!updatePositionDeps.length) return;
    // force update position when deps change
    updatePosition();
  }, updatePositionDeps);

  useEffect(() => {
    if (state.isOpen && popoverRef.current) {
      if (isNonModal) {
        return keepVisible(groupRef?.current ?? popoverRef.current);
      } else {
        return ariaHideOutside([groupRef?.current ?? popoverRef.current]);
      }
    }
  }, [isNonModal, state.isOpen, popoverRef, groupRef]);

  return {
    popoverProps: mergeProps(overlayProps, positionProps),
    arrowProps,
    underlayProps,
    placement,
  };
}

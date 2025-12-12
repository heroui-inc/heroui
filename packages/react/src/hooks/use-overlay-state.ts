"use client";

import {useCallback, useEffect, useRef, useState} from "react";

export interface UseOverlayStateProps {
  /**
   * Whether the overlay is currently open (controlled)
   */
  isOpen?: boolean;
  /**
   * Whether the overlay is open by default (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Handler that is called when the overlay's open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
}

export interface UseOverlayStateReturn {
  /**
   * Whether the overlay is currently open
   */
  readonly isOpen: boolean;
  /**
   * Sets the overlay's open state
   */
  setOpen(isOpen: boolean): void;
  /**
   * Opens the overlay
   */
  open(): void;
  /**
   * Closes the overlay
   */
  close(): void;
  /**
   * Toggles the overlay's open state
   */
  toggle(): void;
}

/**
 * Hook to manage overlay trigger state (Modal, AlertDialog, Popover, etc.)
 * Provides methods to open, close, and toggle the overlay
 *
 * @example
 * ```tsx
 * const state = useOverlayState();
 *
 * <Button onPress={state.open}>Open Dialog</Button>
 * <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
 *   <Button onPress={state.close}>Close</Button>
 * </Modal>
 * ```
 */
export const useOverlayState = (props: UseOverlayStateProps = {}): UseOverlayStateReturn => {
  const {defaultOpen = false, isOpen: controlledIsOpen, onOpenChange} = props;

  // Internal state for uncontrolled mode
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState<boolean>(defaultOpen);

  // Determine if controlled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // Keep a stable reference to onOpenChange to avoid recreating callbacks
  const onOpenChangeRef = useRef(onOpenChange);

  // Update ref in effect to avoid updating during render
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  // Stable setter function that works for both controlled and uncontrolled modes
  const setOpen = useCallback(
    (nextIsOpen: boolean) => {
      // Always call the onChange callback if provided
      onOpenChangeRef.current?.(nextIsOpen);

      // Update internal state only in uncontrolled mode
      if (!isControlled) {
        setUncontrolledIsOpen(nextIsOpen);
      }
    },
    [isControlled],
  );

  // Memoized convenience methods
  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [setOpen, isOpen]);

  return {
    close,
    isOpen,
    open,
    setOpen,
    toggle,
  };
};

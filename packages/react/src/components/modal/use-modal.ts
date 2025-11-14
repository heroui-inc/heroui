import {useCallback, useRef, useState} from "react";

export interface UseModalStateProps {
  /**
   * Whether the modal is currently open (controlled)
   */
  isOpen?: boolean;
  /**
   * Whether the modal is open by default (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Handler that is called when the modal's open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
}

export interface UseModalStateReturn {
  /**
   * Whether the modal is currently open
   */
  readonly isOpen: boolean;
  /**
   * Sets the modal's open state
   */
  setOpen(isOpen: boolean): void;
  /**
   * Opens the modal
   */
  open(): void;
  /**
   * Closes the modal
   */
  close(): void;
  /**
   * Toggles the modal's open state
   */
  toggle(): void;
}

/**
 * Hook to manage modal overlay trigger state
 * Provides methods to open, close, and toggle the modal
 */
export const useModalState = (props: UseModalStateProps = {}): UseModalStateReturn => {
  const {defaultOpen = false, isOpen: controlledIsOpen, onOpenChange} = props;

  // Internal state for uncontrolled mode
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState<boolean>(defaultOpen);

  // Determine if controlled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // Keep a stable reference to onOpenChange to avoid recreating callbacks
  const onOpenChangeRef = useRef(onOpenChange);

  onOpenChangeRef.current = onOpenChange;

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

  // Memoized convenience methods, these are stable unless setOpen changes (which only happens if isControlled changes)
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
    isOpen,
    setOpen,
    open,
    close,
    toggle,
  };
};

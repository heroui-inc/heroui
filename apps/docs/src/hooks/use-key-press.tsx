import {useEffect} from "react";

interface UseKeyPressOptions {
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  enabled?: boolean;
}

export function useKeyPress(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {},
) {
  const {alt = false, ctrl = false, enabled = true, shift = false} = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      const isTargetKey = event.key.toLowerCase() === key.toLowerCase();

      // Check if modifiers match EXACTLY
      const modifiersMatch =
        (event.ctrlKey || event.metaKey) === ctrl &&
        event.shiftKey === shift &&
        event.altKey === alt;

      if (isTargetKey && modifiersMatch) {
        // Auto-prevent default if using any modifiers
        if (ctrl || shift || alt) {
          event.preventDefault();
        }
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [key, callback, ctrl, shift, alt, enabled]);
}

export default useKeyPress;

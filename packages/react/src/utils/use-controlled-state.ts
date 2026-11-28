"use client";

import {useCallback, useRef, useState} from "react";

/**
 * State that is controlled when `value` is defined and uncontrolled otherwise.
 * `onChange` is called only when the value actually changes; when uncontrolled
 * this also holds across several calls made before the next render.
 */
export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [stateValue, setStateValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : stateValue;

  // Uncontrolled state only changes through `setValue`, so this ref always holds
  // the latest value, even for repeated calls before the next render.
  const stateRef = useRef(stateValue);

  const setValue = useCallback(
    (nextValue: T) => {
      // A controlled parent may ignore a change without re-rendering, so compare
      // against the rendered value there rather than the last request.
      const previousValue = isControlled ? currentValue : stateRef.current;

      if (!isControlled) {
        stateRef.current = nextValue;
        setStateValue(nextValue);
      }

      if (!Object.is(previousValue, nextValue)) {
        onChange?.(nextValue);
      }
    },
    [isControlled, currentValue, onChange],
  );

  return [currentValue, setValue];
}

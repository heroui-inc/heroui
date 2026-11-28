"use client";

import {useCallback, useState} from "react";

/**
 * State that is controlled when `value` is defined and uncontrolled otherwise.
 * `onChange` is called only when the value actually changes.
 */
export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [stateValue, setStateValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : stateValue;

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setStateValue(nextValue);
      }

      if (!Object.is(currentValue, nextValue)) {
        onChange?.(nextValue);
      }
    },
    [isControlled, currentValue, onChange],
  );

  return [currentValue, setValue];
}

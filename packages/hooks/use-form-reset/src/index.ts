import React, {useEffect, useRef, useCallback} from "react";

interface RefObject<T> {
  current: T;
}

export const useLayoutEffect: typeof React.useLayoutEffect =
  typeof document !== "undefined" ? React.useLayoutEffect : () => {};

export function useEffectEvent<T extends Function>(fn?: T): T {
  const ref = useRef<T | null | undefined>(null);

  useLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  // @ts-ignore
  return useCallback<T>((...args) => {
    const f = ref.current!;

    return f?.(...args);
  }, []);
}

export function useFormReset<T>(
  ref: RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null> | undefined,
  initialValue: T,
  onReset: (value: T) => void,
): void {
  let resetValue = useRef(initialValue);
  let handleReset = useEffectEvent(() => {
    if (onReset) {
      onReset(resetValue.current);
    }
  });

  useEffect(() => {
    let form = ref?.current?.form;

    form?.addEventListener("reset", handleReset);

    return () => {
      form?.removeEventListener("reset", handleReset);
    };
  }, [ref, handleReset]);
}

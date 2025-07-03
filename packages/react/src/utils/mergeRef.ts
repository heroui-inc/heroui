import {useCallback} from "react";

export const useMergeRef = <T extends HTMLElement = HTMLElement>(
  ...refs: (React.Ref<T> | undefined)[]
) => {
  return useCallback((node: T | null) => {
    refs.forEach((ref) => {
      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    });
  }, refs);
};

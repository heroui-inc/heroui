import {useEffect} from "react";

interface RefObject<T> {
  current: T;
}

export function useResize(callback: Function, immediatelyInvoke: boolean = true) {
  useEffect(() => {
    const fn = () => callback();

    if (immediatelyInvoke) {
      fn();
    }
    window.addEventListener("resize", fn);

    return () => window.removeEventListener("resize", fn);
  }, []);
}

function hasResizeObserver() {
  return typeof window.ResizeObserver !== "undefined";
}

type useResizeObserverOptionsType<T> = {
  ref: RefObject<T | undefined | null> | undefined;
  box?: ResizeObserverBoxOptions;
  onResize: () => void;
};

export function useResizeObserver<T extends Element>(
  options: useResizeObserverOptionsType<T>,
): void {
  const {ref, box, onResize} = options;

  useEffect(() => {
    let element = ref?.current;

    if (!element) {
      return;
    }

    if (!hasResizeObserver()) {
      window.addEventListener("resize", onResize, false);

      return () => {
        window.removeEventListener("resize", onResize, false);
      };
    } else {
      const resizeObserverInstance = new window.ResizeObserver((entries) => {
        if (!entries.length) {
          return;
        }

        onResize();
      });

      resizeObserverInstance.observe(element, {box});

      return () => {
        if (element) {
          resizeObserverInstance.unobserve(element);
        }
      };
    }
  }, [onResize, ref, box]);
}

"use client";

import type {MutableRefObject, Ref} from "react";

import React, {useState, useRef, useEffect, useMemo, useCallback, useContext} from "react";

import {clsx} from "./clsx";

// Partial code from react-spectrum to avoid importing the entire package
interface Props {
  [key: string]: any;
}

type PropsArg = Props | null | undefined;

// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type TupleTypes<T> = {[P in keyof T]: T[P]} extends {[key: number]: infer V}
  ? NullToObject<V>
  : never;
type NullToObject<T> = T extends null | undefined ? {} : T;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

interface RefObject<T> {
  current: T;
}

/**
 * Calls all functions in the order they were chained with the same arguments.
 */
export function chain(...callbacks: any[]): (...args: any[]) => void {
  return (...args: any[]) => {
    for (let callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}

export let idsUpdaterMap: Map<string, {current: string | null}[]> = new Map();
/**
 * Merges two ids.
 * Different ids will trigger a side-effect and re-render components hooked up with `useId`.
 */
export function mergeIds(idA: string, idB: string): string {
  if (idA === idB) {
    return idA;
  }

  let setIdsA = idsUpdaterMap.get(idA);

  if (setIdsA) {
    setIdsA.forEach((ref) => (ref.current = idB));

    return idB;
  }

  let setIdsB = idsUpdaterMap.get(idB);

  if (setIdsB) {
    setIdsB.forEach((ref) => (ref.current = idA));

    return idA;
  }

  return idB;
}

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated - different ids
 * will trigger a side-effect and re-render components hooked up with `useId`.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */

export function mergeProps<T extends PropsArg[]>(...args: T): UnionToIntersection<TupleTypes<T>> {
  // Start with a base clone of the first argument. This is a lot faster than starting
  // with an empty object and adding properties as we go.
  let result: Props = {...args[0]};

  for (let i = 1; i < args.length; i++) {
    let props = args[i];

    for (let key in props) {
      let a = result[key];
      let b = props[key];

      // Chain events
      if (
        typeof a === "function" &&
        typeof b === "function" &&
        // This is a lot faster than a regex.
        key[0] === "o" &&
        key[1] === "n" &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      ) {
        result[key] = chain(a, b);

        // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if (
        (key === "className" || key === "UNSAFE_className") &&
        typeof a === "string" &&
        typeof b === "string"
      ) {
        result[key] = clsx(a, b);
      } else if (key === "id" && a && b) {
        result.id = mergeIds(a, b);
        // Override others
      } else {
        result[key] = b !== undefined ? b : a;
      }
    }
  }

  return result as UnionToIntersection<TupleTypes<T>>;
}

export function mergeRefs<T>(
  ...refs: Array<Ref<T> | MutableRefObject<T> | null | undefined>
): Ref<T> {
  if (refs.length === 1 && refs[0]) {
    return refs[0];
  }

  return (value: T | null) => {
    let hasCleanup = false;

    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, value);

      hasCleanup ||= typeof cleanup == "function";

      return cleanup;
    });

    if (hasCleanup) {
      return () => {
        cleanups.forEach((cleanup, i) => {
          if (typeof cleanup === "function") {
            cleanup?.();
          } else {
            setRef(refs[i], null);
          }
        });
      };
    }
  };
}

function setRef<T>(
  ref: Ref<T> | MutableRefObject<T> | null | undefined,
  value: T,
): (() => void) | void {
  if (typeof ref === "function") {
    return () => ref(value);
  } else if (ref != null) {
    if ("current" in ref) {
      (ref as MutableRefObject<T>).current = value;
    }
  }
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

/**
 * Offers an object ref for a given callback ref or an object ref. Especially
 * helfpul when passing forwarded refs (created using `React.forwardRef`) to
 * React Aria hooks.
 *
 * @param ref The original ref intended to be used.
 * @returns An object ref that updates the given ref.
 * @see https://react.dev/reference/react/forwardRef
 */
export function useObjectRef<T>(
  ref?: ((instance: T | null) => (() => void) | void) | MutableRefObject<T | null> | null,
): MutableRefObject<T | null> {
  const objRef: MutableRefObject<T | null> = useRef<T>(null);
  const cleanupRef: MutableRefObject<(() => void) | void> = useRef(undefined);

  const refEffect = useCallback(
    (instance: T | null) => {
      if (typeof ref === "function") {
        const refCallback = ref;
        const refCleanup = refCallback(instance);

        return () => {
          if (typeof refCleanup === "function") {
            refCleanup();
          } else {
            refCallback(null);
          }
        };
      } else if (ref) {
        ref.current = instance;

        return () => {
          ref.current = null;
        };
      }
    },
    [ref],
  );

  return useMemo(
    () => ({
      get current() {
        return objRef.current;
      },
      set current(value) {
        objRef.current = value;
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = undefined;
        }

        if (value != null) {
          cleanupRef.current = refEffect(value);
        }
      },
    }),
    [refEffect],
  );
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
interface ViewportSize {
  width: number;
  height: number;
}

// SSR

const IsSSRContext = React.createContext(false);

function getSnapshot() {
  return false;
}

function getServerSnapshot() {
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function subscribe(onStoreChange: () => void): () => void {
  // noop
  return () => {};
}

export function useIsSSR(): boolean {
  // In React 18, we can use useSyncExternalStore to detect if we're server rendering or hydrating.
  if (typeof React["useSyncExternalStore"] === "function") {
    return React["useSyncExternalStore"](subscribe, getSnapshot, getServerSnapshot);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(IsSSRContext);
}

// useViewportSize
let visualViewport = typeof document !== "undefined" && window.visualViewport;

export function useViewportSize(): ViewportSize {
  let isSSR = useIsSSR();
  let [size, setSize] = useState(() => (isSSR ? {width: 0, height: 0} : getViewportSize()));

  useEffect(() => {
    // Use visualViewport api to track available height even on iOS virtual keyboard opening
    let onResize = () => {
      setSize((size) => {
        let newSize = getViewportSize();

        if (newSize.width === size.width && newSize.height === size.height) {
          return size;
        }

        return newSize;
      });
    };

    if (!visualViewport) {
      window.addEventListener("resize", onResize);
    } else {
      visualViewport.addEventListener("resize", onResize);
    }

    return () => {
      if (!visualViewport) {
        window.removeEventListener("resize", onResize);
      } else {
        visualViewport.removeEventListener("resize", onResize);
      }
    };
  }, []);

  return size;
}

function getViewportSize(): ViewportSize {
  return {
    width: (visualViewport && visualViewport?.width) || window.innerWidth,
    height: (visualViewport && visualViewport?.height) || window.innerHeight,
  };
}

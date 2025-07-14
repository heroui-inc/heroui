import type {MutableRefObject, Ref} from "react";

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

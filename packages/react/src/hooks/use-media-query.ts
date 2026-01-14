// https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useMediaQuery/useMediaQuery.ts

import {useState} from "react";

import {useIsomorphicLayoutEffect} from "./use-isomorphic-layout-effect";

/** Hook options. */
type UseMediaQueryOptions = {
  /**
   * The default value to return if the hook is being run on the server.
   * @default false
   */
  defaultValue?: boolean;
  /**
   * If `true` (default), the hook will initialize reading the media query. In SSR, you should set it to `false`, returning `options.defaultValue` or `false` initially.
   * @default true
   */
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

/**
 * Custom hook that tracks the state of a media query using the [`Match Media API`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).
 * @param {string} query - The media query to track.
 * @param {?UseMediaQueryOptions} [options] - The options for customizing the behavior of the hook (optional).
 * @returns {boolean} The current state of the media query (true if the query matches, false otherwise).
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-media-query)
 * @example
 * ```tsx
 * const isSmallScreen = useMediaQuery('(max-width: 600px)');
 * // Use `isSmallScreen` to conditionally apply styles or logic based on the screen size.
 * ```
 */
export function useMediaQuery(
  query: string,
  {defaultValue = false, initializeWithValue = true}: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }

    return defaultValue;
  });

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query));
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Part of this code is taken from @chakra-ui/react package ❤️
 */

import type {ImgHTMLAttributes, SyntheticEvent} from "react";

import {useRef, useState, useCallback} from "react";
import {useIsHydrated} from "@heroui/react-utils";
import {useSafeLayoutEffect} from "@heroui/use-safe-layout-effect";

type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;

export interface UseImageProps {
  /**
   * The image `src` attribute
   */
  src?: string;
  /**
   * The image `srcset` attribute
   */
  srcSet?: string;
  /**
   * The image `sizes` attribute
   */
  sizes?: string;
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?: NativeImageProps["onLoad"];
  /**
   * A callback for when there was an error loading the image `src`
   */
  onError?: NativeImageProps["onError"];
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean;
  /**
   * The key used to set the crossOrigin on the HTMLImageElement into which the image will be loaded.
   * This tells the browser to request cross-origin access when trying to download the image data.
   */
  crossOrigin?: NativeImageProps["crossOrigin"];
  /**
   * Defines the `loading` attribute for the image
   */
  loading?: NativeImageProps["loading"];
  /**
   * If `true`, image load will be bypassed and the load will be handled by `as` component.
   */
  shouldBypassImageLoad?: boolean;
}

type Status = "loading" | "failed" | "pending" | "loaded";

export type FallbackStrategy = "onError" | "beforeLoadOrError";

type ImageEvent = SyntheticEvent<HTMLImageElement, Event>;
/**
 * React hook that loads an image in the browser,
 * and lets us know the `status` so we can show image
 * fallback if it is still `pending`
 *
 * @returns the status of the image loading progress
 *
 * @example
 *
 * ```jsx
 * function App(){
 *   const status = useImage({ src: "image.png" })
 *   return status === "loaded" ? <img src="image.png" /> : <Placeholder />
 * }
 * ```
 */

export function useImage(props: UseImageProps = {}) {
  const {
    onLoad,
    onError,
    ignoreFallback,
    src,
    crossOrigin,
    srcSet,
    sizes,
    loading,
    shouldBypassImageLoad = false,
  } = props;

  const isHydrated = useIsHydrated();

  const imageRef = useRef<HTMLImageElement | null>(null);

  const [status, setStatus] = useState<Status>("pending");

  const flush = useCallback(() => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  }, []);

  const load = useCallback((): Status => {
    if (!src) return "pending";
    if (ignoreFallback || shouldBypassImageLoad) return "loaded";

    // Flush any previous image to avoid stale handlers
    flush();

    const img = new Image();

    // CRITICAL: Attach handlers BEFORE setting src to avoid race condition
    // with cached images that fire onload synchronously
    img.onload = (event) => {
      flush();
      setStatus("loaded");
      onLoad?.(event as unknown as ImageEvent);
    };
    img.onerror = (error) => {
      flush();
      setStatus("failed");
      onError?.(error as any);
    };

    // Set properties AFTER handlers are attached
    if (crossOrigin) img.crossOrigin = crossOrigin;
    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    if (loading) img.loading = loading;

    // Set src last - this triggers the load
    img.src = src;

    imageRef.current = img;

    // Handle already-complete images (belt and suspenders for cached images)
    if (img.complete) {
      // Check both naturalWidth and naturalHeight to ensure image fully loaded
      if (img.naturalWidth && img.naturalHeight) {
        return "loaded";
      }

      // Image is complete but has no dimensions - it failed to load
      return "failed";
    }

    return "loading";
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, loading, shouldBypassImageLoad, flush]);

  useSafeLayoutEffect(() => {
    if (isHydrated) {
      setStatus(load());
    }
  }, [isHydrated, load]);

  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */
  return ignoreFallback ? "loaded" : status;
}

export const shouldShowFallbackImage = (status: Status, fallbackStrategy: FallbackStrategy) =>
  (status !== "loaded" && fallbackStrategy === "beforeLoadOrError") ||
  (status === "failed" && fallbackStrategy === "onError");

export type UseImageReturn = ReturnType<typeof useImage>;

"use client";

import type {ImgHTMLAttributes} from "react";

import {useState} from "react";

import {useIsomorphicLayoutEffect} from "../hooks/use-isomorphic-layout-effect";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

export interface UseImageLoadingStatusOptions {
  crossOrigin?: ImageProps["crossOrigin"];
  referrerPolicy?: ImageProps["referrerPolicy"];
}

const getImageLoadingStatus = (image: HTMLImageElement): ImageLoadingStatus => {
  if (!image.complete) return "loading";

  return image.naturalWidth > 0 ? "loaded" : "error";
};

/**
 * Preloads `src` off-DOM and reports its loading status, so an `img` can be
 * mounted only once it can paint. Stays `"idle"` on the server.
 */
export function useImageLoadingStatus(
  src: ImageProps["src"],
  {crossOrigin, referrerPolicy}: UseImageLoadingStatusOptions = {},
): ImageLoadingStatus {
  const [status, setStatus] = useState<ImageLoadingStatus>("idle");

  useIsomorphicLayoutEffect(() => {
    if (!src) {
      setStatus("error");

      return;
    }

    // Only URL strings can be preloaded; anything else React resolves itself.
    if (typeof src !== "string") {
      setStatus("loaded");

      return;
    }

    const image = new window.Image();
    const handleLoad = () => setStatus(getImageLoadingStatus(image));
    const handleError = () => setStatus("error");

    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);

    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }

    image.crossOrigin = crossOrigin ?? null;
    image.src = src;
    setStatus(getImageLoadingStatus(image));

    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
      setStatus("idle");
    };
  }, [src, crossOrigin, referrerPolicy]);

  return status;
}

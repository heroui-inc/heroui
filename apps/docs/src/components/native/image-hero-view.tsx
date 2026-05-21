"use client";

import type {NativeQRPreviewTarget} from "./qr-preview-popover/target";

import {DocsImage} from "../docs-image";

import {QRPreviewPopover} from "./qr-preview-popover";
import {pickNativeQRTarget} from "./qr-preview-popover/target";

/**
 * Props for {@link ImageHeroView}. The QR popover's `target` discriminator
 * is required at the call site so it has to make an explicit decision about
 * which app screen the QR should deep-link into.
 *
 * The hero only renders a single image so it has no additional props beyond
 * the QR target — `ImageHeroViewProps` is simply a type alias for the
 * discriminator.
 */
export type ImageHeroViewProps = NativeQRPreviewTarget;

/**
 * ImageHeroView pairs the HeroUI Native OG hero image with the QR popover.
 * Used by the docs landing page to introduce the library while letting
 * desktop visitors jump straight into the app from the same surface.
 */
export const ImageHeroView = (props: ImageHeroViewProps) => {
  return (
    <div className="flex flex-col items-end gap-4">
      <QRPreviewPopover {...pickNativeQRTarget(props)} />
      <DocsImage
        alt="HeroUI Native Introduction"
        darkSrc="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/heroui-native-og-dark-1.webp"
        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/heroui-native-og-light-1.webp"
      />
    </div>
  );
};

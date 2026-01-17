"use client";

import type {FC} from "react";

import {DocsImage} from "./docs-image";
import {NativeQRPreviewPopover} from "./native-qr-preview-popover";

/**
 * NativeImageHeroView component that displays the QR preview popover
 * and the semantic intent hierarchy image for the design principles page.
 */
export const NativeImageHeroView: FC = () => {
  return (
    <div className="flex flex-col items-end gap-4">
      <NativeQRPreviewPopover />
      <DocsImage
        alt="HeroUI v3 Introduction"
        darkSrc="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/heroui-native-og-dark.jpg"
        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/heroui-native-og-light.jpg"
      />
    </div>
  );
};

"use client";

import type {FC} from "react";

import {Button, Link, Popover} from "@heroui/react";
import Image from "next/image";

import {useIsMobileDevice} from "@/hooks/use-is-mobile-device";

import {Iconify} from "./iconify";

/**
 * External links used in the NativeQRPreviewPopover component
 */
const LINKS = {
  /**
   * App Store link for Expo Go
   */
  APP_STORE: "https://apps.apple.com/app/expo-go/id982107779",
  /**
   * Link to open the native preview app
   */
  NATIVE_PREVIEW: "https://link.heroui.com/native-demo",
  /**
   * Play Store link for Expo Go
   */
  PLAY_STORE: "https://play.google.com/store/apps/details?id=host.exp.exponent",
  /**
   * QR code image URL for desktop/tablet scanning
   */
  QR_CODE_IMAGE: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/qr-code-native.png",
} as const;

/**
 * NativeQRPreviewPopover component that displays a popover with QR code or link
 * for previewing HeroUI Native components on mobile devices.
 */
export const NativeQRPreviewPopover: FC = () => {
  const isMobile = useIsMobileDevice();

  return (
    <Popover>
      <Button
        aria-label={isMobile ? "Tap to preview" : "Scan to preview"}
        className="bg-default/70"
        size="sm"
        variant="tertiary"
      >
        {!isMobile && <Iconify icon="gravity-ui:qr-code" width={16} />}
        {isMobile ? "Tap to preview" : "Scan to preview"}
      </Button>
      <Popover.Content className="max-w-xs rounded-2xl" offset={6} placement="bottom end">
        <Popover.Dialog className="flex flex-col items-center gap-4 p-6">
          <span className="text-center text-xs text-foreground">
            {isMobile
              ? "Tap the link below to preview the HeroUI Native components on your mobile device."
              : "Scan this QR code with your camera app to preview the HeroUI Native components."}
          </span>
          {isMobile ? (
            <Link
              className="flex w-full items-center gap-3 rounded-xl border border-foreground/20 p-2 px-4"
              href={LINKS.NATIVE_PREVIEW}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">Open Preview App</span>
                <span className="text-xs text-muted/75">link.heroui.com/native-demo</span>
              </div>
              <Link.Icon />
            </Link>
          ) : (
            <Image
              alt="QR code for native component preview"
              height={200}
              src={LINKS.QR_CODE_IMAGE}
              width={200}
            />
          )}
          <span className="mb-2 text-center text-xs text-foreground">
            Expo must be installed on your device.
          </span>
          <div className="flex w-full flex-col items-center gap-2">
            <a
              className="button button--primary button--sm"
              href={LINKS.APP_STORE}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Iconify icon="tabler:brand-apple-filled" width={20} />
              Download on App Store
            </a>
            <a
              className="button button--tertiary button--sm"
              href={LINKS.PLAY_STORE}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Iconify icon="simple-icons:googleplay" width={20} />
              Download on Play Store
            </a>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};

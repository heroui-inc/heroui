"use client";

import type {FC} from "react";

import {Button, Popover, cn} from "@heroui/react";
import Image from "next/image";

import {Iconify} from "./iconify";
import {VideoPlayer} from "./video-player";

interface NativeVideoPlayerViewProps {
  /**
   * Video source URL
   */
  src: string;
  /**
   * Video poster image URL
   */
  poster?: string;
  /**
   * Video height
   */
  height?: number;
  /**
   * Video width
   */
  width?: number;
  /**
   * Play mode: auto or manual
   */
  playMode?: "auto" | "manual";
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean;
  /**
   * Whether to show video controls
   */
  controls?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * NativeVideoPlayerView component that wraps VideoPlayer with a QR code popover button
 * in the top right corner for previewing native components.
 */
export const NativeVideoPlayerView: FC<NativeVideoPlayerViewProps> = ({
  autoPlay,
  className,
  controls,
  height = 300,
  playMode,
  poster,
  src,
  width,
}) => {
  return (
    <div className={cn("relative", className)}>
      <VideoPlayer
        autoPlay={autoPlay}
        controls={controls}
        height={height}
        playMode={playMode}
        poster={poster}
        src={src}
        width={width}
      />
      <Popover>
        <Button
          aria-label="Scan to preview"
          className="absolute right-3 top-3 z-50"
          size="sm"
          variant="tertiary"
        >
          <Iconify icon="gravity-ui:qr-code" width={16} />
          Scan to preview
        </Button>
        <Popover.Content className="max-w-xs rounded-2xl" offset={6} placement="bottom end">
          <Popover.Dialog className="flex flex-col items-center gap-4 p-6">
            <span className="text-foreground text-center text-xs">
              Scan this QR code with your camera app to preview the HeroUI native components.
            </span>
            <Image
              alt="QR code for native component preview"
              height={200}
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/qr-code-native.png"
              width={200}
            />
            <span className="text-foreground mb-2 text-center text-xs">
              Expo must be installed on your device.
            </span>
            <div className="flex w-full flex-col items-center gap-2">
              <Button asChild size="sm">
                <a
                  href="https://apps.apple.com/app/expo-go/id982107779"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Iconify icon="tabler:brand-apple-filled" width={20} />
                  Download on App Store
                </a>
              </Button>
              <Button asChild size="sm" variant="tertiary">
                <a
                  href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Iconify icon="simple-icons:googleplay" width={20} />
                  Download on Play Store
                </a>
              </Button>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
};

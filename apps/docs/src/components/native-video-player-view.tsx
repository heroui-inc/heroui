"use client";

import type {FC} from "react";

import {cn} from "@heroui/react";
import {useTheme} from "next-themes";

import {NativeQRPreviewPopover} from "./native-qr-preview-popover";
import {VideoPlayer} from "./video-player";

interface NativeVideoPlayerViewProps {
  /**
   * Video source URL for light theme
   */
  srcLight: string;
  /**
   * Video source URL for dark theme
   */
  srcDark: string;
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
   * Whether to show the QR code preview button
   * @default true
   */
  showQRCode?: boolean;
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
  showQRCode = true,
  srcDark,
  srcLight,
  width,
}) => {
  const {resolvedTheme} = useTheme();

  // Determine which video source to use based on the current theme
  // Default to light theme if resolvedTheme is undefined (during SSR)
  const videoSrc = resolvedTheme === "dark" ? srcDark : srcLight;

  return (
    <div className={cn("flex flex-col items-end gap-4", className)}>
      {!!showQRCode && <NativeQRPreviewPopover />}

      <VideoPlayer
        autoPlay={autoPlay}
        controls={controls}
        height={height}
        playMode={playMode}
        poster={poster}
        src={videoSrc}
        width={width}
      />
    </div>
  );
};

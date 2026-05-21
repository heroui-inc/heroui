"use client";

import type {NativeQRPreviewTarget} from "./qr-preview-popover/target";

import {cn} from "@heroui/react";
import {useTheme} from "next-themes";

import {VideoPlayer} from "../video-player";

import {QRPreviewPopover} from "./qr-preview-popover";
import {pickNativeQRTarget} from "./qr-preview-popover/target";

interface VideoPlayerViewBaseProps {
  /**
   * Video source URL used while the page is in light theme.
   */
  srcLight: string;
  /**
   * Video source URL used while the page is in dark theme.
   */
  srcDark: string;
  /**
   * Optional poster image URL. Forwarded verbatim to the underlying
   * VideoPlayer.
   */
  poster?: string;
  /**
   * Height of the video player in CSS pixels. Default matches the standard
   * docs grid row height so the QR button sits above the video at a
   * consistent offset.
   * @default 300
   */
  height?: number;
  /**
   * Width of the video player in CSS pixels. Defaults to the container width.
   */
  width?: number;
  /**
   * Either "auto" (play whenever the viewport intersects) or "manual"
   * (user-triggered). Forwarded to VideoPlayer.
   */
  playMode?: "auto" | "manual";
  /**
   * Whether to start playing as soon as the video is in view. Forwarded to
   * VideoPlayer.
   */
  autoPlay?: boolean;
  /**
   * Whether to show native HTML video controls. Forwarded to VideoPlayer.
   */
  controls?: boolean;
  /**
   * Whether to show the QR code preview button.
   *
   * Even when `false`, the wrapper still requires `target` (the type is
   * unconditionally required at every level to prevent accidental
   * misconfiguration). `target` is simply ignored at runtime when the popover
   * is not rendered.
   *
   * @default true
   */
  showQRCode?: boolean;
  /**
   * Optional extra class names applied to the outer wrapper.
   */
  className?: string;
}

/**
 * Props for {@link VideoPlayerView}. The QR popover's `target` discriminator
 * is required at the wrapper level so every call site has to make a deliberate
 * choice between `"auto"`, `"home"`, and `"component"`.
 */
export type VideoPlayerViewProps = VideoPlayerViewBaseProps & NativeQRPreviewTarget;

/**
 * VideoPlayerView wraps the docs VideoPlayer with a "Scan to preview" popover
 * button anchored to the top-right corner. Used on every Native component
 * doc page and in release-notes demos.
 */
export const VideoPlayerView = (props: VideoPlayerViewProps) => {
  const {
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
  } = props;
  const {resolvedTheme} = useTheme();

  // Default to the light video during SSR (resolvedTheme is undefined until
  // mounted). The mismatch is acceptable because the video tag re-renders
  // immediately after hydration with the correct src.
  const videoSrc = resolvedTheme === "dark" ? srcDark : srcLight;

  return (
    <div className={cn("flex flex-col items-end gap-4", className)}>
      {!!showQRCode && <QRPreviewPopover {...pickNativeQRTarget(props)} />}

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

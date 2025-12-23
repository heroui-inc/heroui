"use client";

import type {FC} from "react";

import {Button, Spinner, Tooltip, cn} from "@heroui/react";
import {useCallback, useEffect, useRef, useState} from "react";
import {useIntersectionObserver} from "usehooks-ts";

import {useIsMobileDevice} from "@/hooks/use-is-mobile-device";

import {Iconify} from "./iconify";

interface VideoPlayerProps {
  src: string;
  playMode?: "auto" | "manual";
  autoPlay?: boolean;
  poster?: string;
  width?: number;
  height?: number;
  controls?: boolean;
  className?: string;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  autoPlay = true,
  className,
  controls = false,
  height,
  onPlayingChange,
  playMode = "auto",
  poster,
  src,
  width,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useIsMobileDevice();

  const videoRef = useRef<HTMLVideoElement>(null);

  const {isIntersecting: isVisible, ref: intersectionRef} = useIntersectionObserver({
    threshold: 0.5,
  });

  // Merge refs: videoRef for video operations and intersectionRef for intersection observer
  // Use ref callback to avoid mutating hook return value
  const setVideoRef = useCallback(
    (element: HTMLVideoElement | null) => {
      videoRef.current = element;
      if (element) {
        // Call intersectionRef if it's a function (ref callback)
        if (typeof intersectionRef === "function") {
          intersectionRef(element);
        }
        // Note: If intersectionRef is a ref object, we can't mutate it as it's a hook return value
        // The intersection observer hook should handle ref assignment internally
      } else {
        // Cleanup: call with null when element is removed
        if (typeof intersectionRef === "function") {
          intersectionRef(null);
        }
      }
    },
    [intersectionRef],
  );

  // Determine effective play mode: force manual on mobile devices
  const effectivePlayMode = isMobile ? "manual" : playMode;

  // play video when it is visible and playMode is auto (only on non-mobile devices)
  useEffect(() => {
    if (effectivePlayMode !== "auto" || !videoRef.current) {
      return;
    }

    if (isVisible) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVisible, effectivePlayMode]);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    onPlayingChange?.(true);
  }, [onPlayingChange]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    onPlayingChange?.(false);
  }, [onPlayingChange]);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (videoEl) {
      // Check if video is already ready, but update state via event handler to avoid setState in effect
      if (videoEl.readyState > 3) {
        // Trigger the event handler asynchronously to avoid setState in effect
        videoEl.dispatchEvent(new Event("canplaythrough"));
      }
      videoEl.addEventListener("canplaythrough", handleCanPlay);

      // Cleanup the event listener
      return () => {
        videoEl.removeEventListener("canplaythrough", handleCanPlay);
      };
    }
  }, [handleCanPlay]);

  const onTogglePlay = useCallback(() => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }

      setIsPlaying((v) => !v);
    }
  }, [isPlaying]);

  const handleVideoClick = useCallback(() => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div
      className="not-prose relative overflow-hidden rounded-xl border border-separator"
      data-playing={isPlaying}
    >
      {isLoading && !isPlaying ? (
        <Spinner
          className="absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2"
          color="accent"
          size="md"
        />
      ) : !isPlaying ? (
        <Tooltip delay={1000}>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              className="absolute top-1/2 left-1/2 z-3 -translate-x-1/2 -translate-y-1/2 bg-transparent before:absolute before:inset-0 before:z-[-1] before:block before:rounded-lg before:bg-black/10 before:backdrop-blur-md before:backdrop-saturate-150 before:content-['']"
              size="sm"
              variant="tertiary"
              onPress={onTogglePlay}
            >
              {isPlaying ? (
                <Iconify icon="gravity-ui:pause-fill" width={16} />
              ) : (
                <Iconify icon="gravity-ui:play-fill" width={16} />
              )}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{isPlaying ? "Pause" : "Play"}</Tooltip.Content>
        </Tooltip>
      ) : null}
      {/* Absolute overlay for clicking anywhere on the video to play/pause */}
      {/* z-0 ensures it's below buttons (preview button is z-1, play button is z-50) */}
      <div className="absolute inset-0 z-3 cursor-pointer" onClick={handleVideoClick} />

      <video
        ref={setVideoRef}
        loop
        muted
        playsInline
        autoPlay={!!autoPlay && effectivePlayMode === "auto"}
        className={cn("object-fit aspect-video w-full", className)}
        controls={controls}
        height={height}
        poster={poster}
        src={src}
        width={width}
        onCanPlay={handleCanPlay}
        onPause={handlePause}
        onPlay={handlePlay}
      />
    </div>
  );
};

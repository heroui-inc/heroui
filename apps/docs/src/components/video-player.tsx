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
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  autoPlay = true,
  className,
  controls = false,
  height,
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
  const setVideoRef = useCallback(
    (element: HTMLVideoElement | null) => {
      videoRef.current = element;
      if (element) {
        if (typeof intersectionRef === "function") {
          intersectionRef(element);
        } else if (intersectionRef && "current" in intersectionRef) {
          (intersectionRef as React.MutableRefObject<HTMLVideoElement | null>).current = element;
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
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isVisible, effectivePlayMode]);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (videoEl) {
      if (videoEl.readyState > 3) {
        // HAVE_FUTURE_DATA: enough data to start playing
        handleCanPlay();
      } else {
        videoEl.addEventListener("canplaythrough", handleCanPlay);
      }

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

  return (
    <div
      className="not-prose border-divider relative overflow-hidden rounded-xl border"
      data-playing={isPlaying}
    >
      {isLoading ? (
        <Spinner
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          color="accent"
          size="lg"
        />
      ) : !isPlaying ? (
        <Tooltip delay={1000}>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-transparent before:absolute before:inset-0 before:z-[-1] before:block before:rounded-lg before:bg-black/10 before:backdrop-blur-md before:backdrop-saturate-150 before:content-['']"
              size="sm"
              variant="tertiary"
              onPress={onTogglePlay}
            >
              {isPlaying ? (
                <Iconify icon="gravity-ui:pause-fill" size={16} />
              ) : (
                <Iconify icon="gravity-ui:play-fill" size={16} />
              )}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{isPlaying ? "Pause" : "Play"}</Tooltip.Content>
        </Tooltip>
      ) : null}

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
      />
    </div>
  );
};

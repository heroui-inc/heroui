"use client";

import type {FC} from "react";

import {ArrowRotateLeft, VolumeFill, VolumeSlashFill} from "@gravity-ui/icons";
import {Button, Spinner, Tooltip, cn} from "@heroui/react";
import {useCallback, useEffect, useRef, useState} from "react";
import {useIntersectionObserver} from "usehooks-ts";

import {useIsMobileDevice} from "@/hooks/use-is-mobile-device";

import {Iconify} from "./iconify";

interface VideoPlayerProps {
  src: string;
  playMode?: "auto" | "manual";
  autoPlay?: boolean;
  muted?: boolean;
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
  muted = false,
  onPlayingChange,
  playMode = "auto",
  poster,
  src,
  width,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
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
        if (element.readyState >= 3) {
          setIsLoading(false);
        }
        if (typeof intersectionRef === "function") {
          intersectionRef(element);
        }
      } else {
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
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
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

  const onToggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted((v) => !v);
    }
  }, [isMuted]);

  const onRestart = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, []);

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
      className="not-prose relative z-1 overflow-hidden rounded-xl border border-separator"
      data-playing={isPlaying}
    >
      {isLoading ? (
        <Spinner
          className="absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2"
          color="accent"
          size="md"
        />
      ) : null}

      <div className="absolute right-3 bottom-3 z-2 flex items-center gap-1">
        <Tooltip delay={500}>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              className="bg-transparent before:absolute before:inset-0 before:z-[-1] before:block before:rounded-lg before:bg-black/10 before:backdrop-blur-md before:backdrop-saturate-150 before:content-['']"
              size="sm"
              variant="tertiary"
              onPress={onTogglePlay}
            >
              {isPlaying ? (
                <Iconify className="text-white" icon="gravity-ui:pause-fill" width={16} />
              ) : (
                <Iconify className="text-white" icon="gravity-ui:play-fill" width={16} />
              )}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{isPlaying ? "Pause" : "Play"}</Tooltip.Content>
        </Tooltip>

        <Tooltip delay={500}>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              className="bg-transparent before:absolute before:inset-0 before:z-[-1] before:block before:rounded-lg before:bg-black/10 before:backdrop-blur-md before:backdrop-saturate-150 before:content-['']"
              size="sm"
              variant="tertiary"
              onPress={onToggleMute}
            >
              {isMuted ? (
                <VolumeSlashFill className="size-4 text-white" />
              ) : (
                <VolumeFill className="size-4 text-white" />
              )}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{isMuted ? "Unmute" : "Mute"}</Tooltip.Content>
        </Tooltip>

        <Tooltip delay={500}>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              className="bg-transparent before:absolute before:inset-0 before:z-[-1] before:block before:rounded-lg before:bg-black/10 before:backdrop-blur-md before:backdrop-saturate-150 before:content-['']"
              size="sm"
              variant="tertiary"
              onPress={onRestart}
            >
              <ArrowRotateLeft className="size-4 text-white" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Restart</Tooltip.Content>
        </Tooltip>
      </div>

      <div className="absolute inset-0 z-1 cursor-pointer" onClick={handleVideoClick} />

      <video
        ref={setVideoRef}
        loop
        playsInline
        autoPlay={!!autoPlay && effectivePlayMode === "auto"}
        className={cn("object-fit aspect-video w-full", className)}
        controls={controls}
        height={height}
        muted={isMuted}
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

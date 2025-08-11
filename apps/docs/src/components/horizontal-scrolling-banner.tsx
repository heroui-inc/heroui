"use client";

import React from "react";

import {cn} from "@/utils/cn";

interface HorizontalScrollingBannerProps {
  children: React.ReactNode;
  className?: string;
  duration?: number; // in seconds
  gap?: string;
  isReverse?: boolean;
  shouldPauseOnHover?: boolean;
  showShadow?: boolean;
  shadowSize?: string;
}

const HorizontalScrollingBanner = React.forwardRef<HTMLDivElement, HorizontalScrollingBannerProps>(
  (
    {
      children,
      className,
      duration = 40,
      gap = "1rem",
      isReverse = false,
      shadowSize = "60px",
      shouldPauseOnHover = true,
      showShadow = true,
    },
    ref,
  ) => {
    const maskImage = showShadow
      ? `linear-gradient(to right, transparent, #000 ${shadowSize}, #000 calc(100% - ${shadowSize}), transparent)`
      : undefined;

    return (
      <div
        ref={ref}
        className={cn("flex w-full overflow-x-hidden", className)}
        style={
          {
            "--duration": `${duration}s`,
            "--gap": gap,
            WebkitMaskImage: maskImage,
            maskImage,
          } as React.CSSProperties
        }
      >
        <div
          className="flex w-max items-stretch"
          style={{
            animation: `scrolling-banner var(--duration) linear infinite`,
            animationDirection: isReverse ? "reverse" : "normal",
            gap: `var(--gap)`,
          }}
          onMouseEnter={(e) => {
            if (shouldPauseOnHover) {
              e.currentTarget.style.animationPlayState = "paused";
            }
          }}
          onMouseLeave={(e) => {
            if (shouldPauseOnHover) {
              e.currentTarget.style.animationPlayState = "running";
            }
          }}
        >
          {/* Clone children and duplicate for seamless loop */}
          {React.Children.map(children, (child, index) => (
            <div key={`original-${index}`} className="flex-shrink-0">
              {React.cloneElement(child as React.ReactElement)}
            </div>
          ))}
          {React.Children.map(children, (child, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              {React.cloneElement(child as React.ReactElement)}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

HorizontalScrollingBanner.displayName = "HorizontalScrollingBanner";

export default HorizontalScrollingBanner;

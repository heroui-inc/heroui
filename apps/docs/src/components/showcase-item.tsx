"use client";

import type {ShowcaseItem as ShowcaseItemType} from "@/showcases";
import type {ReactNode} from "react";
import type {UrlObject} from "url";

import {chipVariants} from "@heroui/react";
import Link from "next/link";

import {cn} from "@/utils/cn";

interface ShowcaseItemProps extends React.ComponentProps<"div"> {
  item: ShowcaseItemType;
  href: string;
  children?: ReactNode;
  isSelected?: boolean;
  isMinimal?: boolean;
  className?: string;
}

export function ShowcaseItem({
  className,
  href,
  isMinimal = false,
  isSelected = false,
  item,
  ...props
}: ShowcaseItemProps) {
  const {posterUrl, status, title, videoUrl} = item;

  return (
    <Link href={href as unknown as UrlObject}>
      <div
        className={cn(
          "group relative flex h-[250px] flex-col items-center justify-center",
          {
            "h-[44px] w-[60px]": isMinimal,
          },
          className,
        )}
        {...props}
      >
        {/* Status chip */}
        {!!status && !isMinimal && (
          <div className="absolute right-2 top-1.5 z-10">
            <span
              className={cn(
                chipVariants({
                  className: cn(
                    "h-6 rounded-full border border-white/10 bg-black/30 px-1.5 text-[11px] text-white/80 shadow-sm saturate-200 backdrop-blur-md",
                  ),
                }),
                "font-medium capitalize shadow-sm",
                {"bg-white/10": item.defaultTheme === "dark" && !item.supportsThemeSwitching},
              )}
            >
              {status}
            </span>
          </div>
        )}
        <div
          className={cn(
            "shadow-border group-hover:drop-shadow-black/15 ease-out-quad h-full w-full overflow-hidden rounded-xl border border-transparent object-cover transition-all duration-[250ms] will-change-transform group-hover:scale-[1.02] group-hover:drop-shadow-xl",
            {
              "aspect-video h-full w-full rounded-lg": isMinimal,
              "border-foreground/60": isSelected,
            },
          )}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className={isMinimal ? "h-full w-full" : ""}
            poster={posterUrl}
            preload="none"
          >
            <source src={videoUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
        {!isMinimal && (
          <div className="mt-3 flex items-end justify-between px-1">
            <span className="text-foreground/50 group-hover:text-foreground/80 ease-out-quad text-sm transition-[color] duration-[250ms]">
              {title}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

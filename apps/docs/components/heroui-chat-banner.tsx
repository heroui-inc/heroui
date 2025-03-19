"use client";

import {Icon} from "@iconify/react/dist/offline";
import arrowRightIcon from "@iconify/icons-solar/arrow-right-linear";
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import {usePostHog} from "posthog-js/react";

import emitter from "@/libs/emitter";

const hideOnPaths = ["examples"];

export const HeroUIChatBanner = () => {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("HeroUI Chat Banner", {
      action: "click",
      category: "landing-page",
    });
  };

  const pathname = usePathname();
  const shouldBeVisible = !hideOnPaths.some((path) => pathname.includes(path));

  useEffect(() => {
    if (!shouldBeVisible) return;

    // listen to scroll event, dispatch an event when scroll is at the top < 48 px
    const handleScroll = () => {
      if (window.scrollY < 48) {
        emitter.emit("proBannerVisibilityChange", "visible");
      } else {
        emitter.emit("proBannerVisibilityChange", "hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldBeVisible]);

  if (!shouldBeVisible) return null;

  return (
    <div className="relative z-50 isolate flex items-center gap-x-6 overflow-hidden bg-background border-b-1 border-divider px-6 py-2 sm:px-3.5 sm:before:flex-1">
      <div className="flex w-full items-center justify-between md:justify-center gap-x-3">
        <a
          className="text-small flex items-end sm:text-[0.93rem] text-foreground hover:opacity-80 transition-opacity"
          href="https://heroui.chat?utm_source=heroui.com&utm_medium=top-banner"
          rel="noopener noreferrer"
          target="_blank"
          onClick={handleClick}
        >
          <span aria-label="rocket" className="hidden md:block" role="img">
            🚀
          </span>
          <span
            className="inline-flex md:ml-1 animate-text-gradient font-medium bg-clip-text text-transparent bg-[linear-gradient(90deg,#27272A_0%,#52525B_50%,#52525B_100%)] dark:bg-[linear-gradient(90deg,#E5E5E5_0%,#A1A1AA_50%,#E5E5E5_100%)]"
            style={{
              fontSize: "inherit",
              backgroundSize: "200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Generate, edit and deploy beautiful apps
          </span>
        </a>
        <a
          className="flex group min-w-[120px] items-center font-semibold text-background bg-foreground shadow-sm gap-1.5 relative overflow-hidden rounded-full p-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          href="https://heroui.chat?utm_source=heroui.com&utm_medium=top-banner"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-foreground group-hover:bg-foreground/70 transition-background px-3 py-1 text-sm font-medium text-background">
            HeroUI Chat
            <Icon
              aria-hidden="true"
              className="outline-none transition-transform group-hover:translate-x-0.5 [&>path]:stroke-[2px]"
              icon={arrowRightIcon}
              width={16}
            />
          </div>
        </a>
      </div>
    </div>
  );
};

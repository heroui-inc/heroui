"use client";

import {Button, TooltipArrow, TooltipContent, TooltipRoot, TooltipTrigger} from "@heroui/react";
import React from "react";

import {Iconify} from "@/components/iconify";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {cn} from "@/utils/cn";

import {useShowcase} from "./showcase-wrapper";

export function ShowcaseThemeSwitch() {
  const {setShowcaseTheme, showcaseTheme, supportsThemeSwitching} = useShowcase();
  const isMounted = useIsMounted();
  const isDisabled = !supportsThemeSwitching;

  if (!isMounted) {
    return (
      <Button
        isIconOnly
        aria-label="Toggle showcase theme"
        className="border-none"
        isDisabled={isDisabled}
        variant="tertiary"
      >
        <div className="relative h-5 w-5">
          <Iconify className="h-5 w-5 text-foreground/70" icon="sun" />
        </div>
      </Button>
    );
  }

  const isDark = showcaseTheme === "dark";

  const onPress = () => {
    if (!isDisabled) {
      setShowcaseTheme(isDark ? "light" : "dark");
    }
  };

  // Determine the tooltip content based on whether switching is disabled
  const tooltipContent = isDisabled
    ? "Theme switching not supported for this showcase"
    : "Toggle theme";

  return (
    <TooltipRoot delay={1500}>
      <TooltipTrigger>
        <Button
          isIconOnly
          aria-label="Toggle showcase theme"
          className={cn("border-none", isDisabled && "cursor-not-allowed opacity-50")}
          isDisabled={isDisabled}
          variant="secondary"
          onPress={onPress}
        >
          <Iconify className="m-0 text-foreground/70" icon={isDark ? "moon" : "sun"} />
        </Button>
      </TooltipTrigger>
      <TooltipContent offset={7}>
        <TooltipArrow />
        <p className="text-xs text-muted">{tooltipContent}</p>
      </TooltipContent>
    </TooltipRoot>
  );
}

"use client";

import {
  Button,
  KbdContent,
  KbdRoot,
  TooltipArrow,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "@heroui/react";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

import {HeroUILogo} from "@/components/heroui-logo";
import {Iconify} from "@/components/iconify";

import {ShowcaseThemeSwitch} from "./showcase-theme-switch";
import {useShowcase} from "./showcase-wrapper";

export function ShowcaseHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {isCodeVisible, toggleCode} = useShowcase();

  // Get the returnUrl parameter, default to /showcase if not present
  const returnUrl = searchParams.get("returnUrl") || "/showcase";

  const onClose = () => {
    router.push(returnUrl as any);
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [returnUrl]);

  return (
    <header className="z-[1] flex items-center justify-between bg-background/50 p-4 backdrop-blur-sm">
      <div className="flex flex-1 justify-start">
        <TooltipRoot delay={0}>
          <TooltipTrigger>
            <Button isIconOnly aria-label="Close" variant="secondary" onPress={onClose}>
              <Iconify className="text-foreground/70" icon="xmark" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-0.5 text-xs text-muted" offset={7} placement="bottom">
            <TooltipArrow />
            Press{" "}
            <KbdRoot>
              <KbdContent className="text-xs">Esc</KbdContent>
            </KbdRoot>{" "}
            to close
          </TooltipContent>
        </TooltipRoot>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <HeroUILogo className="text-foreground/20" />
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <ShowcaseThemeSwitch />
        <TooltipRoot delay={1500}>
          <TooltipTrigger>
            <Button
              isIconOnly
              aria-label="Toggle showcase code"
              variant={isCodeVisible ? "primary" : "secondary"}
              onPress={toggleCode}
            >
              <Iconify className={isCodeVisible ? "" : "text-foreground/70"} icon="code" />
            </Button>
          </TooltipTrigger>
          <TooltipContent offset={7}>
            <TooltipArrow />
            <p className="text-xs text-muted">{isCodeVisible ? "Hide code" : "Show code"}</p>
          </TooltipContent>
        </TooltipRoot>
        {/* TODO: Add this later */}
        {/* <Button isIconOnly aria-label="Open showcase in new tab" variant="secondary">
          <Iconify className="text-foreground/70" icon="arrow-up-right-from-square" />
        </Button> */}
      </div>
    </header>
  );
}

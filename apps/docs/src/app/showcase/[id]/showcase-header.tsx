"use client";

import {Button, Kbd, Tooltip} from "@heroui/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

import {HeroUILogo} from "@/components/heroui-logo";
import {Iconify} from "@/components/iconify";

import {ShowcaseThemeSwitch} from "./showcase-theme-switch";
import {useShowcase} from "./showcase-wrapper";

export function ShowcaseHeader() {
  const router = useRouter();
  const {isCodeVisible, toggleCode} = useShowcase();

  const onClose = () => {
    router.push("/showcase");
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
  }, []);

  return (
    <header className="border-border/50 bg-background/50 z-[1] flex items-center justify-between border-b p-4 backdrop-blur-sm">
      <div className="flex flex-1 justify-start">
        <Tooltip delay={0}>
          <Button isIconOnly aria-label="Close" variant="secondary" onPress={onClose}>
            <Iconify className="text-foreground/70" icon="xmark" />
          </Button>
          <Tooltip.Content className="text-muted px-2 py-0.5 text-xs" offset={7} placement="bottom">
            <Tooltip.Arrow />
            Press{" "}
            <Kbd>
              <Kbd.Content className="text-xs">Esc</Kbd.Content>
            </Kbd>{" "}
            to close
          </Tooltip.Content>
        </Tooltip>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <HeroUILogo className="text-foreground/20" />
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <ShowcaseThemeSwitch />
        <Tooltip delay={1500}>
          <Button
            isIconOnly
            aria-label="Toggle showcase code"
            variant={isCodeVisible ? "primary" : "secondary"}
            onPress={toggleCode}
          >
            <Iconify className={isCodeVisible ? "" : "text-foreground/70"} icon="code" />
          </Button>
          <Tooltip.Content offset={7}>
            <Tooltip.Arrow />
            <p className="text-muted text-xs">{isCodeVisible ? "Hide code" : "Show code"}</p>
          </Tooltip.Content>
        </Tooltip>
        {/* TODO: Add this later */}
        {/* <Button isIconOnly aria-label="Open showcase in new tab" variant="secondary">
          <Iconify className="text-foreground/70" icon="arrow-up-right-from-square" />
        </Button> */}
      </div>
    </header>
  );
}

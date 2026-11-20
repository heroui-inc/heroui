"use client";

import {ChevronDown} from "@gravity-ui/icons";
import {Popover} from "@heroui/react";
import {useState} from "react";

import {useCurrentFramework} from "@/hooks/use-current-framework";
import {cn} from "@/utils/cn";
import {currentVersion} from "@/utils/version";

export function VersionSelector({className}: {className?: string}) {
  const [open, setOpen] = useState(false);
  const currentFramework = useCurrentFramework();

  if (currentFramework === "native") {
    return null;
  }

  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={cn(
          "flex cursor-(--cursor-interactive) items-center gap-1 rounded-md text-[13px] leading-none text-(--docs-fg-subtle) transition-colors outline-none hover:text-(--docs-fg) focus-visible:ring-2 focus-visible:ring-focus",
          className,
        )}
      >
        <span className="max-w-[100px] truncate">v{currentVersion}</span>
        <ChevronDown className={cn("size-2.5 transition-transform", open && "rotate-180")} />
      </Popover.Trigger>
      <Popover.Content className="min-w-[180px] rounded-2xl p-0" placement="bottom start">
        <Popover.Dialog className="flex flex-col gap-0.5 p-1">
          <div className="flex h-9 items-center justify-between rounded-xl bg-(--docs-item-active) px-3 text-[13px] font-medium text-foreground">
            <span>v3</span>
            <span className="ms-2 text-xs text-(--docs-fg-muted)">{currentVersion}</span>
          </div>
          <a
            className="flex h-9 items-center justify-between rounded-xl px-3 text-[13px] text-(--docs-fg-muted) transition-colors hover:bg-(--docs-item-hover) hover:text-foreground"
            href="https://v2.heroui.com?utm_source=v3.heroui.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>v2</span>
            <span className="ms-2 text-xs">2.8.x</span>
          </a>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

"use client";

import {Popover, Separator} from "@heroui/react";
import Link from "next/link";
import {useState} from "react";

import {useCurrentFramework} from "@/hooks/use-current-framework";
import {cn} from "@/utils/cn";
import {currentVersion} from "@/utils/version";

import {Iconify} from "./iconify";

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
          "flex items-center gap-1.5 py-1 text-left text-xs font-medium text-muted transition-opacity hover:opacity-80 sm:text-sm",
          className,
        )}
      >
        <span className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
          {currentVersion}
        </span>
        <Iconify icon="chevron-down" />
      </Popover.Trigger>
      <Popover.Content className="min-w-[180px] p-0" placement="bottom end">
        <Popover.Dialog className="px-1 py-1">
          <div className="flex flex-col gap-0">
            <div className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium">
              <span>v3</span>
              <span className="ml-2 text-xs font-semibold text-muted">{currentVersion}</span>
            </div>
            <div className="my-0.5 px-2">
              <Separator />
            </div>
            <Link
              className="flex items-center justify-between rounded-3xl px-3 py-2 text-sm text-muted hover:bg-default-hover hover:text-foreground"
              href="https://heroui.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>v2</span>
              <span className="ml-2 text-xs font-semibold text-muted">2.8.x</span>
            </Link>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

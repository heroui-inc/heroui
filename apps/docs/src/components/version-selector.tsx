"use client";

import {Popover, PopoverContent, PopoverTrigger} from "fumadocs-ui/components/ui/popover";
import Link from "next/link";
import {useState} from "react";

import {cn} from "@/utils/cn";
import {currentVersion} from "@/utils/version";

import {Iconify} from "./iconify";

export function VersionSelector({className}: {className?: string}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "flex items-center gap-1.5 py-1 text-left text-xs font-medium text-muted transition-opacity hover:opacity-80 sm:text-sm",
          className,
        )}
      >
        <span className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
          {currentVersion}
        </span>
        <Iconify icon="chevron-down" />
      </PopoverTrigger>
      <PopoverContent align="end" className="min-w-[180px] p-1">
        <div className="flex flex-col gap-1">
          <div className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium">
            <span>v3</span>
            <span className="ml-2 text-xs font-semibold text-muted">{currentVersion}</span>
          </div>
          <Link
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted hover:bg-muted/30 hover:text-foreground"
            href="https://heroui.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>v2</span>
            <span className="ml-2 text-xs font-semibold text-muted">2.8.x</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import {Chip} from "@heroui/react";
import * as React from "react";

import {useDictionary} from "@/hooks/use-dictionary";

export type StatusChipStatus = "new" | "new-dot" | "preview" | "updated";

interface StatusChipProps {
  status: StatusChipStatus;
  className?: string;
}

export function StatusChip({className, status}: StatusChipProps) {
  const dict = useDictionary().statusChip;

  if (status === "new") {
    return (
      <Chip
        className={`h-5 rounded-full bg-pink-400/8 px-1.5 text-[10px] font-semibold text-pink-400/90 ${className || ""}`}
        variant="primary"
      >
        {dict.new}
      </Chip>
    );
  }

  if (status === "preview") {
    return (
      <Chip
        className={`h-5 rounded-full border border-foreground/10 px-1.5 text-[10px] text-foreground/60 ${className || ""}`}
        variant="tertiary"
      >
        {dict.preview}
      </Chip>
    );
  }

  if (status === "updated") {
    return (
      <Chip
        className={`h-5 rounded-full bg-black/3 px-1.5 text-[10px] text-muted/90 dark:bg-white/8 ${className || ""}`}
        variant="primary"
      >
        {dict.updated}
      </Chip>
    );
  }

  return null;
}

export default StatusChip;

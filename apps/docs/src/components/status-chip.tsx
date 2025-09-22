import {Chip} from "@heroui/react";
import * as React from "react";

export type StatusChipStatus = "new" | "preview";

interface StatusChipProps {
  status: StatusChipStatus;
  className?: string;
}

export function StatusChip({className, status}: StatusChipProps) {
  if (status === "new") {
    return (
      <Chip
        className={`text-foreground/90 dark:bg-white/8 bg-black/8 h-5 rounded-full px-1.5 text-[10px] ${className || ""}`}
        variant="primary"
      >
        New
      </Chip>
    );
  }

  if (status === "preview") {
    return (
      <Chip
        className={`text-foreground/60 border-foreground/10 h-5 rounded-full border px-1.5 text-[10px] ${className || ""}`}
        variant="tertiary"
      >
        Preview
      </Chip>
    );
  }

  return null;
}

export default StatusChip;

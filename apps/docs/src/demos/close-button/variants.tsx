"use client";

import {CloseButton} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <CloseButton variant="default" />
        <span className="text-muted text-xs">Default</span>
      </div>
    </div>
  );
}

"use client";

import {Skeleton} from "@heroui/react";

export function Card() {
  return (
    <div className="bg-surface-1 shadow-panel w-[250px] space-y-5 rounded-lg p-4">
      <Skeleton className="h-32 rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-2/5 rounded-lg" />
      </div>
    </div>
  );
}

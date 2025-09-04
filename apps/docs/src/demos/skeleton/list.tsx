"use client";

import {Skeleton} from "@heroui/react";

export function List() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {Array.from({length: 3}).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-4/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

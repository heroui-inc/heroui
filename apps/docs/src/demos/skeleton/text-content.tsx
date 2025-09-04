"use client";

import {Skeleton} from "@heroui/react";

export function TextContent() {
  return (
    <div className="w-full max-w-md space-y-3">
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <Skeleton className="h-4 w-4/6 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-3/6 rounded" />
    </div>
  );
}

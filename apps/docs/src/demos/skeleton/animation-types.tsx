"use client";

import {Skeleton} from "@heroui/react";

export function AnimationTypes() {
  return (
    <div className="grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-2">
        <p className="text-muted truncate text-xs">Shimmer</p>
        <div className="shadow-border space-y-3 rounded-lg bg-transparent p-4">
          <Skeleton animationType="shimmer" className="h-20 rounded-lg" />
          <Skeleton animationType="shimmer" className="h-3 w-3/5 rounded-lg" />
          <Skeleton animationType="shimmer" className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-muted truncate text-xs">Pulse</p>
        <div className="shadow-border space-y-3 rounded-lg bg-transparent p-4">
          <Skeleton animationType="pulse" className="h-20 rounded-lg" />
          <Skeleton animationType="pulse" className="h-3 w-3/5 rounded-lg" />
          <Skeleton animationType="pulse" className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-muted truncate text-xs">None</p>
        <div className="shadow-border space-y-3 rounded-lg bg-transparent p-4">
          <Skeleton animationType="none" className="h-20 rounded-lg" />
          <Skeleton animationType="none" className="h-3 w-3/5 rounded-lg" />
          <Skeleton animationType="none" className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

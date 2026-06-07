import {Skeleton} from "@heroui/react";

export function UserProfile() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-36 rounded-lg" />
        <Skeleton className="h-3 w-24 rounded-lg" />
      </div>
    </div>
  );
}

import {Skeleton} from "@heroui/react";

export function Grid() {
  return (
    <div className="grid w-full max-w-xl grid-cols-3 gap-4">
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
    </div>
  );
}

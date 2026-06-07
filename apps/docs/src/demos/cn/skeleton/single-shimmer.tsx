import {Skeleton} from "@heroui/react";

export function SingleShimmer() {
  return (
    <div className="skeleton--shimmer relative grid w-full max-w-xl grid-cols-3 gap-4 overflow-hidden rounded-xl">
      <Skeleton animationType="none" className="h-24 rounded-xl" />
      <Skeleton animationType="none" className="h-24 rounded-xl" />
      <Skeleton animationType="none" className="h-24 rounded-xl" />
    </div>
  );
}

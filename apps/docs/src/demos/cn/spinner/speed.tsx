import {Spinner} from "@heroui/react";

export function SpinnerSpeed() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="animate-[spin_1.5s_linear_infinite] motion-reduce:animate-none" />
        <span className="text-xs text-muted">慢速</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner />
        <span className="text-xs text-muted">默认</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="animate-[spin_0.4s_linear_infinite] motion-reduce:animate-none" />
        <span className="text-xs text-muted">快速</span>
      </div>
    </div>
  );
}

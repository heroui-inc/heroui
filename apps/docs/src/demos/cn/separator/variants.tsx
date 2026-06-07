import {Separator} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex max-w-md flex-col items-center gap-3">
      <div>默认变体</div>
      <Separator variant="default" />
      <div>次要变体</div>
      <Separator variant="secondary" />
      <div>第三变体</div>
      <Separator variant="tertiary" />
    </div>
  );
}

import {Separator} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex max-w-md flex-col items-center gap-3">
      <div>Default Variant</div>
      <Separator variant="default" />
      <div>Secondary Variant</div>
      <Separator variant="secondary" />
      <div>Tertiary Variant</div>
      <Separator variant="tertiary" />
    </div>
  );
}

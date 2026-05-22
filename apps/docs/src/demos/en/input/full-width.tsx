import {Input} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <Input fullWidth placeholder="Full width input" />
    </div>
  );
}

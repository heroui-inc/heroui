import {Input} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <Input fullWidth placeholder="全宽输入框" />
    </div>
  );
}

import {Input} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex w-[240px] flex-col gap-2">
      <Input fullWidth placeholder="主要输入框" variant="primary" />
      <Input fullWidth placeholder="次要输入框" variant="secondary" />
    </div>
  );
}

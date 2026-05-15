import {TextArea} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex w-[280px] flex-col gap-2">
      <TextArea fullWidth placeholder="主要文本域" variant="primary" />
      <TextArea fullWidth placeholder="次要文本域" variant="secondary" />
    </div>
  );
}

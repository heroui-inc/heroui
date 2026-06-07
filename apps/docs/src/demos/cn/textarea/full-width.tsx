import {TextArea} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <TextArea fullWidth placeholder="全宽文本域" />
    </div>
  );
}

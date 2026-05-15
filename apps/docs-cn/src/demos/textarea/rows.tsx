import {Label, TextArea} from "@heroui/react";

export function Rows() {
  return (
    <div className="flex w-96 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="textarea-rows-3">简短反馈</Label>
        <TextArea aria-label="简短反馈" id="textarea-rows-3" placeholder="本周亮点…" rows={3} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="textarea-rows-6">详细笔记</Label>
        <TextArea
          aria-label="详细笔记"
          id="textarea-rows-6"
          placeholder="写下完整的会议记录…"
          rows={6}
          style={{resize: "vertical"}}
        />
      </div>
    </div>
  );
}

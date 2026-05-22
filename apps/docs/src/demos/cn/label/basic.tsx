import {Input, Label} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="name">姓名</Label>
      <Input className="w-64" id="name" placeholder="输入你的姓名" type="text" />
    </div>
  );
}

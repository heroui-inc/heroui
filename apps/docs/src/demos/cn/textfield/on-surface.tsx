import {Description, Input, Label, Surface, TextArea, TextField} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="flex w-full min-w-[340px] flex-col gap-4 rounded-3xl p-6">
      <TextField name="name" variant="secondary">
        <Label>你的姓名</Label>
        <Input className="w-full" placeholder="John" />
        <Description>我们绝不会与他人分享此信息</Description>
      </TextField>
      <TextField name="email" type="email" variant="secondary">
        <Label>邮箱</Label>
        <Input className="w-full" placeholder="john@example.com" />
      </TextField>
      <TextField name="bio" variant="secondary">
        <Label>个人简介</Label>
        <TextArea className="w-full" placeholder="介绍一下你自己…" rows={4} />
        <Description>至少 4 行</Description>
      </TextField>
    </Surface>
  );
}

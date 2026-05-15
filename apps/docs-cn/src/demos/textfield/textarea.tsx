import {Description, Label, TextArea, TextField} from "@heroui/react";

export function TextAreaExample() {
  return (
    <TextField className="w-full max-w-64" name="message">
      <Label>消息</Label>
      <TextArea placeholder="在此输入你的消息…" rows={4} />
      <Description>最多 500 个字符</Description>
    </TextField>
  );
}

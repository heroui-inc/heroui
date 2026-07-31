"use client";

import {Input, Surface, TextArea} from "@heroui/react";

export function WithFormComponents() {
  return (
    <Surface className="flex min-w-[320px] flex-col gap-4 rounded-3xl p-6" variant="default">
      <Input placeholder="使用次要变体的输入框" variant="secondary" />
      <TextArea placeholder="使用次要变体的文本域" variant="secondary" />
    </Surface>
  );
}

"use client";

import {Input, Surface, TextArea} from "@heroui/react";

export function WithFormComponents() {
  return (
    <Surface className="flex min-w-[320px] flex-col gap-4 rounded-3xl p-6" variant="default">
      <Input placeholder="Input with secondary variant" variant="secondary" />
      <TextArea placeholder="TextArea with secondary variant" variant="secondary" />
    </Surface>
  );
}

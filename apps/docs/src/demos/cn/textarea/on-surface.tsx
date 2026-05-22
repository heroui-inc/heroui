import {Surface, TextArea} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <TextArea className="w-full min-w-[280px]" placeholder="描述你的产品" variant="secondary" />
    </Surface>
  );
}

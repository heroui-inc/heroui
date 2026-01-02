import {Input, Surface} from "@heroui/react";

export function InSurface() {
  return (
    <Surface className="flex h-[180px] w-[280px] items-center justify-center rounded-3xl bg-surface p-4">
      <Input className="w-full" placeholder="Your name" />
    </Surface>
  );
}

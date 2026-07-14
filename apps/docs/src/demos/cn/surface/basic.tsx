import {Surface} from "@heroui/react";

export function Basic() {
  return (
    <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
      <h3 className="text-base font-semibold text-foreground">表面内容</h3>
      <p className="text-sm text-muted">这是默认表面变体，使用 bg-surface 样式。</p>
    </Surface>
  );
}

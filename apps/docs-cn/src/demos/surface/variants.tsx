import {Surface} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">默认</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <h3 className="text-base font-semibold text-foreground">表面内容</h3>
          <p className="text-sm text-muted">这是默认表面变体，使用 bg-surface 样式。</p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">次要</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <h3 className="text-base font-semibold text-foreground">表面内容</h3>
          <p className="text-sm text-muted">这是次要表面变体，使用 bg-surface-secondary 样式。</p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">第三</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="tertiary">
          <h3 className="text-base font-semibold text-foreground">表面内容</h3>
          <p className="text-sm text-muted">这是第三表面变体，使用 bg-surface-tertiary 样式。</p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">透明</p>
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl border p-6"
          variant="transparent"
        >
          <h3 className="text-base font-semibold text-foreground">表面内容</h3>
          <p className="text-sm text-muted">
            这是透明表面变体，无背景，适用于遮罩层和自定义背景的卡片。
          </p>
        </Surface>
      </div>
    </div>
  );
}

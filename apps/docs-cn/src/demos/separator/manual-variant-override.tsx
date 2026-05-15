import {Separator, Surface} from "@heroui/react";

export function ManualVariantOverride() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">默认表面上的分隔线</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <h3 className="text-base font-semibold text-foreground">表面内容</h3>
          <Separator />
          <p className="text-sm text-muted">分隔线会适应表面背景。</p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">次要表面上的分隔线</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <h3 className="text-base font-semibold text-foreground">表面内容</h3>
          <Separator />
          <p className="text-sm text-muted">分隔线会适应表面背景。</p>
        </Surface>
      </div>
    </div>
  );
}

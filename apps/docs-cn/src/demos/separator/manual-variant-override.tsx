import {Separator, Surface} from "@heroui/react";

export function ManualVariantOverride() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Separator on default surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
          <Separator />
          <p className="text-sm text-muted">The separator adapts to the surface background.</p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Separator on secondary surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
          <Separator />
          <p className="text-sm text-muted">The separator adapts to the surface background.</p>
        </Surface>
      </div>
    </div>
  );
}

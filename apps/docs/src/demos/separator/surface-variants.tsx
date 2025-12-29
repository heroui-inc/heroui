import {Separator, Surface} from "@heroui/react";

export function SurfaceVariants() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Default Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
          <Separator />
          <p className="text-sm text-muted">
            Separator automatically detects default surface level.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
          <Separator />
          <p className="text-sm text-muted">
            Separator automatically detects secondary surface level.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Tertiary Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="tertiary">
          <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
          <Separator />
          <p className="text-sm text-muted">
            Separator automatically detects tertiary surface level.
          </p>
        </Surface>
      </div>
    </div>
  );
}

import {Surface} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Default</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <h3 className="text-foreground text-base font-semibold">Surface Content</h3>
          <p className="text-muted text-sm">
            This is a default surface variant. It uses bg-surface styling.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Secondary</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <h3 className="text-foreground text-base font-semibold">Surface Content</h3>
          <p className="text-muted text-sm">
            This is a secondary surface variant. It uses bg-surface-secondary styling.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Tertiary</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="tertiary">
          <h3 className="text-foreground text-base font-semibold">Surface Content</h3>
          <p className="text-muted text-sm">
            This is a tertiary surface variant. It uses bg-surface-tertiary styling.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Quaternary</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="quaternary">
          <h3 className="text-foreground text-base font-semibold">Surface Content</h3>
          <p className="text-muted text-sm">
            This is a quaternary surface variant. It uses bg-surface-quaternary styling.
          </p>
        </Surface>
      </div>
    </div>
  );
}

import {Surface} from "@heroui/react";

export function Basic() {
  return (
    <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
      <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
      <p className="text-sm text-muted">
        This is a default surface variant. It uses bg-surface styling.
      </p>
    </Surface>
  );
}

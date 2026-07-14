import {Chip} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip className="rounded-full bg-default-soft px-3 text-default-soft-foreground">Draft</Chip>
      <Chip className="rounded-full bg-warning-soft px-3 text-warning-soft-foreground">
        In review
      </Chip>
      <Chip className="rounded-full bg-success-soft px-3 text-success-soft-foreground">
        Published
      </Chip>
    </div>
  );
}

import {Chip} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip className="rounded-full bg-default-soft px-3 text-default-soft-foreground">草稿</Chip>
      <Chip className="rounded-full bg-warning-soft px-3 text-warning-soft-foreground">审核中</Chip>
      <Chip className="rounded-full bg-success-soft px-3 text-success-soft-foreground">已发布</Chip>
    </div>
  );
}

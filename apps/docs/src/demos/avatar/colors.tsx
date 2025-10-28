import {Avatar} from "@heroui/react";

export function Colors() {
  return (
    <div className="flex items-center gap-4">
      <Avatar.Root color="default">
        <Avatar.Fallback>DF</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color="accent">
        <Avatar.Fallback>AC</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color="success">
        <Avatar.Fallback>SC</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color="warning">
        <Avatar.Fallback>WR</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color="danger">
        <Avatar.Fallback>DG</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

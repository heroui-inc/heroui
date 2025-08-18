"use client";

import {Chip} from "@heroui/react";

export function ChipBasic() {
  return (
    <div className="flex items-center gap-3">
      <Chip>Default</Chip>
      <Chip color="accent">Accent</Chip>
      <Chip color="success">Success</Chip>
      <Chip color="warning">Warning</Chip>
      <Chip color="danger">Danger</Chip>
    </div>
  );
}
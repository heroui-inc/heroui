"use client";

import {Chip} from "@heroui/react";
import {Icon} from "@iconify/react";

export function ChipWithIcon() {
  return (
    <div className="flex items-center gap-3">
      <Chip>
        <Icon icon="gravity-ui:circle-fill" width={6} />
        Information
      </Chip>
      <Chip type="success">
        <Icon icon="gravity-ui:circle-check-fill" width={12} />
        Completed
      </Chip>
      <Chip type="warning">
        <Icon icon="gravity-ui:clock" width={12} />
        Pending
      </Chip>
      <Chip type="danger">
        <Icon icon="gravity-ui:xmark" width={12} />
        Failed
      </Chip>
      <Chip type="accent">
        Label
        <Icon icon="gravity-ui:chevron-down" width={12} />
      </Chip>
    </div>
  );
}

"use client";

import {Chip} from "@heroui/react";
import {Icon} from "@iconify/react";

export function ChipStatuses() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Chip variant="primary">
          <Icon icon="gravity-ui:circle-fill" width={6} />
          Default
        </Chip>
        <Chip variant="primary" color="success">
          <Icon icon="gravity-ui:circle-fill" width={6} />
          Active
        </Chip>
        <Chip variant="primary" color="warning">
          <Icon icon="gravity-ui:circle-fill" width={6} />
          Pending
        </Chip>
        <Chip variant="primary" color="danger">
          <Icon icon="gravity-ui:circle-fill" width={6} />
          Inactive
        </Chip>
      </div>
      
      <div className="flex items-center gap-3">
        <Chip>
          <Icon icon="gravity-ui:circle-info" width={12} />
          New Feature
        </Chip>
        <Chip color="success">
          <Icon icon="gravity-ui:check" width={12} />
          Available
        </Chip>
        <Chip color="warning">
          <Icon icon="gravity-ui:triangle-exclamation" width={12} />
          Beta
        </Chip>
        <Chip color="danger">
          <Icon icon="gravity-ui:ban" width={12} />
          Deprecated
        </Chip>
      </div>
    </div>
  );
}
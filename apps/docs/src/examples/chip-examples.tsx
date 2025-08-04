"use client";

import React from "react";

import {Chip} from "@heroui/react";
import {Icon} from "@iconify/react";

export function ChipBasic() {
  return <Chip>Label</Chip>;
}

export function ChipColors() {
  return (
    <div className="flex items-center gap-3">
      <Chip color="accent">Accent</Chip>
      <Chip color="success">Success</Chip>
      <Chip color="warning">Warning</Chip>
      <Chip color="danger">Danger</Chip>
    </div>
  );
}

export function ChipWithIcon() {
  return (
    <div className="flex items-center gap-3">
      <Chip>
        <Icon icon="gravity-ui:circle-dashed" />
        Label <Icon icon="gravity-ui:circle-dashed" />
      </Chip>
    </div>
  );
}

export function ChipStatuses() {
  return (
    <div className="flex items-center gap-3">
      <Chip>
        <Icon icon="gravity-ui:circle-fill" width={6} />
        Information
      </Chip>
      <Chip color="success">
        <Icon icon="gravity-ui:circle-fill" width={6} />
        Completed
      </Chip>
      <Chip color="warning">
        <Icon icon="gravity-ui:circle-fill" width={6} />
        Pending
      </Chip>
      <Chip color="danger">
        <Icon icon="gravity-ui:circle-fill" width={6} />
        Failed
      </Chip>
    </div>
  );
}

export function ChipVariants() {
  return (
    <div className="flex items-center gap-3">
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="secondary" color="accent">Secondary Accent</Chip>
    </div>
  );
}
"use client";

import {Chip} from "@heroui/react";

export function ChipVariants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Chip color="default" variant="primary">
          Primary Default
        </Chip>
        <Chip color="accent" variant="primary">
          Primary Accent
        </Chip>
        <Chip color="success" variant="primary">
          Primary Success
        </Chip>
        <Chip color="warning" variant="primary">
          Primary Warning
        </Chip>
        <Chip color="danger" variant="primary">
          Primary Danger
        </Chip>
      </div>

      <div className="flex items-center gap-3">
        <Chip color="default" variant="secondary">
          Secondary Default
        </Chip>
        <Chip color="accent" variant="secondary">
          Secondary Accent
        </Chip>
        <Chip color="success" variant="secondary">
          Secondary Success
        </Chip>
        <Chip color="warning" variant="secondary">
          Secondary Warning
        </Chip>
        <Chip color="danger" variant="secondary">
          Secondary Danger
        </Chip>
      </div>

      <div className="flex items-center gap-3">
        <Chip color="default" variant="tertiary">
          Tertiary Default
        </Chip>
        <Chip color="accent" variant="tertiary">
          Tertiary Accent
        </Chip>
        <Chip color="success" variant="tertiary">
          Tertiary Success
        </Chip>
        <Chip color="warning" variant="tertiary">
          Tertiary Warning
        </Chip>
        <Chip color="danger" variant="tertiary">
          Tertiary Danger
        </Chip>
      </div>
    </div>
  );
}

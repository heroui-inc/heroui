"use client";

import {Chip} from "@heroui/react";

export function ChipVariants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Chip variant="primary" color="default">Primary Default</Chip>
        <Chip variant="primary" color="accent">Primary Accent</Chip>
        <Chip variant="primary" color="success">Primary Success</Chip>
        <Chip variant="primary" color="warning">Primary Warning</Chip>
        <Chip variant="primary" color="danger">Primary Danger</Chip>
      </div>
      
      <div className="flex items-center gap-3">
        <Chip variant="secondary" color="default">Secondary Default</Chip>
        <Chip variant="secondary" color="accent">Secondary Accent</Chip>
        <Chip variant="secondary" color="success">Secondary Success</Chip>
        <Chip variant="secondary" color="warning">Secondary Warning</Chip>
        <Chip variant="secondary" color="danger">Secondary Danger</Chip>
      </div>
      
      <div className="flex items-center gap-3">
        <Chip variant="tertiary" color="default">Tertiary Default</Chip>
        <Chip variant="tertiary" color="accent">Tertiary Accent</Chip>
        <Chip variant="tertiary" color="success">Tertiary Success</Chip>
        <Chip variant="tertiary" color="warning">Tertiary Warning</Chip>
        <Chip variant="tertiary" color="danger">Tertiary Danger</Chip>
      </div>
    </div>
  );
}
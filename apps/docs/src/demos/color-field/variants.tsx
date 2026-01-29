"use client";

import {ColorField, ColorInputGroup, Label, parseColor} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField className="w-[280px]" defaultValue={parseColor("#0485F7")} name="primary-color">
        <Label>Primary variant</Label>
        <ColorInputGroup variant="primary">
          <ColorInputGroup.Input />
        </ColorInputGroup>
      </ColorField>
      <ColorField className="w-[280px]" defaultValue={parseColor("#F43F5E")} name="secondary-color">
        <Label>Secondary variant</Label>
        <ColorInputGroup variant="secondary">
          <ColorInputGroup.Input />
        </ColorInputGroup>
      </ColorField>
    </div>
  );
}

"use client";

import type {Color} from "@heroui/react";

import {ColorField, ColorInputGroup, ColorSwatch, Label, parseColor} from "@heroui/react";
import {useState} from "react";

export function Basic() {
  const [color, setColor] = useState<Color | null>(parseColor("#0485F7"));

  return (
    <ColorField className="w-[280px]" name="color" value={color} onChange={setColor}>
      <Label>Color</Label>
      <ColorInputGroup>
        <ColorInputGroup.Prefix>
          <ColorSwatch color={color ?? undefined} size="xs" />
        </ColorInputGroup.Prefix>
        <ColorInputGroup.Input />
      </ColorInputGroup>
    </ColorField>
  );
}

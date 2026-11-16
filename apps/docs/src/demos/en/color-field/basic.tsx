"use client";

import type {Color, ColorFieldProps} from "@heroui/react";

import {ColorField, ColorSwatch, Label, parseColor} from "@heroui/react";
import {useState} from "react";

export function Basic(props: ColorFieldProps) {
  const [color, setColor] = useState<Color | null>(parseColor("#0485F7"));

  return (
    <ColorField {...props} className="w-[280px]" name="color" value={color} onChange={setColor}>
      <Label>Color</Label>
      <ColorField.Group>
        <ColorField.Prefix>
          <ColorSwatch color={color ?? undefined} size="xs" />
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>
  );
}

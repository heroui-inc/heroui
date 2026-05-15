"use client";

import type {Color} from "@heroui/react";

import {Button, ColorField, ColorSwatch, Description, Label, parseColor} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [value, setValue] = useState<Color | null>(parseColor("#0485F7"));

  return (
    <div className="flex flex-col gap-4">
      <ColorField className="w-[280px]" name="color" value={value} onChange={setValue}>
        <Label>颜色</Label>
        <ColorField.Group>
          <ColorField.Prefix>
            <ColorSwatch color={value ?? undefined} size="xs" />
          </ColorField.Prefix>
          <ColorField.Input />
        </ColorField.Group>
        <Description>当前值：{value ? value.toString("hex") : "（空）"}</Description>
      </ColorField>
      <div className="flex gap-2">
        <Button variant="tertiary" onPress={() => setValue(parseColor("#EF4444"))}>
          设为红色
        </Button>
        <Button variant="tertiary" onPress={() => setValue(parseColor("#10B981"))}>
          设为绿色
        </Button>
        <Button variant="tertiary" onPress={() => setValue(null)}>
          清空
        </Button>
      </div>
    </div>
  );
}

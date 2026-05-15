"use client";

import type {Color} from "@heroui/react";

import {Button, ColorField, ColorSwatch, Description, Form, Label} from "@heroui/react";
import {useState} from "react";

export function FormExample() {
  const [value, setValue] = useState<Color | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("已提交颜色：", {color: value.toString("hex")});
      setValue(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
      <ColorField
        fullWidth
        isRequired
        className="w-full"
        name="brand-color"
        value={value}
        onChange={setValue}
      >
        <Label>品牌色</Label>
        <ColorField.Group>
          <ColorField.Prefix>
            <ColorSwatch color={value ?? undefined} size="xs" />
          </ColorField.Prefix>
          <ColorField.Input placeholder="#000000" />
        </ColorField.Group>
        <Description>选择品牌主色</Description>
      </ColorField>
      <Button
        className="w-full"
        isDisabled={!value}
        isPending={isSubmitting}
        type="submit"
        variant="primary"
      >
        {isSubmitting ? "保存中…" : "保存颜色"}
      </Button>
    </Form>
  );
}

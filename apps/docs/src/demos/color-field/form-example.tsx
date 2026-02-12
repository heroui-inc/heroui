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
      console.log("Color submitted:", {color: value.toString("hex")});
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
        <Label>Brand Color</Label>
        <ColorField.Group>
          <ColorField.Prefix>
            <ColorSwatch color={value ?? undefined} size="xs" />
          </ColorField.Prefix>
          <ColorField.Input placeholder="#000000" />
        </ColorField.Group>
        <Description>Choose your brand's primary color</Description>
      </ColorField>
      <Button
        className="w-full"
        isDisabled={!value}
        isPending={isSubmitting}
        type="submit"
        variant="primary"
      >
        {isSubmitting ? "Saving..." : "Save Color"}
      </Button>
    </Form>
  );
}

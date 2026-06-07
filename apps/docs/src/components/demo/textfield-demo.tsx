"use client";

import {Description, FieldError, Input, Label, TextField} from "@heroui/react";

import {useDictionary} from "@/hooks/use-dictionary";

export function TextfieldDemo() {
  const {demos} = useDictionary();
  const t = demos.textfield;

  return (
    <div>
      <TextField isRequired className="items-start" name="name">
        <Label>{t.label}</Label>
        <Input className="w-[256px]" placeholder={t.placeholder} />
        <Description className="mt-0.5">{t.description}</Description>
        <FieldError>{t.error}</FieldError>
      </TextField>
    </div>
  );
}

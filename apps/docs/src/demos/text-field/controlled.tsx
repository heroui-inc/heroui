"use client";

import {Description, Input, Label, TextArea, TextField} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [inputValue, setInputValue] = React.useState("");
  const [textareaValue, setTextareaValue] = React.useState("");

  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <TextField>
        <Label>Display name</Label>
        <Input
          placeholder="Jane"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Description>Characters: {inputValue.length}</Description>
      </TextField>
      <TextField>
        <Label>Bio</Label>
        <TextArea
          placeholder="Tell us about yourself..."
          value={textareaValue}
          onChange={(event) => setTextareaValue(event.target.value)}
        />
        <Description>Characters: {textareaValue.length} / 200</Description>
      </TextField>
    </div>
  );
}

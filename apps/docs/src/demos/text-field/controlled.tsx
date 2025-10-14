"use client";

import {TextField} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [inputValue, setInputValue] = React.useState("");
  const [textareaValue, setTextareaValue] = React.useState("");

  return (
    <div className="flex w-96 flex-col gap-4">
      <TextField>
        <TextField.Label>Display name</TextField.Label>
        <TextField.Input
          placeholder="Jane"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <TextField.Description>Characters: {inputValue.length}</TextField.Description>
      </TextField>
      <TextField>
        <TextField.Label>Bio</TextField.Label>
        <TextField.TextArea
          placeholder="Tell us about yourself..."
          value={textareaValue}
          onChange={(event) => setTextareaValue(event.target.value)}
        />
        <TextField.Description>Characters: {textareaValue.length} / 200</TextField.Description>
      </TextField>
    </div>
  );
}

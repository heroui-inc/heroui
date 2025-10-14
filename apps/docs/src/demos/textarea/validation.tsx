"use client";

import {Label, TextArea} from "@heroui/react";
import React from "react";

const MIN_LENGTH = 20;

export function Validation() {
  const [value, setValue] = React.useState("");
  const isInvalid = value.length > 0 && value.length < MIN_LENGTH;

  return (
    <div className="flex w-96 flex-col gap-1">
      <Label htmlFor="textarea-validation">Support message</Label>
      <TextArea
        id="textarea-validation"
        isInvalid={isInvalid}
        placeholder="Describe the issue you are experiencing..."
        rows={4}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <span className="text-default-500 px-1 text-sm">
        {isInvalid
          ? `Please provide at least ${MIN_LENGTH} characters.`
          : "Share as many details as possible so we can help quickly."}
      </span>
    </div>
  );
}

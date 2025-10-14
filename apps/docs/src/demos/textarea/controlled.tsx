"use client";

import {Description, TextArea} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex w-96 flex-col gap-2">
      <Description id="textarea-controlled-description">
        Characters: {value.length} / 280
      </Description>
      <TextArea
        aria-describedby="textarea-controlled-description"
        placeholder="Compose an announcement..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}

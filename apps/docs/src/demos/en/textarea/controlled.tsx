"use client";

import {Description, TextArea} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex w-96 flex-col gap-2">
      <TextArea
        aria-describedby="textarea-controlled-description"
        aria-label="Announcement"
        placeholder="Compose an announcement..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Description id="textarea-controlled-description">
        Characters: {value.length} / 280
      </Description>
    </div>
  );
}

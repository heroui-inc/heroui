"use client";

import {Description, TextArea} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex w-96 flex-col gap-2">
      <TextArea
        aria-describedby="textarea-controlled-description"
        aria-label="公告"
        placeholder="撰写公告…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Description id="textarea-controlled-description">字符数： {value.length} / 280</Description>
    </div>
  );
}

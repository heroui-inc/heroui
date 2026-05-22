"use client";

import {Input} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState("heroui.com");

  return (
    <div className="flex w-80 flex-col gap-2">
      <Input
        aria-label="域名"
        placeholder="域名"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <span className="px-1 text-sm text-muted">https://{value || "你的域名"}</span>
    </div>
  );
}

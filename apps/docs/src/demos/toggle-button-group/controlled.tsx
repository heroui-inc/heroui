"use client";

import type {Key} from "@heroui/react";

import {Bold, Italic, Strikethrough, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [selectedKeys, setSelectedKeys] = useState(new Set<Key>(["bold"]));

  return (
    <div className="flex flex-col gap-4">
      <ToggleButtonGroup
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <ToggleButton isIconOnly aria-label="Bold" id="bold">
          <Bold />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Italic" id="italic">
          <ToggleButtonGroup.Separator />
          <Italic />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Underline" id="underline">
          <ToggleButtonGroup.Separator />
          <Underline />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
          <ToggleButtonGroup.Separator />
          <Strikethrough />
        </ToggleButton>
      </ToggleButtonGroup>
      <p className="text-sm text-muted">
        Selected:{" "}
        <span className="font-medium">
          {selectedKeys.size > 0 ? [...selectedKeys].join(", ") : "None"}
        </span>
      </p>
    </div>
  );
}

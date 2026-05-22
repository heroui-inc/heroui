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
        <ToggleButton isIconOnly aria-label="粗体" id="bold">
          <Bold />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="斜体" id="italic">
          <ToggleButtonGroup.Separator />
          <Italic />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="下划线" id="underline">
          <ToggleButtonGroup.Separator />
          <Underline />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="删除线" id="strikethrough">
          <ToggleButtonGroup.Separator />
          <Strikethrough />
        </ToggleButton>
      </ToggleButtonGroup>
      <p className="text-sm text-muted">
        已选：
        <span className="font-medium">
          {selectedKeys.size > 0 ? [...selectedKeys].join(", ") : "无"}
        </span>
      </p>
    </div>
  );
}

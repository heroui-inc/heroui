"use client";

import {Checkbox, Label} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Checkbox id="email-notifications" isSelected={isSelected} onChange={setIsSelected}>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label htmlFor="email-notifications">邮件通知</Label>
          </Checkbox.Content>
        </Checkbox>
      </div>
      <p className="text-sm text-muted">
        状态：<span className="font-medium">{isSelected ? "已勾选" : "未勾选"}</span>
      </p>
    </div>
  );
}

"use client";

import {Checkbox} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <Checkbox id="email-notifications" isSelected={isSelected} onChange={setIsSelected}>
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          邮件通知
        </Checkbox.Content>
      </Checkbox>
      <p className="text-sm text-muted">
        状态：<span className="font-medium">{isSelected ? "已勾选" : "未勾选"}</span>
      </p>
    </div>
  );
}

"use client";

import {Button, Checkbox, Label} from "@heroui/react";
import React from "react";

export function Form() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    alert(
      `表单提交数据：\n${Array.from(formData.entries())
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}`,
    );
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <Checkbox name="notifications" value="on">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>启用通知</Label>
          </Checkbox.Button>
        </Checkbox>
        <Checkbox defaultSelected name="newsletter" value="on">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>订阅新闻通讯</Label>
          </Checkbox.Button>
        </Checkbox>
        <Checkbox name="marketing" value="on">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>接收营销更新</Label>
          </Checkbox.Button>
        </Checkbox>
      </div>
      <Button className="mt-4" size="sm" type="submit" variant="primary">
        提交
      </Button>
    </form>
  );
}

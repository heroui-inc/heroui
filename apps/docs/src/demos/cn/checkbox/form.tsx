"use client";

import {Button, Checkbox, Label} from "@heroui/react";
import React from "react";

export function Form() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    alert(
      `表单已提交，内容如下：\n${Array.from(formData.entries())
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}`,
    );
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Checkbox id="form-notifications" name="notifications" value="on">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
          <Checkbox.Content>
            <Label htmlFor="form-notifications">启用通知</Label>
          </Checkbox.Content>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox defaultSelected id="form-newsletter" name="newsletter" value="on">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
          <Checkbox.Content>
            <Label htmlFor="form-newsletter">订阅邮件通讯</Label>
          </Checkbox.Content>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="form-marketing" name="marketing" value="on">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
          <Checkbox.Content>
            <Label htmlFor="form-marketing">接收营销资讯</Label>
          </Checkbox.Content>
        </div>
      </div>
      <Button className="mt-4" size="sm" type="submit" variant="primary">
        提交
      </Button>
    </form>
  );
}

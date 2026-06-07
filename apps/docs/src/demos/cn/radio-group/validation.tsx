"use client";

import {Button, Description, FieldError, Form, Label, Radio, RadioGroup} from "@heroui/react";
import React from "react";

export function Validation() {
  const [message, setMessage] = React.useState<string | null>(null);

  return (
    <Form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const value = formData.get("plan-validation");

        setMessage(`你选择的套餐是： ${value}`);
      }}
    >
      <RadioGroup isRequired name="plan-validation">
        <Label>订阅套餐</Label>
        <Radio value="starter">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            入门版
          </Radio.Content>
          <Description>适合副项目和小型团队</Description>
        </Radio>
        <Radio value="pro">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            专业版
          </Radio.Content>
          <Description>高级报表与分析</Description>
        </Radio>
        <Radio value="teams">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            团队版
          </Radio.Content>
          <Description>最多可与 10 名队友共享访问权限</Description>
        </Radio>
        <FieldError>请先选择订阅套餐再继续。</FieldError>
      </RadioGroup>
      <Button className="mt-2 w-fit" type="submit">
        Submit
      </Button>
      {!!message && <p className="text-sm text-muted">{message}</p>}
    </Form>
  );
}

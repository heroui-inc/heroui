"use client";

import {Button, Checkbox, CheckboxGroup, FieldError, Form, Label} from "@heroui/react";

export function Validation() {
  return (
    <Form
      className="flex flex-col gap-4 px-4"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const values = formData.getAll("preferences");

        alert(`已选偏好：${values.join(", ")}`);
      }}
    >
      <CheckboxGroup isRequired name="preferences">
        <Label>偏好设置</Label>
        <Checkbox value="email">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            邮件通知
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="sms">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            短信通知
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="push">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            推送通知
          </Checkbox.Content>
        </Checkbox>
        <FieldError>请至少选择一种通知方式。</FieldError>
      </CheckboxGroup>
      <Button type="submit">提交</Button>
    </Form>
  );
}

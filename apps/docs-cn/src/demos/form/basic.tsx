"use client";

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

export function Basic() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert(`表单提交数据：${JSON.stringify(data, null, 2)}`);
  };

  return (
    <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "请输入有效的邮箱地址";
          }

          return null;
        }}
      >
        <Label>邮箱</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "密码至少需要 8 个字符";
          }
          if (!/[A-Z]/.test(value)) {
            return "密码至少需要包含一个大写字母";
          }
          if (!/[0-9]/.test(value)) {
            return "密码至少需要包含一个数字";
          }

          return null;
        }}
      >
        <Label>密码</Label>
        <Input placeholder="输入密码" />
        <Description>至少 8 个字符，且包含 1 个大写字母和 1 个数字</Description>
        <FieldError />
      </TextField>

      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          提交
        </Button>
        <Button type="reset" variant="secondary">
          重置
        </Button>
      </div>
    </Form>
  );
}

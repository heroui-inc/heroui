"use client";

import {Button, Card, Form, Input, Label, Link, TextField} from "@heroui/react";

export function WithForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert("表单提交成功！");
  };

  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>登录</Card.Title>
        <Card.Description>输入账号信息以访问您的账户</Card.Description>
      </Card.Header>
      <Form onSubmit={onSubmit}>
        <Card.Content>
          <div className="flex flex-col gap-4">
            <TextField name="email" type="email">
              <Label>邮箱</Label>
              <Input placeholder="email@example.com" variant="secondary" />
            </TextField>
            <TextField name="password" type="password">
              <Label>密码</Label>
              <Input placeholder="••••••••" variant="secondary" />
            </TextField>
          </div>
        </Card.Content>
        <Card.Footer className="mt-4 flex flex-col gap-2">
          <Button className="w-full" type="submit">
            登录
          </Button>
          <Link className="text-center text-sm" href="#">
            忘记密码？
          </Link>
        </Card.Footer>
      </Form>
    </Card>
  );
}

"use client";

import {FloppyDisk} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import React from "react";

export function OnSurface() {
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
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
      <Surface className="w-full min-w-[380px]">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>个人资料设置</Fieldset.Legend>
            <Description>更新你的个人资料信息。</Description>
            <Fieldset.Group>
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "姓名至少需要 3 个字符";
                  }

                  return null;
                }}
              >
                <Label>姓名</Label>
                <Input placeholder="John Doe" variant="secondary" />
                <FieldError />
              </TextField>
              <TextField isRequired name="email" type="email">
                <Label>邮箱</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>
              <TextField
                isRequired
                name="bio"
                validate={(value) => {
                  if (value.length < 10) {
                    return "简介至少需要 10 个字符";
                  }

                  return null;
                }}
              >
                <Label>简介</Label>
                <TextArea placeholder="介绍一下你自己…" variant="secondary" />
                <Description>至少 10 个字符</Description>
                <FieldError />
              </TextField>
            </Fieldset.Group>
            <Fieldset.Actions>
              <Button type="submit">
                <FloppyDisk />
                保存更改
              </Button>
              <Button type="reset" variant="tertiary">
                取消
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}

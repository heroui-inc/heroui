"use client";

import {FloppyDisk} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

export function Basic() {
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
    <Form className="w-full max-w-96" onSubmit={onSubmit}>
      <Fieldset>
        <Fieldset.Legend>个人资料设置</Fieldset.Legend>
        <Description>更新你的个人资料信息。</Description>
        <FieldGroup>
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
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>
          <TextField isRequired name="email" type="email">
            <Label>邮箱</Label>
            <Input placeholder="john@example.com" />
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
            <TextArea placeholder="介绍一下你自己…" />
            <Description>至少 10 个字符</Description>
            <FieldError />
          </TextField>
        </FieldGroup>
        <Fieldset.Actions>
          <Button type="submit">
            <FloppyDisk />
            保存更改
          </Button>
          <Button type="reset" variant="secondary">
            取消
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  );
}

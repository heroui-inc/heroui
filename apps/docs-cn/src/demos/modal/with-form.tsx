"use client";

import {Envelope} from "@gravity-ui/icons";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";

export function WithForm() {
  return (
    <Modal>
      <Button variant="secondary">打开联系表单</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>联系我们</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                填写下方表单，我们会尽快回复。在移动端弹出键盘时，模态框会自动适配。
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text">
                    <Label>姓名</Label>
                    <Input placeholder="输入你的姓名" />
                  </TextField>
                  <TextField className="w-full" name="email" type="email">
                    <Label>邮箱</Label>
                    <Input placeholder="输入你的邮箱" />
                  </TextField>
                  <TextField className="w-full" name="phone" type="tel">
                    <Label>电话</Label>
                    <Input placeholder="输入你的电话号码" />
                  </TextField>
                  <TextField className="w-full" name="company">
                    <Label>公司</Label>
                    <Input placeholder="输入公司名称" />
                  </TextField>
                  <TextField className="w-full" name="message">
                    <Label>留言</Label>
                    <Input placeholder="输入留言内容" />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                取消
              </Button>
              <Button slot="close">发送消息</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

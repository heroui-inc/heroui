"use client";

import {LockOpen} from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";

export function CustomIcon() {
  return (
    <AlertDialog>
      <Button variant="secondary">重置密码</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="warning">
                <LockOpen className="size-5" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>要重置密码吗？</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>我们会向你的邮箱发送重置链接。你需要设置新密码以恢复账户访问。</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                取消
              </Button>
              <Button slot="close">发送重置链接</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

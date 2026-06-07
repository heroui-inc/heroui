"use client";

import {AlertDialog, Button} from "@heroui/react";

export function WithCloseButton() {
  return (
    <AlertDialog>
      <Button variant="secondary">查看信息</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
              <AlertDialog.Heading>次要信息</AlertDialog.Heading>
              <p className="text-sm leading-relaxed text-muted">已启用关闭按钮与点击遮罩关闭</p>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                对于重要性较低的确认，可同时启用关闭按钮与点击遮罩关闭，为用户提供多种退出方式。
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                取消
              </Button>
              <Button slot="close">确认</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

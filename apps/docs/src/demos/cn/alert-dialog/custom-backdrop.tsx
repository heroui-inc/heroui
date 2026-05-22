"use client";

import {TriangleExclamation} from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";

export function CustomBackdrop() {
  return (
    <AlertDialog>
      <Button variant="danger">删除账户</Button>
      <AlertDialog.Backdrop
        className="bg-linear-to-t from-red-950/90 via-red-950/50 to-transparent dark:from-red-950/95 dark:via-red-950/60"
        variant="blur"
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="items-center text-center">
              <AlertDialog.Icon status="danger">
                <TriangleExclamation className="size-5" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>要永久删除账户吗？</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                此操作无法撤销。你的数据、设置与内容将从服务器永久清除。醒目的红色背景用于强调该决定的严重性与不可逆性。
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex-col-reverse">
              <Button className="w-full" slot="close">
                保留账户
              </Button>
              <Button className="w-full" slot="close" variant="danger">
                永久删除
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

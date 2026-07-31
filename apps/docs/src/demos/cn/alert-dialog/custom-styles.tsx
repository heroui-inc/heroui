"use client";

import {AlertDialog, Button} from "@heroui/react";

export function CustomStyles() {
  return (
    <AlertDialog>
      <Button variant="secondary">退出登录</Button>
      <AlertDialog.Backdrop className="bg-overlay/50 dark:bg-overlay/60" variant="blur">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="relative overflow-hidden border border-border/80 bg-surface shadow-2xl ring-1 ring-accent/10 sm:max-w-[400px] dark:border-border/90 dark:bg-surface dark:ring-accent/15">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-accent/6 to-transparent dark:from-accent/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-accent/35 to-transparent dark:via-accent/45"
            />
            <AlertDialog.Header className="relative">
              <AlertDialog.Icon status="accent" />
              <AlertDialog.Heading>确定要退出账户吗？</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="relative">
              <p className="text-muted">
                您将在此设备上退出登录。除非已保存到云端，否则{" "}
                <strong className="text-foreground">Acme 工作区</strong> 中未保存的工作可能会丢失。
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                保持登录
              </Button>
              <Button slot="close">退出登录</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

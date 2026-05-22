"use client";

import {AlertDialog, Button} from "@heroui/react";

export function Statuses() {
  const examples = [
    {
      actions: {
        cancel: "保持登录",
        confirm: "退出登录",
      },
      body: "退出后需要重新登录才能访问账户，未保存的更改将丢失。",
      classNames: "bg-accent-soft text-accent-soft-foreground",
      header: "要退出当前账户吗？",
      status: "accent",
      trigger: "退出登录",
    },
    {
      actions: {
        cancel: "稍后再说",
        confirm: "标记完成",
      },
      body: "将把该任务标记为完成并通知所有成员，任务会移入已完成列表。",
      classNames: "bg-success-soft text-success-soft-foreground",
      header: "要完成此任务吗？",
      status: "success",
      trigger: "完成任务",
    },
    {
      actions: {
        cancel: "继续编辑",
        confirm: "放弃更改",
      },
      body: "你有未保存的更改，放弃后将永久丢失。确定要放弃吗？",
      classNames: "bg-warning-soft text-warning-soft-foreground",
      header: "要放弃未保存的更改吗？",
      status: "warning",
      trigger: "放弃更改",
    },
    {
      actions: {
        cancel: "取消",
        confirm: "删除账户",
      },
      body: "将永久删除你的账户并从服务器移除全部数据，此操作不可恢复。",
      classNames: "bg-danger-soft text-danger-soft-foreground",
      header: "要删除账户吗？",
      status: "danger",
      trigger: "删除账户",
    },
  ] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {examples.map(({actions, body, classNames, header, status, trigger}) => (
        <AlertDialog key={status}>
          <Button className={classNames}>{trigger}</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status={status} />
                  <AlertDialog.Heading>{header}</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>{body}</p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    {actions.cancel}
                  </Button>
                  <Button slot="close" variant={status === "danger" ? "danger" : "primary"}>
                    {actions.confirm}
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      ))}
    </div>
  );
}

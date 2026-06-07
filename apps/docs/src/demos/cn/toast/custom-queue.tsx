"use client";

import {Button, Toast, ToastQueue} from "@heroui/react";

export function CustomQueue() {
  const notificationQueue = new ToastQueue({maxVisibleToasts: 2});
  const errorQueue = new ToastQueue({maxVisibleToasts: 3});
  const successQueue = new ToastQueue({maxVisibleToasts: 1});

  return (
    <div className="flex h-full max-w-4xl items-center justify-center gap-4">
      {/* Notification Queue */}
      <Toast.Provider placement="bottom" queue={notificationQueue} />
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            notificationQueue.add({
              description: "您有一条新消息",
              title: "新通知",
              variant: "default",
            });
          }}
        >
          添加通知（最多 2 条）
        </Button>
      </div>

      {/* Error Queue */}
      <Toast.Provider placement="bottom start" queue={errorQueue} />
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="danger-soft"
          onPress={() => {
            errorQueue.add({
              description: "保存更改失败",
              title: "发生错误",
              variant: "danger",
            });
          }}
        >
          添加错误（最多 3 条）
        </Button>
      </div>

      {/* Success Queue */}
      <Toast.Provider placement="bottom end" queue={successQueue} />
      <div className="flex justify-center gap-2">
        <Button
          className="text-success"
          size="sm"
          variant="secondary"
          onPress={() => {
            successQueue.add({
              description: `操作 ${Date.now()}`,
              title: "成功！",
              variant: "success",
            });
          }}
        >
          添加成功（最多 1 条）
        </Button>
      </div>
    </div>
  );
}

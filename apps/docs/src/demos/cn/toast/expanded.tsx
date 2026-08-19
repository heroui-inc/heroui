"use client";

import {Button, Toast, ToastQueue} from "@heroui/react";

const queue = new ToastQueue();

export function Expanded() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider isExpanded aria-label="展开的通知" placement="bottom" queue={queue} />
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          queue.add({
            title: "简单消息",
            variant: "default",
          });
          setTimeout(() => {
            queue.add({
              title: "操作已完成",
              variant: "success",
            });
          }, 400);
          setTimeout(() => {
            queue.add({
              title: "有新更新可用",
              variant: "accent",
            });
          }, 800);
        }}
      >
        显示 3 条 Toast
      </Button>
    </div>
  );
}

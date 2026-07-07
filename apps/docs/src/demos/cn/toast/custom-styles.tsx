"use client";

import type {ToastContentValue} from "@heroui/react";

import {
  Button,
  Toast,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastQueue,
  ToastTitle,
} from "@heroui/react";

export function CustomStyles() {
  const queue = new ToastQueue();

  return (
    <div className="flex flex-col items-center gap-4">
      <Toast.Provider placement="bottom" queue={queue}>
        {({toast: toastItem}) => {
          const content = toastItem.content as ToastContentValue;

          return (
            <Toast
              className="rounded-xl border border-border/80 bg-surface shadow-lg ring-1 ring-black/5 dark:ring-white/10"
              toast={toastItem}
              variant={content.variant}
            >
              <ToastContent>
                <div className="flex items-center gap-2.5">
                  <ToastIndicator
                    className="text-neutral-600 dark:text-neutral-400"
                    variant={content.variant}
                  />
                  <div className="flex flex-col gap-0.5">
                    {content.title ? (
                      <ToastTitle className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                        {content.title}
                      </ToastTitle>
                    ) : null}
                    {content.description ? (
                      <ToastDescription className="text-sm text-neutral-600 dark:text-neutral-400">
                        {content.description}
                      </ToastDescription>
                    ) : null}
                  </div>
                </div>
              </ToastContent>
            </Toast>
          );
        }}
      </Toast.Provider>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          queue.add({
            description: "草稿已同步",
            title: "已保存",
            variant: "default",
          });
        }}
      >
        显示提示
      </Button>
    </div>
  );
}

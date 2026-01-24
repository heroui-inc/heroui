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
              description: `Notification ${Date.now()}`,
              title: "New notification",
              variant: "default",
            });
          }}
        >
          Add notification (max 2)
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
              description: `Error ${Date.now()}`,
              title: "Error occurred",
              variant: "danger",
            });
          }}
        >
          Add error (max 3)
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
              description: `Operation ${Date.now()}`,
              title: "Success!",
              variant: "success",
            });
          }}
        >
          Add success (max 1)
        </Button>
      </div>
    </div>
  );
}

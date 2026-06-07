"use client";

import {Button, toast} from "@heroui/react";
import React from "react";

export function Callbacks() {
  const [closedHistory, setClosedHistory] = React.useState<Array<{message: string; time: string}>>(
    [],
  );

  const addToHistory = (message: string) => {
    const time = new Date().toLocaleTimeString();

    setClosedHistory((prev) => [{message, time}, ...prev].slice(0, 5));
  };

  return (
    <div className="flex h-full max-w-2xl flex-col items-center justify-center gap-6">
      {/* Toast Buttons */}
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("文件已保存", {
              onClose: () => {
                addToHistory("文件已保存（3 秒后关闭）");
              },
              timeout: 3000,
            })
          }
        >
          自定义超时（3 秒）
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("更改已保存", {
              onClose: () => {
                addToHistory("更改已保存（10 秒后关闭）");
              },
              timeout: 10000,
            })
          }
        >
          自定义超时（10 秒）
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.success("活动已创建", {
              onClose: () => {
                addToHistory("活动已创建（默认超时后关闭）");
              },
            })
          }
        >
          使用 onClose 回调
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("重要通知", {
              description: "此 Toast 将保持显示直至关闭",
              onClose: () => {
                addToHistory("重要通知（手动关闭）");
              },
              timeout: 0,
            })
          }
        >
          持久显示 Toast
        </Button>
      </div>

      {/* 关闭历史 Panel */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">关闭历史</h3>
          {closedHistory.length > 0 && (
            <Button
              className="h-6 text-xs"
              size="sm"
              variant="tertiary"
              onPress={() => setClosedHistory([])}
            >
              清空
            </Button>
          )}
        </div>
        <div className="min-h-[120px] space-y-2 rounded-lg border border-border bg-surface p-4">
          {closedHistory.length === 0 ? (
            <p className="text-sm text-muted">尚无已关闭的 Toast。请尝试关闭上方的 Toast！</p>
          ) : (
            closedHistory.map((item, index) => (
              <div
                key={`${item.time}-${index}`}
                className="flex animate-in items-start justify-between gap-3 rounded-md border border-border bg-default px-3 py-2 text-sm duration-200 fade-in slide-in-from-top-2"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex-1">
                  <span className="font-medium">{item.message}</span>
                  <span className="ml-2 text-xs text-muted">({item.time})</span>
                </div>
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

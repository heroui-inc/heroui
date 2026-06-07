"use client";

import {Button, toast} from "@heroui/react";

export function Simple() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button size="sm" variant="secondary" onPress={() => toast("简单消息")}>
          默认
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.success("操作已完成")}>
          成功
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.info("有新更新可用")}>
          信息
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.warning("请检查您的设置")}>
          警告
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.danger("出了点问题")}>
          错误
        </Button>
      </div>
    </div>
  );
}

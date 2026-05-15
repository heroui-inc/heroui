"use client";

import {CloseButton} from "@heroui/react";
import {useState} from "react";

export function Interactive() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CloseButton aria-label={`关闭（已点击 ${count} 次）`} onPress={() => setCount(count + 1)} />
      <span className="text-sm text-muted">已点击：{count} 次</span>
    </div>
  );
}

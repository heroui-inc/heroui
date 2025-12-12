"use client";

import {CloseButton} from "@heroui/react";
import {useState} from "react";

export function Interactive() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CloseButton
        aria-label={`Close (clicked ${count} times)`}
        onPress={() => setCount(count + 1)}
      />
      <span className="text-sm text-muted">Clicked: {count} times</span>
    </div>
  );
}

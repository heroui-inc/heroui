"use client";

import {Star} from "@gravity-ui/icons";
import {Button, toast} from "@heroui/react";

export function CustomIndicator() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Button
        size="sm"
        variant="secondary"
        onPress={() =>
          toast("自定义图标指示器", {
            indicator: <Star />,
          })
        }
      >
        自定义指示器
      </Button>
    </div>
  );
}

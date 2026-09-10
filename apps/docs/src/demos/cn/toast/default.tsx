"use client";

import {Persons} from "@gravity-ui/icons";
import {Button, toast} from "@heroui/react";

export function Default() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          const id = toast("您已被邀请加入团队", {
            actionProps: {
              children: "忽略",
              onPress: () => toast.close(id),
              variant: "tertiary",
            },
            description: "Bob 邀请您加入 HeroUI 团队",
            indicator: <Persons />,
            variant: "default",
          });
        }}
      >
        显示 Toast
      </Button>
    </div>
  );
}

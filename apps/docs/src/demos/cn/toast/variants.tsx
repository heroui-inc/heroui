"use client";

import {HardDrive, Persons} from "@gravity-ui/icons";
import {Button, toast} from "@heroui/react";

const noop = () => {};

export function Variants() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="tertiary"
          onPress={() => {
            toast("您已被邀请加入团队", {
              actionProps: {
                children: "忽略",
                onPress: () => toast.clear(),
                variant: "tertiary",
              },
              description: "Bob 邀请您加入 HeroUI 团队",
              indicator: <Persons />,
              variant: "default",
            });
          }}
        >
          默认 Toast
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.info("您还剩 2 个积分", {
              actionProps: {children: "升级", onPress: noop},
              description: "升级付费方案以获取更多积分",
            })
          }
        >
          强调 Toast
        </Button>
        <Button
          className="text-success"
          size="sm"
          variant="tertiary"
          onPress={() =>
            toast.success("您已升级方案", {
              actionProps: {
                children: "账单",
                className: "bg-success text-success-foreground",
                onPress: noop,
              },
              description: "您可以继续使用 HeroUI Chat",
            })
          }
        >
          成功 Toast
        </Button>
        <Button
          className="text-warning"
          size="sm"
          variant="tertiary"
          onPress={() =>
            toast.warning("您的积分已用完", {
              actionProps: {
                children: "升级",
                className: "bg-warning text-warning-foreground",
                onPress: noop,
              },
              description: "升级付费方案以继续使用",
            })
          }
        >
          警告 Toast
        </Button>
        <Button
          size="sm"
          variant="danger-soft"
          onPress={() =>
            toast.danger("存储空间已满", {
              actionProps: {children: "删除", onPress: noop, variant: "danger"},
              description: "删除文件以释放空间。此处增加更多文字以演示较长内容的显示效果",
              indicator: <HardDrive />,
            })
          }
        >
          危险 Toast
        </Button>
      </div>
    </div>
  );
}

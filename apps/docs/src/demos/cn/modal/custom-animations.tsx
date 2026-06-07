"use client";

import {ArrowUpFromLine, Sparkles} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import React from "react";

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  "gravity-ui:arrow-up-from-line": ArrowUpFromLine,
  "gravity-ui:sparkles": Sparkles,
};

export function CustomAnimations() {
  const animations = [
    {
      classNames: {
        backdrop: [
          "data-[entering]:duration-400",
          "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.7,0,0.84,0)]",
        ].join(" "),
        container: [
          "data-[entering]:animate-in",
          "data-[entering]:fade-in-0",
          "data-[entering]:zoom-in-95",
          "data-[entering]:duration-400",
          "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "data-[exiting]:animate-out",
          "data-[exiting]:fade-out-0",
          "data-[exiting]:zoom-out-95",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.7,0,0.84,0)]",
        ].join(" "),
      },
      description:
        "基于物理的弹性缩放，模拟高阻尼弹簧系统：快速瞬态响应与较长 settling 时间。适用于模态框与弹出层。",
      icon: "gravity-ui:sparkles",
      name: "运动缩放",
    },
    {
      classNames: {
        backdrop: [
          "data-[entering]:duration-500",
          "data-[entering]:ease-[cubic-bezier(0.25,1,0.5,1)]",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.5,0,0.75,0)]",
        ].join(" "),
        container: [
          "data-[entering]:animate-in",
          "data-[entering]:fade-in-0",
          "data-[entering]:slide-in-from-bottom-4",
          "data-[entering]:duration-500",
          "data-[entering]:ease-[cubic-bezier(0.25,1,0.5,1)]",
          "data-[exiting]:animate-out",
          "data-[exiting]:fade-out-0",
          "data-[exiting]:slide-out-to-bottom-2",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.5,0,0.75,0)]",
        ].join(" "),
      },
      description:
        "模拟流体阻力中的运动，摆脱机械式线性动画，呈现更自然、沉稳的质感。适用于底部抽屉或 Toast。",
      icon: "gravity-ui:arrow-up-from-line",
      name: "流体滑入",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {animations.map(({classNames, description, icon, name}) => {
        const IconComponent = iconMap[icon];

        return (
          <Modal key={name}>
            <Button variant="secondary">{name}</Button>
            <Modal.Backdrop className={classNames.backdrop}>
              <Modal.Container className={classNames.container}>
                <Modal.Dialog className="sm:max-w-[360px]">
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-default text-foreground">
                      {!!IconComponent && <IconComponent className="size-5" />}
                    </Modal.Icon>
                    <Modal.Heading>{name} 动画</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="mt-1">{description}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button slot="close" variant="tertiary">
                      关闭
                    </Button>
                    <Button slot="close">再试一次</Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        );
      })}
    </div>
  );
}

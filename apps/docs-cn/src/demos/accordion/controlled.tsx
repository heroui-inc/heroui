"use client";

import {ChevronDown, ChevronUp} from "@gravity-ui/icons";
import {Accordion, Button, useDisclosureGroupNavigation} from "@heroui/react";
import React from "react";

const items = [
  {
    content:
      "了解 HeroUI 的基础知识，以及如何将其集成到你的 React 项目中。本节涵盖安装、配置和你的第一个组件。",
    id: "getting-started",
    title: "快速开始",
  },
  {
    content:
      "理解 HeroUI 背后的核心概念，包括复合组件模式、使用 Tailwind CSS 进行样式设计，以及无障碍特性。",
    id: "core-concepts",
    title: "核心概念",
  },
  {
    content: "探索高级特性，例如自定义变体、主题定制，以及与 React 生态中其他库的集成。",
    id: "advanced-usage",
    title: "高级用法",
  },
];

export function Controlled() {
  const [expandedKeys, setExpandedKeys] = React.useState(
    new Set<string | number>(["getting-started"]),
  );
  const itemIds = items.map((item) => item.id);

  const {isNextDisabled, isPrevDisabled, onNext, onPrevious} = useDisclosureGroupNavigation({
    expandedKeys,
    itemIds,
    onExpandedChange: setExpandedKeys,
  });

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">
          已展开：<strong>{[...expandedKeys].join("、") || "无"}</strong>
        </p>
        <div className="flex gap-2">
          <Button
            aria-label="上一项"
            isDisabled={isPrevDisabled}
            size="sm"
            variant="secondary"
            onPress={onPrevious}
          >
            <ChevronUp className="size-4" />
          </Button>
          <Button
            aria-label="下一项"
            isDisabled={isNextDisabled}
            size="sm"
            variant="secondary"
            onPress={onNext}
          >
            <ChevronDown className="size-4" />
          </Button>
        </div>
      </div>
      <Accordion expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
        {items.map((item) => (
          <Accordion.Item key={item.id} id={item.id}>
            <Accordion.Heading>
              <Accordion.Trigger>
                {item.title}
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>{item.content}</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

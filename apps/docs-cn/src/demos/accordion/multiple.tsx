import {Accordion} from "@heroui/react";

export function Multiple() {
  return (
    <Accordion allowsMultipleExpanded className="w-full max-w-md">
      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            快速开始
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            了解 HeroUI 的基础知识，以及如何将其集成到你的 React
            项目中。本节涵盖安装、配置和你的第一个组件。
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            核心概念
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            理解 HeroUI 背后的核心概念，包括复合组件模式、使用 Tailwind CSS
            进行样式设计，以及无障碍特性。
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            高级用法
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            探索高级特性，例如自定义变体、主题定制，以及与 React 生态中其他库的集成。
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            最佳实践
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            遵循我们建议的最佳实践，使用 HeroUI 构建高性能、无障碍且易于维护的应用。
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

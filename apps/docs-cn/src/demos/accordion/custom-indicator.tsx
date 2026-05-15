"use client";

import type {Key} from "@heroui/react";

import {ChevronsDown, CircleChevronDown, Minus, Plus} from "@gravity-ui/icons";
import {Accordion} from "@heroui/react";
import React from "react";

export function CustomIndicator() {
  const [expandedKeys, setExpandedKeys] = React.useState<Set<Key>>(new Set([""]));

  return (
    <Accordion
      className="w-full max-w-md"
      expandedKeys={expandedKeys}
      variant="surface"
      onExpandedChange={setExpandedKeys}
    >
      <Accordion.Item id="1">
        <Accordion.Heading>
          <Accordion.Trigger>
            使用加号/减号图标
            <Accordion.Indicator>
              {expandedKeys.has("1") ? <Minus /> : <Plus />}
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>折叠时显示加号图标，展开时切换为减号图标。</Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item id="2">
        <Accordion.Heading>
          <Accordion.Trigger>
            使用圆形箭头图标
            <Accordion.Indicator>
              <CircleChevronDown />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>此项使用圆形内的箭头作为指示器，旋转动画会自动应用。</Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item id="3">
        <Accordion.Heading>
          <Accordion.Trigger>
            使用双箭头图标
            <Accordion.Indicator>
              <ChevronsDown />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            此项使用双箭头图标。传入任意图标后，在条目展开时都会获得旋转动画。
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

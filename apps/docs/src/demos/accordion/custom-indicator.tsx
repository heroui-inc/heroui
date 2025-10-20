"use client";

import type {Key} from "@heroui/react";

import {Accordion} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";

export function CustomIndicator() {
  const [expandedKeys, setExpandedKeys] = React.useState<Set<Key>>(new Set([""]));

  return (
    <Accordion.Root
      className="w-full max-w-md"
      expandedKeys={expandedKeys}
      variant="outline"
      onExpandedChange={setExpandedKeys}
    >
      <Accordion.Item id="1">
        <Accordion.Heading>
          <Accordion.Trigger>
            Using Plus/Minus Icon
            <Accordion.Indicator>
              {expandedKeys.has("1") ? (
                <Icon icon="gravity-ui:minus" />
              ) : (
                <Icon icon="gravity-ui:plus" />
              )}
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            This accordion uses a plus icon that transforms when expanded. The icon automatically
            rotates 45 degrees to form an X.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item id="2">
        <Accordion.Heading>
          <Accordion.Trigger>
            Using Caret Icon
            <Accordion.Indicator>
              <Icon icon="gravity-ui:circle-chevron-down" />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            This item uses a caret icon for the indicator. The rotation animation is applied
            automatically.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item id="3">
        <Accordion.Heading>
          <Accordion.Trigger>
            Using Arrow Icon
            <Accordion.Indicator>
              <Icon icon="gravity-ui:chevrons-down" />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            This item uses an arrow icon. Any icon you pass will receive the rotation animation when
            the item expands.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}

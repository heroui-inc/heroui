"use client";

import {Accordion} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomIndicator() {
  return (
    <Accordion className="w-full max-w-md" variant="outline">
      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            Using Plus/Minus Icon
            <Accordion.Indicator>
              <Icon icon="gravity-ui:plus" />
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

      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            Using Caret Icon
            <Accordion.Indicator>
              <Icon icon="gravity-ui:caret-down" />
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

      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            Using Arrow Icon
            <Accordion.Indicator>
              <Icon icon="gravity-ui:arrow-down" />
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
    </Accordion>
  );
}

"use client";

import type {Key} from "@heroui/react";

import {
  Accordion,
  AccordionBody,
  AccordionHeading,
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";

export function CustomIndicator() {
  const [expandedKeys, setExpandedKeys] = React.useState<Set<Key>>(new Set([""]));

  return (
    <Accordion
      className="w-full max-w-md"
      expandedKeys={expandedKeys}
      variant="outline"
      onExpandedChange={setExpandedKeys}
    >
      <AccordionItem id="1">
        <AccordionHeading>
          <AccordionTrigger>
            Using Plus/Minus Icon
            <AccordionIndicator>
              {expandedKeys.has("1") ? (
                <Icon icon="gravity-ui:minus" />
              ) : (
                <Icon icon="gravity-ui:plus" />
              )}
            </AccordionIndicator>
          </AccordionTrigger>
        </AccordionHeading>
        <AccordionPanel>
          <AccordionBody>
            This accordion uses a plus icon that transforms when expanded. The icon automatically
            rotates 45 degrees to form an X.
          </AccordionBody>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem id="2">
        <AccordionHeading>
          <AccordionTrigger>
            Using Caret Icon
            <AccordionIndicator>
              <Icon icon="gravity-ui:circle-chevron-down" />
            </AccordionIndicator>
          </AccordionTrigger>
        </AccordionHeading>
        <AccordionPanel>
          <AccordionBody>
            This item uses a caret icon for the indicator. The rotation animation is applied
            automatically.
          </AccordionBody>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem id="3">
        <AccordionHeading>
          <AccordionTrigger>
            Using Arrow Icon
            <AccordionIndicator>
              <Icon icon="gravity-ui:chevrons-down" />
            </AccordionIndicator>
          </AccordionTrigger>
        </AccordionHeading>
        <AccordionPanel>
          <AccordionBody>
            This item uses an arrow icon. Any icon you pass will receive the rotation animation when
            the item expands.
          </AccordionBody>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

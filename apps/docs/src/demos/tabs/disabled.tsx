"use client";

import {Tabs} from "@heroui/react";

export function Disabled() {
  return (
    <Tabs className="w-full max-w-md">
      <Tabs.List aria-label="Tabs with disabled">
        <Tabs.Tab id="active">Active</Tabs.Tab>
        <Tabs.Tab id="disabled" isDisabled>
          Disabled
        </Tabs.Tab>
        <Tabs.Tab id="available">Available</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="active" className="pt-4">
        <p>This tab is active and can be selected.</p>
      </Tabs.Panel>
      <Tabs.Panel id="disabled" className="pt-4">
        <p>This content cannot be accessed.</p>
      </Tabs.Panel>
      <Tabs.Panel id="available" className="pt-4">
        <p>This tab is also available for selection.</p>
      </Tabs.Panel>
    </Tabs>
  );
}
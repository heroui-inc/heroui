"use client";

import {Tabs} from "@heroui/react";

export function Disabled() {
  return (
    <Tabs className="w-full max-w-md">
      <Tabs.ListWrapper>
        <Tabs.List aria-label="Tabs with disabled">
          <Tabs.Tab id="active">Active</Tabs.Tab>
          <Tabs.Tab isDisabled id="disabled">
            Disabled
          </Tabs.Tab>
          <Tabs.Tab id="available">Available</Tabs.Tab>
        </Tabs.List>
        <Tabs.Indicator />
      </Tabs.ListWrapper>
      <Tabs.Panel className="pt-4" id="active">
        <p>This tab is active and can be selected.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="disabled">
        <p>This content cannot be accessed.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="available">
        <p>This tab is also available for selection.</p>
      </Tabs.Panel>
    </Tabs>
  );
}

"use client";

import {Tabs} from "@heroui/react";

export function Basic() {
  return (
    <Tabs className="w-full max-w-md">
      <Tabs.ListWrapper>
        <Tabs.List aria-label="Options">
          <Tabs.Tab id="overview">Overview</Tabs.Tab>
          <Tabs.Tab id="analytics">Analytics</Tabs.Tab>
          <Tabs.Tab id="reports">Reports</Tabs.Tab>
        </Tabs.List>
        <Tabs.Indicator />
      </Tabs.ListWrapper>
      <Tabs.Panel className="pt-4" id="overview">
        <p>View your project overview and recent activity.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="analytics">
        <p>Track your metrics and analyze performance data.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="reports">
        <p>Generate and download detailed reports.</p>
      </Tabs.Panel>
    </Tabs>
  );
}

"use client";

import {Tabs} from "@heroui/react";

export function Basic() {
  return (
    <Tabs className="w-full max-w-md">
      <Tabs.List aria-label="Options">
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab id="analytics">Analytics</Tabs.Tab>
        <Tabs.Tab id="reports">Reports</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="overview" className="pt-4">
        <p>View your project overview and recent activity.</p>
      </Tabs.Panel>
      <Tabs.Panel id="analytics" className="pt-4">
        <p>Track your metrics and analyze performance data.</p>
      </Tabs.Panel>
      <Tabs.Panel id="reports" className="pt-4">
        <p>Generate and download detailed reports.</p>
      </Tabs.Panel>
    </Tabs>
  );
}
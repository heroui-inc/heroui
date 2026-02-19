import {Tabs} from "@heroui/react";

export function WithSeparator() {
  return (
    <Tabs className="w-full max-w-md">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab id="overview">
            Overview
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="analytics">
            <Tabs.Separator />
            Analytics
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="reports">
            <Tabs.Separator />
            Reports
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
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

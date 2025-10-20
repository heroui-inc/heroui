"use client";

import {Tab, TabIndicator, TabList, TabListWrapper, TabPanel, Tabs} from "@heroui/react";

export function Basic() {
  return (
    <Tabs className="w-full max-w-md">
      <TabListWrapper>
        <TabList aria-label="Options">
          <Tab id="overview">
            Overview
            <TabIndicator />
          </Tab>
          <Tab id="analytics">
            Analytics
            <TabIndicator />
          </Tab>
          <Tab id="reports">
            Reports
            <TabIndicator />
          </Tab>
        </TabList>
      </TabListWrapper>
      <TabPanel className="pt-4" id="overview">
        <p>View your project overview and recent activity.</p>
      </TabPanel>
      <TabPanel className="pt-4" id="analytics">
        <p>Track your metrics and analyze performance data.</p>
      </TabPanel>
      <TabPanel className="pt-4" id="reports">
        <p>Generate and download detailed reports.</p>
      </TabPanel>
    </Tabs>
  );
}

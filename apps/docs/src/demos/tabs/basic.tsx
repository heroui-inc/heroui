import {Tab, TabIndicator, TabList, TabListContainer, TabPanel, TabsRoot} from "@heroui/react";

export function Basic() {
  return (
    <TabsRoot className="w-full max-w-md">
      <TabListContainer>
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
      </TabListContainer>
      <TabPanel className="pt-4" id="overview">
        <p>View your project overview and recent activity.</p>
      </TabPanel>
      <TabPanel className="pt-4" id="analytics">
        <p>Track your metrics and analyze performance data.</p>
      </TabPanel>
      <TabPanel className="pt-4" id="reports">
        <p>Generate and download detailed reports.</p>
      </TabPanel>
    </TabsRoot>
  );
}

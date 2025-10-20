"use client";

import {Tab, TabIndicator, TabList, TabListWrapper, TabPanel, Tabs} from "@heroui/react";

export function Disabled() {
  return (
    <Tabs className="w-full max-w-md">
      <TabListWrapper>
        <TabList aria-label="Tabs with disabled">
          <Tab id="active">
            Active
            <TabIndicator />
          </Tab>
          <Tab isDisabled id="disabled">
            Disabled
            <TabIndicator />
          </Tab>
          <Tab id="available">
            Available
            <TabIndicator />
          </Tab>
        </TabList>
      </TabListWrapper>
      <TabPanel className="pt-4" id="active">
        <p>This tab is active and can be selected.</p>
      </TabPanel>
      <TabPanel className="pt-4" id="disabled">
        <p>This content cannot be accessed.</p>
      </TabPanel>
      <TabPanel className="pt-4" id="available">
        <p>This tab is also available for selection.</p>
      </TabPanel>
    </Tabs>
  );
}

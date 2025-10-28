import {Tab, TabIndicator, TabList, TabListContainer, TabPanel, TabsRoot} from "@heroui/react";

export function Disabled() {
  return (
    <TabsRoot className="w-full max-w-md">
      <TabListContainer>
        <TabList aria-label="TabsRoot with disabled">
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
      </TabListContainer>
      <TabPanel className="pt-4" id="active">
        <p>This tab is active and can be selected.</p>
      </TabPanel>
      <TabPanel className="pt-4" id="disabled">
        <p>This content cannot be accessed.</p>
      </TabPanel>
      <TabPanel className="pt-4" id="available">
        <p>This tab is also available for selection.</p>
      </TabPanel>
    </TabsRoot>
  );
}

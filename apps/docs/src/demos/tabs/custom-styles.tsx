import {Tab, TabIndicator, TabList, TabListContainer, TabsRoot} from "@heroui/react";

export function CustomStyles() {
  return (
    <TabsRoot className="w-full max-w-lg text-center">
      <TabListContainer>
        <TabList
          aria-label="Options"
          className="*:data-[selected=true]:text-accent-foreground w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal"
        >
          <Tab id="daily">
            Daily
            <TabIndicator className="bg-accent" />
          </Tab>
          <Tab id="weekly">
            Weekly
            <TabIndicator className="bg-accent" />
          </Tab>
          <Tab id="bi-weekly">
            Bi-Weekly
            <TabIndicator className="bg-accent" />
          </Tab>
          <Tab id="monthly">
            Monthly
            <TabIndicator className="bg-accent" />
          </Tab>
        </TabList>
      </TabListContainer>
    </TabsRoot>
  );
}

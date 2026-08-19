import {ssrSmoke} from "@heroui/testing/helpers";

import {Tabs} from "@/components/tabs";

describe("Tabs SSR", () => {
  it("renders without hydration mismatch with controlled selectedKey and Tabs.Indicator", async () => {
    await ssrSmoke(
      <Tabs data-testid="tabs" selectedKey="analytics">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="overview">
              Overview
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="analytics">
              Analytics
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab isDisabled id="reports">
              Reports
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel id="overview">Overview panel</Tabs.Panel>
        <Tabs.Panel id="analytics">Analytics panel</Tabs.Panel>
        <Tabs.Panel id="reports">Reports panel</Tabs.Panel>
      </Tabs>,
    );
  });
});

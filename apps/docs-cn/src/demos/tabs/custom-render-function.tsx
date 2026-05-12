"use client";

import {Tabs} from "@heroui/react";
import Link from "next/link";

export function CustomRenderFunction() {
  return (
    <Tabs className="w-full max-w-md" render={(props) => <div {...props} data-custom="foo" />}>
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab
            href="/docs/react/getting-started"
            id="getting-started"
            render={(domProps: any) => <Link {...domProps} />}
          >
            Getting Started
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab
            href="/docs/react/components"
            id="components"
            render={(domProps: any) => <Link {...domProps} />}
          >
            Components
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab
            href="/docs/react/releases"
            id="releases"
            render={(domProps: any) => <Link {...domProps} />}
          >
            Releases
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

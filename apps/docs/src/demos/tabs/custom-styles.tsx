import {Tabs} from "@heroui/react";

const tabClass =
  "rounded-none border-b-2 border-transparent px-1 pb-2.5 text-sm text-neutral-600 transition-colors data-[selected=true]:border-neutral-900 data-[selected=true]:font-medium data-[selected=true]:text-neutral-900 dark:text-neutral-400 dark:data-[selected=true]:border-neutral-100 dark:data-[selected=true]:text-neutral-100";

const panelClass = "pt-4 text-sm text-neutral-600 dark:text-neutral-400";

export function CustomStyles() {
  return (
    <Tabs className="w-full max-w-md">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Project sections" className="gap-6 border-b border-border/80">
          <Tabs.Tab className={tabClass} id="overview">
            Overview
          </Tabs.Tab>
          <Tabs.Tab className={tabClass} id="analytics">
            Analytics
          </Tabs.Tab>
          <Tabs.Tab className={tabClass} id="reports">
            Reports
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className={panelClass} id="overview">
        <p>View your project overview and recent activity.</p>
      </Tabs.Panel>
      <Tabs.Panel className={panelClass} id="analytics">
        <p>Track your metrics and analyze performance data.</p>
      </Tabs.Panel>
      <Tabs.Panel className={panelClass} id="reports">
        <p>Generate and download detailed reports.</p>
      </Tabs.Panel>
    </Tabs>
  );
}

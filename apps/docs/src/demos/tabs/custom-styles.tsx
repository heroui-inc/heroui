import {Tabs} from "@heroui/react";

const listClass =
  "w-full gap-1 rounded-xl border border-border bg-surface p-1.5 shadow-sm ring-1 ring-black/5 dark:ring-white/10";

const tabClass =
  "h-9 w-full rounded-lg! px-4 text-sm font-medium text-muted transition-[color,opacity] duration-200 hover:text-foreground data-[selected=true]:font-medium data-[selected=true]:text-background";

const indicatorClass = "rounded-lg! bg-foreground shadow-sm";

const panelClass =
  "mt-4 rounded-xl border border-border/70 bg-linear-to-b from-neutral-50/90 to-white p-4 text-sm leading-relaxed text-muted ring-1 ring-black/5 dark:from-neutral-900/80 dark:to-neutral-950 dark:ring-white/10";

export function CustomStyles() {
  return (
    <Tabs className="w-full max-w-md">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Project sections" className={listClass}>
          <Tabs.Tab className={tabClass} id="overview">
            Overview
            <Tabs.Indicator className={indicatorClass} />
          </Tabs.Tab>
          <Tabs.Tab className={tabClass} id="analytics">
            Analytics
            <Tabs.Indicator className={indicatorClass} />
          </Tabs.Tab>
          <Tabs.Tab className={tabClass} id="reports">
            Reports
            <Tabs.Indicator className={indicatorClass} />
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

import {Tabs} from "@heroui/react";

const listClassName = [
  "rounded-md border border-accent/10 bg-accent-soft/30 p-1 shadow-sm",
  "**:data-[slot=tabs-tab]:rounded-md",
  "**:data-[slot=tabs-tab]:bg-transparent",
  "**:data-[slot=tabs-tab]:text-muted",
  "**:data-[slot=tabs-tab]:opacity-100",
  "**:data-[slot=tabs-tab]:transition-colors",
  "**:data-[slot=tabs-tab]:data-[hovered=true]:not-data-[selected=true]:bg-accent-soft",
  "**:data-[slot=tabs-tab]:data-[hovered=true]:not-data-[selected=true]:text-accent-soft-foreground",
  "**:data-[slot=tabs-tab]:data-[pressed=true]:not-data-[selected=true]:bg-accent-soft-hover",
  "**:data-[slot=tabs-tab]:data-[focus-visible=true]:ring-2",
  "**:data-[slot=tabs-tab]:data-[focus-visible=true]:ring-accent/15",
  "**:data-[slot=tabs-tab]:data-[selected=true]:font-medium",
  "**:data-[slot=tabs-tab]:data-[selected=true]:text-accent-foreground",
  "**:data-[slot=tabs-indicator]:rounded-md",
  "**:data-[slot=tabs-indicator]:bg-accent",
  "**:data-[slot=tabs-indicator]:shadow-none",
].join(" ");

export function CustomStyles() {
  return (
    <Tabs className="w-full max-w-sm">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Billing cycle" className={listClassName}>
          <Tabs.Tab id="monthly">
            Monthly
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="yearly">
            Yearly
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="pt-3 text-sm text-muted" id="monthly">
        Billed monthly, cancel anytime.
      </Tabs.Panel>
      <Tabs.Panel className="pt-3 text-sm text-muted" id="yearly">
        Save 20% with annual billing.
      </Tabs.Panel>
    </Tabs>
  );
}

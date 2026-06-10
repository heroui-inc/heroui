import {Tabs} from "@heroui/react";

const items = [
  {id: "overview", label: "Overview"},
  {id: "analytics", label: "Analytics"},
  {id: "reports", label: "Reports"},
  {id: "performance", label: "Performance"},
  {id: "engagement", label: "Engagement"},
  {id: "audience", label: "Audience"},
  {id: "acquisition", label: "Acquisition"},
  {id: "retention", label: "Retention"},
  {id: "settings", label: "Settings"},
];

export function Overflow() {
  return (
    <div className="w-[400px]">
      <Tabs>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Overflow options">
            {items.map((item) => (
              <Tabs.Tab key={item.id} id={item.id}>
                {item.label}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
        {items.map((item) => (
          <Tabs.Panel key={item.id} className="pt-4" id={item.id}>
            <p>{item.label} panel content.</p>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}

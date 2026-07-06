import {Tabs} from "@heroui/react";

const items = [
  {id: "overview", label: "概览"},
  {id: "analytics", label: "分析"},
  {id: "reports", label: "报告"},
  {id: "performance", label: "性能"},
  {id: "engagement", label: "互动"},
  {id: "audience", label: "受众"},
  {id: "acquisition", label: "获取"},
  {id: "retention", label: "留存"},
  {id: "settings", label: "设置"},
];

export function Overflow() {
  return (
    <div className="w-[400px]">
      <Tabs>
        <Tabs.ListContainer>
          <Tabs.List aria-label="溢出选项">
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
            <p>{item.label} 面板内容。</p>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}

import {Tabs} from "@heroui/react";

export function Disabled() {
  return (
    <Tabs className="w-full max-w-md">
      <Tabs.ListContainer>
        <Tabs.List aria-label="含禁用项的标签页">
          <Tabs.Tab id="active">
            启用
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab isDisabled id="disabled">
            已禁用
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="available">
            可用
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="pt-4" id="active">
        <p>此标签页已启用，可以选择。</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="disabled">
        <p>无法访问此内容。</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="available">
        <p>此标签页也可以选择。</p>
      </Tabs.Panel>
    </Tabs>
  );
}

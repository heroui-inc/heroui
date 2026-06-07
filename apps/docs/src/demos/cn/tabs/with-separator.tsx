import {Tabs} from "@heroui/react";

export function WithSeparator() {
  return (
    <Tabs className="w-full max-w-md">
      <Tabs.ListContainer>
        <Tabs.List aria-label="选项">
          <Tabs.Tab id="overview">
            概览
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="analytics">
            <Tabs.Separator />
            分析
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="reports">
            <Tabs.Separator />
            报告
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="pt-4" id="overview">
        <p>查看项目概览与近期活动。</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="analytics">
        <p>跟踪指标并分析性能数据。</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="reports">
        <p>生成并下载详细报告。</p>
      </Tabs.Panel>
    </Tabs>
  );
}

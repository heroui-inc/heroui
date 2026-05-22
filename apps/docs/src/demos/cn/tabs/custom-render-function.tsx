"use client";

import {Tabs} from "@heroui/react";
import Link from "next/link";

export function CustomRenderFunction() {
  return (
    <Tabs className="w-full max-w-md" render={(props) => <div {...props} data-custom="foo" />}>
      <Tabs.ListContainer>
        <Tabs.List aria-label="选项">
          <Tabs.Tab
            href="/docs/react/getting-started"
            id="getting-started"
            render={(domProps: any) => <Link {...domProps} />}
          >
            快速入门
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab
            href="/docs/react/components"
            id="components"
            render={(domProps: any) => <Link {...domProps} />}
          >
            组件
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab
            href="/docs/react/releases"
            id="releases"
            render={(domProps: any) => <Link {...domProps} />}
          >
            发布说明
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

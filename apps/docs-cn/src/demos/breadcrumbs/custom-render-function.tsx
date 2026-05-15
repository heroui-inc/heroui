"use client";

import {Breadcrumbs} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <Breadcrumbs render={(props) => <ol {...props} data-custom="foo" />}>
      <Breadcrumbs.Item render={(props) => <li {...(props as any)} data-custom="bar" />}>
        首页
      </Breadcrumbs.Item>
      <Breadcrumbs.Item render={(props) => <li {...(props as any)} data-custom="bar" />}>
        产品
      </Breadcrumbs.Item>
      <Breadcrumbs.Item render={(props) => <li {...(props as any)} data-custom="bar" />}>
        电子产品
      </Breadcrumbs.Item>
      <Breadcrumbs.Item render={(props) => <li {...(props as any)} data-custom="bar" />}>
        笔记本电脑
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

"use client";

import {Breadcrumbs} from "@heroui/react";

export default function BreadcrumbsDisabled() {
  return (
    <Breadcrumbs isDisabled>
      <Breadcrumbs.Item href="#">首页</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">产品</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">电子产品</Breadcrumbs.Item>
      <Breadcrumbs.Item>笔记本电脑</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

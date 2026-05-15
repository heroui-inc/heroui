"use client";

import {Breadcrumbs} from "@heroui/react";

export default function BreadcrumbsLevel2() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">首页</Breadcrumbs.Item>
      <Breadcrumbs.Item>当前页面</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

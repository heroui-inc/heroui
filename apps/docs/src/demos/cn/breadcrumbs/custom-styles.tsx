"use client";

import {Breadcrumbs} from "@heroui/react";

export function CustomStyles() {
  return (
    <Breadcrumbs className="rounded-lg bg-default-soft px-3 py-2">
      <Breadcrumbs.Item className="text-muted hover:text-accent" href="#">
        首页
      </Breadcrumbs.Item>
      <Breadcrumbs.Item className="text-muted hover:text-accent" href="#">
        产品
      </Breadcrumbs.Item>
      <Breadcrumbs.Item className="font-medium text-foreground">笔记本电脑</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

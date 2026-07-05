"use client";

import {Breadcrumbs} from "@heroui/react";

export function CustomStyles() {
  return (
    <Breadcrumbs className="rounded-lg bg-default-soft px-3 py-2">
      <Breadcrumbs.Item className="text-muted hover:text-accent" href="#">
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item className="text-muted hover:text-accent" href="#">
        Products
      </Breadcrumbs.Item>
      <Breadcrumbs.Item className="font-medium text-foreground">Laptop</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

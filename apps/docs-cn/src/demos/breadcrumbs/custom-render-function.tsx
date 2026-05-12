"use client";

import {Breadcrumbs} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <Breadcrumbs render={(props) => <ol {...props} data-custom="foo" />}>
      <Breadcrumbs.Item render={(props) => <li {...(props as any)} data-custom="bar" />}>
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item render={(props) => <li {...(props as any)} data-custom="bar" />}>
        Products
      </Breadcrumbs.Item>
      <Breadcrumbs.Item render={(props) => <li {...(props as any)} data-custom="bar" />}>
        Electronics
      </Breadcrumbs.Item>
      <Breadcrumbs.Item render={(props) => <li {...(props as any)} data-custom="bar" />}>
        Laptop
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

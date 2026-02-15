"use client";

import {Breadcrumbs} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <Breadcrumbs render={(props) => <ol {...props} data-custom="foo" />}>
      <Breadcrumbs.Item href="#" render={(props) => <li {...props} data-custom="bar" />}>
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="#" render={(props) => <li {...props} data-custom="bar" />}>
        Products
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="#" render={(props) => <li {...props} data-custom="bar" />}>
        Electronics
      </Breadcrumbs.Item>
      <Breadcrumbs.Item render={(props) => <li {...props} data-custom="bar" />}>
        Laptop
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

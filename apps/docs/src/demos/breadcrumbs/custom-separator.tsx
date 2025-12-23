"use client";

import {Breadcrumbs} from "@heroui/react";
import {Icon} from "@iconify/react";

export default function BreadcrumbsCustomSeparator() {
  return (
    <Breadcrumbs separator={<Icon icon="gravity-ui:caret-right" />}>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Products</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Electronics</Breadcrumbs.Item>
      <Breadcrumbs.Item>Laptop</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

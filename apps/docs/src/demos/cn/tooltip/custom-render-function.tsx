"use client";

import {CircleInfo} from "@gravity-ui/icons";
import {Button, Tooltip} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip delay={0}>
        <Button variant="secondary">悬停查看</Button>
        <Tooltip.Content render={(props) => <div {...props} data-custom="foo" />}>
          <p>这是一个工具提示</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Button isIconOnly variant="tertiary">
          <CircleInfo />
        </Button>
        <Tooltip.Content render={(props) => <div {...props} data-custom="foo" />}>
          <p>更多信息</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

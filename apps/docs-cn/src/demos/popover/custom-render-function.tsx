"use client";

import {Button, Popover} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Button>点击我</Button>
        <Popover.Content
          className="max-w-64"
          render={(props) => <div {...props} data-custom="foo" />}
        >
          <Popover.Dialog>
            <Popover.Heading>弹出层标题</Popover.Heading>
            <p className="mt-2 text-sm text-muted">这是弹出层内容，你可以在这里放置任何内容。</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}

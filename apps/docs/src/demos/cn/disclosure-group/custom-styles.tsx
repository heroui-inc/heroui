"use client";

import {Button, Disclosure, DisclosureGroup, Separator} from "@heroui/react";

export function CustomStyles() {
  return (
    <DisclosureGroup className="w-full max-w-sm rounded-xl bg-default-soft p-2">
      <Disclosure id="billing">
        <Disclosure.Heading>
          <Button className="w-full justify-between" slot="trigger" variant="ghost">
            账单
            <Disclosure.Indicator className="text-muted" />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="text-sm text-muted">发票将于每月 1 日开具。</Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
      <Separator className="my-1" />
      <Disclosure id="support">
        <Disclosure.Heading>
          <Button className="w-full justify-between" slot="trigger" variant="ghost">
            支持
            <Disclosure.Indicator className="text-muted" />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="text-sm text-muted">
            请通过 help@heroui.com 联系我们。通常会在一个工作日内回复。
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </DisclosureGroup>
  );
}

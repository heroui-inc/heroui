"use client";

import {CircleQuestion, CreditCard} from "@gravity-ui/icons";
import {Button, Disclosure, DisclosureGroup, Separator} from "@heroui/react";
import {useState} from "react";

const triggerClass =
  "w-full justify-between rounded-lg px-2 py-2.5 font-medium text-foreground hover:bg-muted/50";

export function CustomStyles() {
  const [expandedKeys, setExpandedKeys] = useState(new Set<string | number>(["billing"]));

  return (
    <div className="w-full max-w-sm rounded-xl border border-border/70 bg-surface/50 p-3 ring-1 ring-black/5 dark:bg-neutral-900/50 dark:ring-white/10">
      <DisclosureGroup expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
        <Disclosure id="billing">
          <Disclosure.Heading>
            <Button className={triggerClass} slot="trigger" variant="ghost">
              <span className="flex items-center gap-2">
                <CreditCard className="size-4 text-muted" />
                Billing
              </span>
              <Disclosure.Indicator className="text-muted" />
            </Button>
          </Disclosure.Heading>
          <Disclosure.Content>
            <Disclosure.Body className="px-2 pb-2 text-sm leading-relaxed text-muted">
              Invoices are issued on the first of each month. Update your card under Account
              settings.
            </Disclosure.Body>
          </Disclosure.Content>
        </Disclosure>
        <Separator className="my-1 bg-border/60" />
        <Disclosure id="support">
          <Disclosure.Heading>
            <Button className={triggerClass} slot="trigger" variant="ghost">
              <span className="flex items-center gap-2">
                <CircleQuestion className="size-4 text-muted" />
                Support
              </span>
              <Disclosure.Indicator className="text-muted" />
            </Button>
          </Disclosure.Heading>
          <Disclosure.Content>
            <Disclosure.Body className="px-2 pb-2 text-sm leading-relaxed text-muted">
              Reach us at help@heroui.com. Typical response time is under one business day.
            </Disclosure.Body>
          </Disclosure.Content>
        </Disclosure>
      </DisclosureGroup>
    </div>
  );
}

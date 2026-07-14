"use client";

import {ShoppingBag} from "@gravity-ui/icons";
import {Button, Disclosure} from "@heroui/react";
import {useState} from "react";

export function CustomStyles() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <Disclosure isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
        <Disclosure.Heading>
          <Button
            className="w-full justify-between rounded-xl border border-border/70 bg-linear-to-b from-neutral-50/90 to-white px-4 py-3 font-medium text-foreground shadow-sm ring-1 ring-black/5 hover:bg-muted/30 dark:from-neutral-900/80 dark:to-neutral-900 dark:ring-white/10"
            slot="trigger"
            variant="ghost"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="size-4 text-muted" />
              配送详情
            </span>
            <Disclosure.Indicator className="text-muted" />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="mt-2 rounded-xl border border-border/70 bg-surface/50 p-4 text-sm leading-relaxed text-muted dark:bg-neutral-900/50">
            订单将在 2 个工作日内发货。标准配送需 3–5 天；结账时可选择加急配送。
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
}

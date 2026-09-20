"use client";

import type {ComponentProps} from "react";

import {Sparkles} from "@gravity-ui/icons";
import {useAgent} from "@heroui/agent/next";
import {Button, Kbd, Tooltip} from "@heroui/react";
import {useEffect} from "react";

import {HEROUI_DOCS_AGENT_ID} from "@/lib/heroui-agent";
import {cn} from "@/utils/cn";

export function HeroUIDocsAgentTrigger({
  className,
  ...props
}: Omit<ComponentProps<typeof Button>, "children" | "onPress">) {
  const agent = useAgent(HEROUI_DOCS_AGENT_ID);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((!event.metaKey && !event.ctrlKey) || event.altKey || event.shiftKey) return;
      if (event.key.toLowerCase() !== "i") return;

      event.preventDefault();
      agent.toggle();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [agent]);

  return (
    <Tooltip delay={300}>
      <Tooltip.Trigger role="presentation" tabIndex={-1}>
        <Button
          {...props}
          isIconOnly
          aria-keyshortcuts="Meta+I Control+I"
          aria-label="Ask AI"
          size="sm"
          variant="tertiary"
          className={cn(
            "size-[34px] shrink-0 border-none active:scale-100 data-[pressed=true]:scale-100",
            className,
          )}
          onPress={() => agent.toggle()}
        >
          <Sparkles className="size-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content placement="bottom">
        <span className="flex items-center gap-2">
          Ask AI
          <Kbd className="h-5 rounded-md px-1.5 text-[11px]">
            <Kbd.Content>⌘ I</Kbd.Content>
          </Kbd>
        </span>
      </Tooltip.Content>
    </Tooltip>
  );
}

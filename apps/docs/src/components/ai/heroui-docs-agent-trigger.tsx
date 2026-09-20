"use client";

import type {ComponentProps} from "react";

import {Sparkles} from "@gravity-ui/icons";
import {useAgent} from "@heroui/agent/next";
import {Button, Kbd} from "@heroui/react";
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
    <Button
      aria-keyshortcuts="Meta+I Control+I"
      aria-label="Ask AI"
      className={cn("shrink-0", className)}
      size="sm"
      variant="tertiary"
      onPress={() => agent.toggle()}
      {...props}
    >
      <Sparkles className="size-4" />
      <span className="hidden lg:inline">Ask AI</span>
      <Kbd className="hidden xl:inline-flex">
        <Kbd.Content>⌘ I</Kbd.Content>
      </Kbd>
    </Button>
  );
}

"use client";

import {ArrowUturnCcwLeft, ArrowUturnCwRight, Code, NodesRight} from "@gravity-ui/icons";
import {Button, Chip, Separator, Tabs, Tooltip} from "@heroui/react";
import Link from "next/link";

import {HeroUILogo} from "@/components/heroui-logo";
import {useCodePanel} from "@/hooks/use-code-panel";

import {tabs} from "../constants";
import {useUndoRedo} from "../hooks";

import {ResetButton} from "./reset-button";
import {ShuffleButton} from "./shuffle-button";
import {SwitchMode} from "./switch-mode";

export function BuilderHeader() {
  const {canRedo, canUndo, redo, undo} = useUndoRedo();
  const {isCodeVisible, toggleCode} = useCodePanel();

  return (
    <div className="sticky top-0 z-50 mb-3 flex h-14 w-full items-center justify-center bg-background px-2 min-[1200px]:mb-6 min-[1200px]:px-0">
      <div className="flex h-14 w-full max-w-[1400px] items-center justify-between min-[1200px]:h-14">
        <div className="flex items-center gap-4">
          <Link href="/">
            <HeroUILogo />
          </Link>
          <div className="flex items-center gap-3">
            <Tooltip closeDelay={0} delay={100}>
              <Tooltip.Trigger className="hidden min-[1200px]:inline-flex">
                <Button
                  isIconOnly
                  isDisabled={!canUndo}
                  size="md"
                  variant="tertiary"
                  onPress={() => undo()}
                >
                  <ArrowUturnCcwLeft />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <Tooltip.Arrow />
                <p>Undo last change</p>
              </Tooltip.Content>
            </Tooltip>
            <Tooltip closeDelay={0} delay={100}>
              <Tooltip.Trigger className="hidden min-[1200px]:inline-flex">
                <Button
                  isIconOnly
                  isDisabled={!canRedo}
                  size="md"
                  variant="tertiary"
                  onPress={() => redo()}
                >
                  <ArrowUturnCwRight />
                </Button>
                <Tooltip.Content>
                  <Tooltip.Arrow />
                  <p>Redo last change</p>
                </Tooltip.Content>
              </Tooltip.Trigger>
            </Tooltip>
            <Separator className="hidden h-6 min-[1200px]:block" orientation="vertical" />
            <ResetButton />
            <div className="hidden sm:block">
              <ShuffleButton />
            </div>
          </div>
        </div>
        <div className="relative hidden min-[1200px]:block">
          <Tabs>
            <Tabs.ListContainer>
              <Tabs.List>
                {tabs.map((tab) => (
                  <Tabs.Tab
                    key={tab.label}
                    className="pointer-events-auto cursor-not-allowed capitalize"
                    id={tab.label}
                    isDisabled={tab.disabled}
                  >
                    {tab.disabled ? (
                      <Tooltip>
                        <Tooltip.Trigger className="cursor-not-allowed">
                          {tab.label}
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <Tooltip.Arrow />
                          <p>Soon</p>
                        </Tooltip.Content>
                      </Tooltip>
                    ) : (
                      tab.label
                    )}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
          <Chip className="absolute -top-1 -right-3" color="accent" size="sm" variant="soft">
            Soon
          </Chip>
        </div>
        <div className="flex w-auto justify-end gap-3 min-[1200px]:w-[244px]">
          <div className="flex h-auto items-center">
            <SwitchMode />
          </div>
          <Tooltip closeDelay={0} delay={100}>
            <Tooltip.Trigger>
              <Button isIconOnly size="md" variant="tertiary">
                <NodesRight />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Arrow />
              <p>Share theme link</p>
            </Tooltip.Content>
          </Tooltip>
          <Tooltip closeDelay={0} delay={100}>
            <Tooltip.Trigger className="hidden min-[1200px]:inline-flex">
              <Button
                isIconOnly
                size="md"
                variant={isCodeVisible ? "primary" : "tertiary"}
                onPress={toggleCode}
              >
                <Code />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Arrow />
              <p>View code</p>
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

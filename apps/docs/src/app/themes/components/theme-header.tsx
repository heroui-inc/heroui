"use client";

import {
  ArrowRotateLeft,
  ArrowUturnCcwLeft,
  ArrowUturnCwRight,
  Code,
  NodesRight,
} from "@gravity-ui/icons";
import {Button, Separator, Tabs} from "@heroui/react";
import Link from "next/link";
import {useStore} from "zustand";

import {HeroUILogo} from "@/components/heroui-logo";
import {useThemeBuilder} from "@/stores/theme-builder";

import {tabs} from "../constants";

export function ThemeHeader() {
  const {futureStates, pastStates, redo, undo} = useStore(useThemeBuilder.temporal);
  const reset = useThemeBuilder((state) => state.reset);

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

  return (
    <div className="mb-6 flex h-15 w-full items-center justify-center">
      <div className="flex h-14 w-full max-w-[1400px] items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <HeroUILogo />
          </Link>
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              isDisabled={!canUndo}
              size="md"
              variant="tertiary"
              onPress={() => undo()}
            >
              <ArrowUturnCcwLeft />
            </Button>
            <Button
              isIconOnly
              isDisabled={!canRedo}
              size="md"
              variant="tertiary"
              onPress={() => redo()}
            >
              <ArrowUturnCwRight />
            </Button>
            <Separator className="h-6" orientation="vertical" />
            <Button isIconOnly size="md" variant="tertiary" onPress={reset}>
              <ArrowRotateLeft />
            </Button>
          </div>
        </div>
        <Tabs>
          <Tabs.ListContainer>
            <Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Tab key={tab} className="capitalize" id={tab}>
                  {tab}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
        <div className="flex w-[244px] items-center justify-end gap-3">
          <Button isIconOnly size="md" variant="tertiary">
            <NodesRight />
          </Button>
          <Button isIconOnly size="md" variant="tertiary">
            <Code />
          </Button>
        </div>
      </div>
    </div>
  );
}

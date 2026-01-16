"use client";

import {ArrowUturnCcwLeft, ArrowUturnCwRight, Code, NodesRight} from "@gravity-ui/icons";
import {Button, Chip, Separator, Tabs} from "@heroui/react";
import Link from "next/link";

import {HeroUILogo} from "@/components/heroui-logo";
import {useCodePanel} from "@/hooks/use-code-panel";

import {tabs} from "../constants";
import {useUndoRedo} from "../hooks";

import {ResetButton} from "./reset-button";
import {SwitchMode} from "./switch-mode";

export function BuilderHeader() {
  const {canRedo, canUndo, redo, undo} = useUndoRedo();
  const {isCodeVisible, toggleCode} = useCodePanel();

  return (
    <div className="sticky top-0 z-50 mb-3 flex h-14 w-full items-center justify-center bg-background px-2 xl:mb-6 xl:px-0">
      <div className="flex h-14 w-full max-w-[1400px] items-center justify-between xl:h-14">
        <div className="flex items-center gap-4">
          <Link href="/">
            <HeroUILogo />
          </Link>
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              className="hidden xl:inline-flex"
              isDisabled={!canUndo}
              size="md"
              variant="tertiary"
              onPress={() => undo()}
            >
              <ArrowUturnCcwLeft />
            </Button>
            <Button
              isIconOnly
              className="hidden xl:inline-flex"
              isDisabled={!canRedo}
              size="md"
              variant="tertiary"
              onPress={() => redo()}
            >
              <ArrowUturnCwRight />
            </Button>
            <Separator className="hidden h-6 xl:block" orientation="vertical" />
            <ResetButton />
          </div>
        </div>
        <div className="relative hidden xl:block">
          <Tabs>
            <Tabs.ListContainer>
              <Tabs.List>
                {tabs.map((tab) => (
                  <Tabs.Tab
                    key={tab.label}
                    className="capitalize"
                    id={tab.label}
                    isDisabled={tab.disabled}
                  >
                    {tab.label}
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
        <div className="flex w-auto justify-end gap-3 xl:w-[244px]">
          <div className="flex h-auto items-center xl:hidden">
            <SwitchMode />
          </div>
          <Button isIconOnly size="md" variant="tertiary">
            <NodesRight />
          </Button>
          <Button
            isIconOnly
            className="hidden xl:inline-flex"
            size="md"
            variant={isCodeVisible ? "primary" : "tertiary"}
            onPress={toggleCode}
          >
            <Code />
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import type {TabLabel} from "../constants";

import {
  ArrowUturnCcwLeft,
  ArrowUturnCwRight,
  Code,
  Link as LinkIcon,
  NodesRight,
} from "@gravity-ui/icons";
import {Button, Kbd, Separator, Tabs, Tooltip, toast} from "@heroui/react";
import Link from "next/link";
import {useParams} from "next/navigation";

import {HeroUILogo} from "@/components/heroui-logo";
import {useCodePanel} from "@/hooks/use-code-panel";
import {useDictionary} from "@/hooks/use-dictionary";
import useKeyPress from "@/hooks/use-key-press";
import {i18n} from "@/lib/i18n";

import {tabs} from "../constants";
import {usePreviewTab, useUndoRedo} from "../hooks";

import {ResetButton} from "./reset-button";
import {ShuffleButton} from "./shuffle-button";
import {SwitchMode} from "./switch-mode";

export function BuilderHeader() {
  const {canRedo, canUndo, redo, undo} = useUndoRedo();
  const {isCodeVisible, toggleCode} = useCodePanel();
  const {selectedTab, setSelectedTab} = usePreviewTab();
  const themeBuilderDict = useDictionary().themeBuilder;
  const dict = themeBuilderDict.header;
  const tabLabels = themeBuilderDict.tabs;
  const params = useParams<{lang?: string}>();
  const lang =
    params?.lang && (i18n.languages as readonly string[]).includes(params.lang)
      ? params.lang
      : i18n.defaultLanguage;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast(dict.linkCopied, {
      description: dict.linkCopiedDescription,
      indicator: <LinkIcon />,
      variant: "success",
    });
  };

  useKeyPress("ArrowLeft", () => undo(), {enabled: canUndo});
  useKeyPress("ArrowRight", () => redo(), {enabled: canRedo});

  return (
    <div className="sticky top-0 z-50 mb-3 flex h-14 w-full items-center justify-center bg-background px-2 min-[1200px]:mb-4 min-[1200px]:px-0">
      <div className="flex h-14 w-full max-w-[1400px] items-center justify-between min-[1200px]:h-14">
        <div className="flex items-center gap-4">
          <Link href={`/${lang}`}>
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
                <p>
                  {dict.undo}{" "}
                  <Kbd>
                    <Kbd.Abbr keyValue="left" />
                  </Kbd>
                </p>
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
                  <p>
                    {dict.redo}{" "}
                    <Kbd>
                      <Kbd.Abbr keyValue="right" />
                    </Kbd>
                  </p>
                </Tooltip.Content>
              </Tooltip.Trigger>
            </Tooltip>
            <Separator
              className="hidden h-6 self-center min-[1200px]:block"
              orientation="vertical"
            />
            <ResetButton />
            <div className="hidden sm:block">
              <ShuffleButton />
            </div>
          </div>
        </div>
        <div className="relative hidden min-[1200px]:block">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as TabLabel)}
          >
            <Tabs.ListContainer>
              <Tabs.List>
                {tabs.map((tab) => (
                  <Tabs.Tab key={tab.label} className="whitespace-nowrap" id={tab.label}>
                    {tabLabels[tab.label]}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>
        <div className="flex w-auto justify-end gap-3 min-[1200px]:w-[244px]">
          <div className="flex h-auto items-center">
            <SwitchMode />
          </div>
          <Tooltip closeDelay={0} delay={100}>
            <Tooltip.Trigger>
              <Button isIconOnly size="md" variant="tertiary" onPress={handleShare}>
                <NodesRight />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Arrow />
              <p>{dict.share}</p>
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
              <p>{dict.viewCode}</p>
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

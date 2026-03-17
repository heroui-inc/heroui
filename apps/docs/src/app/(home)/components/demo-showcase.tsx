"use client";

import type {CSSProperties} from "react";
import type {Color} from "react-aria-components";

import {Palette} from "@gravity-ui/icons";
import {ColorSwatchPicker, Tabs, buttonVariants} from "@heroui/react";
import {converter} from "culori";
import LinkRoot from "fumadocs-core/link";
import {useTheme} from "next-themes";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

import {DemoComponents} from "@/components/demo";

import {
  calculateAccentForeground,
  getAccentDerivedVariables,
} from "../../themes/utils/generate-theme-colors";

const tabs = [
  {label: "components"},
  {label: "dashboard"},
  {label: "mail"},
  {label: "chat"},
  {label: "finances"},
];

const iframeTabs: Record<string, string> = {
  chat: "https://heroui.pro/templates/chat",
  dashboard: "https://heroui.pro/templates/dashboard",
  finances: "https://heroui.pro/templates/finances",
  mail: "https://heroui.pro/templates/mail",
};

const colors = [
  "#FF81B9", // pink
  "#FF8289", // red
  "#FF9A00", // orange
  "#DCBE00", // yellow
  "#72DB5A", // green
  "#00D7FF", // soft teal
  "#5DBFFF", // soft cyan
  "#A8ABFF", // soft blue
];

const toOklch = converter("oklch");

function getAccentStyleVars(color: Color): Record<string, string> {
  const oklch = toOklch(color.toString("css"));

  if (!oklch) return {};

  const l = oklch.l ?? 0;
  const c = oklch.c ?? 0;
  const h = oklch.h ?? 0;

  const accent = `oklch(${(l * 100).toFixed(2)}% ${c.toFixed(4)} ${h.toFixed(2)})`;
  const accentFg = calculateAccentForeground(l, c, h);

  return {
    "--accent": accent,
    "--accent-foreground": accentFg,
    "--focus": accent,
    ...getAccentDerivedVariables(accent, accentFg),
  };
}

export function DemoShowcase() {
  const [selectedTab, setSelectedTab] = useState("components");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {resolvedTheme} = useTheme();

  const accentVars = useMemo(
    () => (selectedColor ? getAccentStyleVars(selectedColor) : {}),
    [selectedColor],
  );

  const sendMessageToIframe = useCallback(() => {
    const iframe = iframeRef.current;

    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage({theme: resolvedTheme ?? "dark", type: "heroui-theme"}, "*");
    if (Object.keys(accentVars).length > 0) {
      iframe.contentWindow.postMessage({type: "heroui-accent", vars: accentVars}, "*");
    }
  }, [accentVars, resolvedTheme]);

  // Re-send whenever theme or accent changes
  useEffect(() => {
    sendMessageToIframe();
  }, [sendMessageToIframe]);

  // Listen for iframe requesting initial state
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "heroui-ready") {
        sendMessageToIframe();
      }
    }

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, [sendMessageToIframe]);

  return (
    <div className="w-full max-w-[1200px] py-24 pb-1">
      <div className="mb-4 hidden w-full flex-col justify-between gap-4 lg:flex lg:flex-row lg:items-center">
        <Tabs selectedKey={selectedTab} onSelectionChange={(key) => setSelectedTab(key as string)}>
          <Tabs.ListContainer>
            <Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Tab key={tab.label} className="capitalize" id={tab.label}>
                  {tab.label}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
        <ColorSwatchPicker onChange={setSelectedColor}>
          {colors.map((color) => (
            <ColorSwatchPicker.Item key={color} color={color}>
              <ColorSwatchPicker.Swatch />
              <ColorSwatchPicker.Indicator />
            </ColorSwatchPicker.Item>
          ))}
        </ColorSwatchPicker>
      </div>
      <div
        className="flex max-w-[1200px] flex-col gap-1.5 rounded-[35px] bg-surface-secondary/50 pt-3 pb-1"
        style={accentVars as CSSProperties}
      >
        <div className="flex items-center justify-between pr-4 pl-5">
          <div className="flex flex-1 items-center gap-3">
            <div className="size-3.5 rounded-full bg-muted opacity-30" />
            <div className="size-3.5 rounded-full bg-muted opacity-30" />
            <div className="size-3.5 rounded-full bg-muted opacity-30" />
          </div>
          {selectedTab !== "components" && (
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted">Available in Pro as template</p>
            </div>
          )}
          <div className="flex flex-1 justify-end">
            <LinkRoot
              className={buttonVariants({className: "text-muted", size: "sm", variant: "ghost"})}
              href="/themes"
            >
              <Palette className="size-4" />
              Open in theme builder
            </LinkRoot>
          </div>
        </div>
        {/* Mobile: always show DemoComponents */}
        <div className="mt-5 flex w-full justify-center lg:hidden">
          <DemoComponents />
        </div>
        {/* Desktop: respect tab selection */}
        <div className="hidden lg:block">
          {selectedTab === "components" ? (
            <DemoComponents />
          ) : iframeTabs[selectedTab] ? (
            <iframe
              ref={iframeRef}
              className="h-[650px] w-full rounded-[28px] border-none px-1"
              src={iframeTabs[selectedTab]}
              title={selectedTab}
              onLoad={sendMessageToIframe}
            />
          ) : (
            <div className="flex h-[400px] items-center justify-center text-muted">Coming soon</div>
          )}
        </div>
      </div>
    </div>
  );
}

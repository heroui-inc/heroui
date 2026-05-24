"use client";

import type {ThemeId} from "../../themes/constants";
import type {CSSProperties} from "react";
import type {Color} from "react-aria-components";

import {Palette} from "@gravity-ui/icons";
import {ColorSwatchPicker, Spinner, Tabs, Tooltip, buttonVariants} from "@heroui/react";
import {converter} from "culori";
import LinkRoot from "fumadocs-core/link";
import {useTheme} from "next-themes";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

import {DemoComponents} from "@/components/demo";
import {cn} from "@/utils/cn";
import {
  DEFAULT_DESIGN_THEME,
  DESIGN_THEME_CHANGE_EVENT,
  DESIGN_THEME_STORAGE_KEY,
  getStoredDesignTheme,
  isDesignThemeId,
} from "@/utils/design-theme";

import {HEROUI_PRO_URL, iframeTabs, themeValuesById} from "../../themes/constants";
import {computeThemeVars} from "../../themes/hooks";
import {
  calculateAccentForeground,
  getDerivedColorFormulas,
} from "../../themes/utils/generate-theme-colors";

const tabs = [
  {label: "components"},
  {label: "dashboard"},
  {label: "mail"},
  {label: "chat"},
  {label: "finances"},
];

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

function getProUrl(utm: {campaign?: string; content?: string; medium: string}) {
  const url = new URL(HEROUI_PRO_URL);

  url.searchParams.set("utm_source", "heroui.com");
  url.searchParams.set("utm_medium", utm.medium);
  if (utm.campaign) url.searchParams.set("utm_campaign", utm.campaign);
  if (utm.content) url.searchParams.set("utm_content", utm.content);

  return url.toString();
}

function getAccentStyleVars(color: Color, theme: "light" | "dark"): Record<string, string> {
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
    ...getDerivedColorFormulas(theme),
  };
}

const LOADER_DURATION_MS = 250;

export function DemoShowcase() {
  const [selectedTab, setSelectedTab] = useState("components");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [activeDesignTheme, setActiveDesignTheme] = useState<ThemeId>(getStoredDesignTheme);
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {resolvedTheme} = useTheme();

  const currentTheme = (resolvedTheme === "dark" ? "dark" : "light") as "light" | "dark";

  const accentVars = useMemo(
    () => (selectedColor ? getAccentStyleVars(selectedColor, currentTheme) : {}),
    [selectedColor, currentTheme],
  );

  const computedDesignThemeVars = useMemo(
    () => computeThemeVars(themeValuesById[activeDesignTheme]),
    [activeDesignTheme],
  );

  const iframeThemeVars = useMemo(() => {
    const modeVars =
      resolvedTheme === "light"
        ? computedDesignThemeVars.fullLightVars
        : computedDesignThemeVars.fullDarkVars;

    return Object.keys(accentVars).length > 0 ? {...modeVars, ...accentVars} : modeVars;
  }, [accentVars, computedDesignThemeVars, resolvedTheme]);

  const themeBuilderHref = useMemo(() => {
    const params = new URLSearchParams();

    if (selectedTab !== "components") {
      params.set("template", selectedTab);
    }
    if (selectedColor) {
      const oklch = toOklch(selectedColor.toString("css"));

      if (oklch) {
        params.set("lightness", String(oklch.l ?? 0));
        params.set("chroma", String(oklch.c ?? 0));
        params.set("hue", String(oklch.h ?? 0));
      }
    }
    const qs = params.toString();

    return qs ? `/themes?${qs}` : "/themes";
  }, [selectedTab, selectedColor]);

  const [prevSelectedTab, setPrevSelectedTab] = useState(selectedTab);

  if (selectedTab !== prevSelectedTab) {
    setPrevSelectedTab(selectedTab);
    if (!iframeLoading) {
      setIframeLoading(true);
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveDesignTheme(getStoredDesignTheme());
    });

    function handleDesignThemeChange(event: Event) {
      const themeId = (event as CustomEvent<{themeId?: string}>).detail?.themeId;

      if (isDesignThemeId(themeId)) {
        setActiveDesignTheme(themeId);
      }
    }

    function handleStorage(event: StorageEvent) {
      if (event.key !== DESIGN_THEME_STORAGE_KEY) return;

      setActiveDesignTheme(isDesignThemeId(event.newValue) ? event.newValue : DEFAULT_DESIGN_THEME);
    }

    window.addEventListener(DESIGN_THEME_CHANGE_EVENT, handleDesignThemeChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener(DESIGN_THEME_CHANGE_EVENT, handleDesignThemeChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const sendMessageToIframe = useCallback(() => {
    const iframe = iframeRef.current;

    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage({theme: resolvedTheme ?? "dark", type: "heroui-theme"}, "*");
    iframe.contentWindow.postMessage({type: "heroui-accent", vars: iframeThemeVars}, "*");
    iframe.contentWindow.postMessage(
      {
        cdnUrl: computedDesignThemeVars.fontMeta.cdnUrl,
        family: computedDesignThemeVars.fontMeta.family,
        type: "heroui-font",
        variable: computedDesignThemeVars.fontMeta.variable,
      },
      "*",
    );
  }, [computedDesignThemeVars.fontMeta, iframeThemeVars, resolvedTheme]);

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

  const handleIframeLoad = useCallback(() => {
    sendMessageToIframe();
    setTimeout(() => {
      setIframeLoading(false);
    }, LOADER_DURATION_MS);
  }, [sendMessageToIframe]);

  return (
    <div className="flex min-h-0 w-full max-w-[1200px] flex-1 flex-col py-6 lg:py-10">
      <div className="mb-4 hidden w-full flex-col justify-between gap-4 px-2 lg:flex lg:flex-row lg:items-center">
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
        <div className="flex items-center gap-3">
          <a
            className={`text-[13px] font-medium text-muted transition-opacity duration-300 hover:text-foreground ${selectedTab !== "components" ? "opacity-100" : "pointer-events-none opacity-0"}`}
            rel="noopener noreferrer"
            target="_blank"
            href={getProUrl({
              campaign: "demo-showcase",
              content: `template-${selectedTab}`,
              medium: "homepage",
            })}
          >
            Available in Pro as template
          </a>
          <div className="flex items-center gap-1">
            <ColorSwatchPicker size="sm" onChange={setSelectedColor}>
              {colors.map((color) => (
                <ColorSwatchPicker.Item key={color} color={color}>
                  <ColorSwatchPicker.Swatch />
                  <ColorSwatchPicker.Indicator />
                </ColorSwatchPicker.Item>
              ))}
            </ColorSwatchPicker>
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <LinkRoot
                  href={themeBuilderHref}
                  className={buttonVariants({
                    className: "text-muted",
                    isIconOnly: true,
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  <Palette className="size-4" />
                </LinkRoot>
              </Tooltip.Trigger>
              <Tooltip.Content className="py-0">Open in theme builder</Tooltip.Content>
            </Tooltip>
          </div>
        </div>
      </div>
      <div
        className="flex min-h-[420px] max-w-[1200px] flex-1 flex-col"
        style={accentVars as CSSProperties}
      >
        {/* Mobile: always show DemoComponents */}
        <div className="flex w-full justify-center rounded-2xl bg-background py-8 lg:hidden">
          <DemoComponents />
        </div>
        {/* Desktop: respect tab selection */}
        <div className="relative hidden min-h-0 flex-1 lg:flex lg:flex-col">
          <div
            className={`flex flex-1 justify-center overflow-x-hidden overflow-y-auto rounded-2xl border border-border/50 bg-background py-8 ${selectedTab !== "components" ? "invisible" : ""}`}
          >
            <div className="my-auto">
              <DemoComponents />
            </div>
          </div>
          {selectedTab !== "components" && iframeTabs[selectedTab] != null && (
            <div className="absolute inset-0">
              <iframe
                ref={iframeRef}
                className="absolute inset-0 h-full w-full rounded-2xl border border-border/50"
                src={iframeTabs[selectedTab]}
                title={selectedTab}
                onLoad={handleIframeLoad}
              />
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background transition-opacity duration-300",
                  iframeLoading ? "opacity-100" : "opacity-0",
                )}
              >
                <Spinner />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

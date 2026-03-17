"use client";

import {Spinner} from "@heroui/react";
import {UNSAFE_PortalProvider} from "@react-aria/overlays";
import {useTheme} from "next-themes";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

import {DemoComponents} from "@/components/demo";
import {cn} from "@/utils/cn";

import {THEME_BUILDER_CONTENT_ID, iframeTabs} from "../constants";
import {useComputedThemeVars, useCssSync, usePreviewTab} from "../hooks";

const LOADER_DURATION_MS = 250;

export function PreviewContainer() {
  const [isMounted, setIsMounted] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const container = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {selectedTab} = usePreviewTab();
  const {resolvedTheme} = useTheme();
  const {fullDarkVars, fullLightVars} = useComputedThemeVars();

  const themeVars = useMemo(
    () => (resolvedTheme === "light" ? fullLightVars : fullDarkVars),
    [resolvedTheme, fullLightVars, fullDarkVars],
  );

  useCssSync();

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    });
  }, []);

  const [prevSelectedTab, setPrevSelectedTab] = useState(selectedTab);

  if (selectedTab !== prevSelectedTab) {
    setPrevSelectedTab(selectedTab);
    if (!iframeLoading) {
      setIframeLoading(true);
    }
  }

  const sendMessageToIframe = useCallback(() => {
    const iframe = iframeRef.current;

    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage({theme: resolvedTheme ?? "dark", type: "heroui-theme"}, "*");
    iframe.contentWindow.postMessage({type: "heroui-accent", vars: themeVars}, "*");
  }, [themeVars, resolvedTheme]);

  useEffect(() => {
    sendMessageToIframe();
  }, [sendMessageToIframe]);

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

  const isComponentsTab = selectedTab === "components";
  const iframeSrc = iframeTabs[selectedTab];

  return (
    <UNSAFE_PortalProvider getContainer={() => container.current}>
      <div
        ref={container}
        id={THEME_BUILDER_CONTENT_ID}
        className={cn(
          "flex h-full w-full flex-1 items-center bg-background px-4 py-8 font-sans xl:px-5 xl:py-7",
          !isComponentsTab && "lg:p-0!",
        )}
      >
        {/* Mobile: always show DemoComponents */}
        <div className="flex w-full justify-center lg:hidden">
          {isMounted ? <DemoComponents /> : null}
        </div>
        {/* Desktop: respect tab selection */}
        <div className="hidden lg:flex lg:h-full lg:w-full lg:flex-1 lg:items-center">
          {isComponentsTab ? (
            isMounted ? (
              <DemoComponents />
            ) : null
          ) : iframeSrc ? (
            <div className="relative h-full min-h-[650px] w-full">
              <iframe
                ref={iframeRef}
                className="min-h-[650px] w-full border-none"
                src={iframeSrc}
                title={selectedTab}
                onLoad={handleIframeLoad}
              />
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background transition-opacity duration-300",
                  iframeLoading ? "opacity-100" : "opacity-0",
                )}
              >
                <Spinner />
              </div>
            </div>
          ) : (
            <div className="flex h-[400px] w-full items-center justify-center text-muted">
              Coming soon
            </div>
          )}
        </div>
      </div>
    </UNSAFE_PortalProvider>
  );
}

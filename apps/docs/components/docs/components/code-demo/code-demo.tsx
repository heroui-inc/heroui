"use client";

import React, {useCallback, useMemo, useRef, useState} from "react";
import dynamic from "next/dynamic";
import {addToast, Button, Skeleton, Spinner, Tab, Tabs} from "@heroui/react";
import {useInView} from "framer-motion";
import {usePostHog} from "posthog-js/react";
import {usePathname} from "next/navigation";

import {useCodeDemo, UseCodeDemoProps} from "./use-code-demo";
import WindowResizer, {WindowResizerProps} from "./window-resizer";
import {parseDependencies} from "./parse-dependencies";

import {GradientBoxProps} from "@/components/gradient-box";
import {SmallLogo} from "@/components/heroui-logo";
import {openInChat} from "@/actions/open-in-chat";

const DynamicReactLiveDemo = dynamic(
  () => import("./react-live-demo").then((m) => m.ReactLiveDemo),
  {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => <Skeleton className="w-full h-24 rounded-xl" />,
  },
);

const DynamicSandpack = dynamic(() => import("../../../sandpack").then((m) => m.Sandpack), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <Skeleton className="w-full h-32 rounded-xl" />,
});

interface CodeDemoProps extends UseCodeDemoProps, WindowResizerProps {
  title?: string;
  asIframe?: boolean;
  showSandpackPreview?: boolean;
  initialEditorOpen?: boolean;
  enableResize?: boolean;
  showPreview?: boolean;
  hideWindowActions?: boolean;
  showOpenInCodeSandbox?: boolean;
  isPreviewCentered?: boolean;
  resizeEnabled?: boolean;
  typescriptStrict?: boolean;
  displayMode?: "always" | "visible";
  isGradientBox?: boolean;
  gradientColor?: GradientBoxProps["color"];
  previewHeight?: string | number;
  overflow?: "auto" | "visible" | "hidden";
  className?: string;
}

export const CodeDemo: React.FC<CodeDemoProps> = ({
  files = {},
  title,
  showEditor = true,
  showPreview = true,
  asIframe = false,
  showTabs = true,
  resizeEnabled = true,
  hideWindowActions = false,
  showSandpackPreview = false,
  isPreviewCentered = false,
  // when false .js files will be used
  typescriptStrict = false,
  showOpenInCodeSandbox = true,
  isGradientBox = false,
  previewHeight = "auto",
  overflow = "visible",
  displayMode = "always",
  gradientColor,
  highlightedLines,
  iframeInitialWidth,
  iframeSrc,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "600px",
  });

  const pathname = usePathname();
  const posthog = usePostHog();

  const [isLoading, setIsLoading] = useState(false);

  const {noInline, code} = useCodeDemo({
    files,
  });

  const renderContent = useCallback(
    (content: React.ReactNode) => {
      if (displayMode === "always") return content;
      if (displayMode === "visible") {
        if (!isInView) {
          return <div style={{height: previewHeight}} />;
        }

        return content;
      }
    },
    [displayMode, previewHeight, isInView],
  );

  const previewContent = useMemo(() => {
    if (!showPreview) return null;

    const content = asIframe ? (
      <WindowResizer
        hideWindowActions={hideWindowActions}
        iframeHeight={previewHeight}
        iframeInitialWidth={iframeInitialWidth}
        iframeSrc={iframeSrc}
        iframeTitle={title}
        resizeEnabled={resizeEnabled}
      />
    ) : (
      <DynamicReactLiveDemo
        className={className}
        code={code}
        files={files}
        gradientColor={gradientColor}
        height={previewHeight}
        isCentered={isPreviewCentered}
        isGradientBox={isGradientBox}
        noInline={noInline}
        overflow={overflow}
      />
    );

    return renderContent(content);
  }, [
    displayMode,
    isGradientBox,
    gradientColor,
    previewHeight,
    hideWindowActions,
    asIframe,
    showPreview,
    isInView,
    className,
  ]);

  const editorContent = useMemo(() => {
    if (!showEditor) return null;

    const content = (
      <DynamicSandpack
        files={files}
        highlightedLines={highlightedLines}
        showEditor={showEditor}
        showOpenInCodeSandbox={showOpenInCodeSandbox}
        showPreview={showSandpackPreview}
        typescriptStrict={typescriptStrict}
      />
    );

    return renderContent(content);
  }, [
    displayMode,
    showEditor,
    isInView,
    files,
    highlightedLines,
    showPreview,
    showSandpackPreview,
    showOpenInCodeSandbox,
  ]);

  const shouldRenderTabs = useMemo(() => {
    if (!showTabs) return false;
    if (!showPreview) return false;
    if (!showEditor) return false;

    return true;
  }, [showTabs, showPreview, showEditor]);

  const isComponentsPage = pathname.includes("/components/");

  const handleOpenInChat = useCallback(async () => {
    setIsLoading(true);

    // assume doc demo files are all App.jsx
    const content = files["/App.jsx"];

    if (!content || typeof content !== "string") {
      addToast({
        title: "Error",
        description: "Invalid demo content",
        color: "danger",
      });

      return;
    }

    const component = pathname.split("/components/")[1];
    const dependencies = parseDependencies(content);

    posthog.capture("CodeDemo - Open in Chat", {
      component,
      demo: title,
    });

    const {data, error} = await openInChat({
      component,
      title,
      content,
      dependencies,
      useWrapper: !asIframe,
    });

    setIsLoading(false);

    if (error || !data) {
      posthog.capture("CodeDemo - Open in Chat Error", {
        component,
        demo: title,
        error: error ?? "Unknown error",
      });

      addToast({
        title: "Error",
        description: error ?? "Unknown error",
        color: "danger",
      });

      return;
    }

    window.open(data, "_blank");
  }, [pathname, title, files, posthog]);

  return (
    <div ref={ref} className="flex flex-col gap-2 relative">
      {shouldRenderTabs ? (
        <>
          <Tabs
            disableAnimation
            aria-label="Code demo tabs"
            classNames={{
              panel: "pt-0",
            }}
            variant="underlined"
          >
            <Tab key="preview" title="Preview">
              {previewContent}
            </Tab>
            <Tab key="code" title="Code">
              {editorContent}
            </Tab>
          </Tabs>
          {isComponentsPage && (
            <Button
              disableRipple
              className="absolute rounded-[9px] right-1 top-1 border-1 border-default-200 dark:border-default-100 data-[hover=true]:bg-default-50/80"
              isDisabled={isLoading}
              size="sm"
              variant="bordered"
              onPress={handleOpenInChat}
            >
              Open in Chat{" "}
              {isLoading ? (
                <Spinner
                  classNames={{wrapper: "h-4 w-4"}}
                  color="current"
                  size="sm"
                  variant="simple"
                />
              ) : (
                <SmallLogo className="w-4 h-4" />
              )}
            </Button>
          )}
        </>
      ) : (
        <>
          {previewContent}
          {editorContent}
        </>
      )}
    </div>
  );
};

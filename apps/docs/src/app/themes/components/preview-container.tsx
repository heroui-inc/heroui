"use client";

import {UNSAFE_PortalProvider} from "@react-aria/overlays";
import {useEffect, useRef, useState} from "react";

import {DemoComponents} from "@/components/demo";

import {THEME_BUILDER_CONTENT_ID} from "../constants";
import {useCssSync} from "../hooks";

export function PreviewContainer() {
  const [isMounted, setIsMounted] = useState(false);
  const container = useRef(null);

  // Sync url search values to CSS custom properties
  useCssSync();

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    });
  }, []);

  return (
    <UNSAFE_PortalProvider getContainer={() => container.current}>
      <div
        ref={container}
        className="flex h-full w-full flex-1 items-center bg-background px-5 py-7 font-sans"
        id={THEME_BUILDER_CONTENT_ID}
      >
        {isMounted ? <DemoComponents /> : null}
      </div>
    </UNSAFE_PortalProvider>
  );
}

"use client";

import {useEffect, useState} from "react";

import {DemoComponents} from "@/components/demo";

import {THEME_BUILDER_CONTENT_ID} from "../constants";
import {useCssSync} from "../hooks";

export function PreviewContainer() {
  const [isMounted, setIsMounted] = useState(false);

  // Sync url search values to CSS custom properties
  useCssSync();

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    });
  }, []);

  return (
    <div
      className="flex w-full flex-1 items-center bg-background py-7 font-sans"
      id={THEME_BUILDER_CONTENT_ID}
    >
      {isMounted ? <DemoComponents /> : null}
    </div>
  );
}

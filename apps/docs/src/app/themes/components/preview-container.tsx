"use client";

import {useEffect, useState} from "react";

import {DemoComponents} from "@/components/demo";

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
    <div className="flex w-full flex-1 items-center font-sans" id="theme-builder-content">
      {isMounted ? <DemoComponents /> : null}
    </div>
  );
}

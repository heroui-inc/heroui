"use client";

import {parseAsStringLiteral, useQueryState} from "nuqs";

import {tabLabels} from "../constants";

export function usePreviewTab() {
  const [selectedTab, setSelectedTab] = useQueryState(
    "template",
    parseAsStringLiteral(tabLabels).withDefault("components"),
  );

  return {selectedTab, setSelectedTab};
}

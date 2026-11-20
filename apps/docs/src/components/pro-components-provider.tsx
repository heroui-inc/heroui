"use client";

import type {ProSearchItem} from "@/lib/pro-components";
import type {ReactNode} from "react";

import {createContext, use} from "react";

const ProComponentsContext = createContext<ProSearchItem[]>([]);

/** Makes the Pro component list (loaded with the root layout) available to client UI like ⌘K. */
export function ProComponentsProvider({
  children,
  items,
}: {
  children: ReactNode;
  items: ProSearchItem[];
}) {
  return <ProComponentsContext value={items}>{children}</ProComponentsContext>;
}

export function useProComponents() {
  return use(ProComponentsContext);
}

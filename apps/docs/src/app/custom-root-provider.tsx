"use client";

import type {ReactNode} from "react";

import {Toast} from "@heroui/react";
import {RootProvider} from "fumadocs-ui/provider/next";
import dynamic from "next/dynamic";

const SearchDialog = dynamic(() => import("@/components/search-dialog"), {
  ssr: false,
});

export function CustomRootProvider({children}: {children: ReactNode}) {
  return (
    <RootProvider
      search={{
        SearchDialog,
      }}
    >
      {children}
      {/* Global toast provider for demos using the default toast() function */}
      <Toast.Provider />
    </RootProvider>
  );
}

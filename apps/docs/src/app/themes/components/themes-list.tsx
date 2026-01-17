"use client";

import {ListBox, ScrollShadow} from "@heroui/react";
import Image from "next/image";

import {cn} from "@/utils/cn";

import {themes} from "../constants";
import {useVariableSetter} from "../hooks";

export function ThemesList() {
  const {setVariable, variables} = useVariableSetter();

  return (
    <ScrollShadow hideScrollBar className="w-full px-4" orientation="horizontal" visibility="none">
      <ListBox
        disallowEmptySelection
        aria-label="Theme"
        className="flex w-max flex-row flex-nowrap gap-5"
        items={themes}
        selectedKeys={new Set([variables.theme])}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const selected = [...keys][0];

          if (selected) {
            setVariable("theme", String(selected));
          }
        }}
      >
        {(item) => (
          <ListBox.Item
            id={item.id}
            textValue={item.id}
            className={cn(
              "group relative flex w-12 shrink-0 flex-col items-center justify-center gap-1.5 p-0",
              "hover:bg-transparent data-[hovered=true]:bg-transparent",
            )}
          >
            <Image
              alt={item.label}
              height={48}
              src={item.image}
              width={48}
              className={cn(
                "size-12 rounded-full bg-surface",
                "group-data-[selected=true]:ring-2 group-data-[selected=true]:ring-accent group-data-[selected=true]:ring-offset-2 group-data-[selected=true]:ring-offset-surface",
              )}
            />
            <span className="text-[10px] font-medium text-muted capitalize group-data-[selected=true]:text-foreground">
              {item.label}
            </span>
          </ListBox.Item>
        )}
      </ListBox>
    </ScrollShadow>
  );
}

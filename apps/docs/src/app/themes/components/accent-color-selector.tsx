"use client";

import {Check} from "@gravity-ui/icons";
import {ListBox} from "@heroui/react";

import {colors} from "../constants";
import {useVariableSetter} from "../hooks";

import {LockableLabel} from "./lockable-label";

export function AccentColorSelector() {
  const {setVariable, variables} = useVariableSetter();

  return (
    <div className="flex flex-col gap-1">
      <LockableLabel label="Accent Color" variable="accentColor" />
      <ListBox
        disallowEmptySelection
        aria-label="Accent Color"
        className="flex flex-row flex-wrap gap-2 overflow-visible p-0"
        items={colors}
        layout="stack"
        orientation="horizontal"
        selectedKeys={new Set([variables.accentColor])}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const selected = [...keys][0];

          if (selected) {
            setVariable("accentColor", String(selected));
          }
        }}
      >
        {(item) => (
          <ListBox.Item
            className="group h-8 min-h-0 w-8 p-0 data-[hovered=true]:bg-transparent"
            id={item.id}
            textValue={item.id}
          >
            <div
              className="size-8 cursor-pointer rounded-full border-2 border-white/50"
              style={{backgroundColor: item.value}}
            />
            <div className="absolute -top-0.5 -right-1 hidden size-4 items-center justify-center rounded-full border border-background bg-foreground group-data-[selected=true]:flex">
              <Check className="size-3 text-background" />
            </div>
          </ListBox.Item>
        )}
      </ListBox>
    </div>
  );
}

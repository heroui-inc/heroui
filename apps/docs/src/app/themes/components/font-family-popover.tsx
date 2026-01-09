"use client";

import {ChevronsExpandVertical, FontCase} from "@gravity-ui/icons";
import {InputGroup, ListBox, Popover} from "@heroui/react";

import {cn} from "@/utils/cn";

import {fonts} from "../constants";
import {useVariableSetter} from "../hooks";

import {LockableLabel} from "./lockable-label";

export function FontFamilyPopover() {
  const {setVariable, variables} = useVariableSetter();
  const currentFont = fonts.find((f) => f.id === variables.fontFamily);

  return (
    <Popover>
      <div className="flex flex-col gap-1">
        <LockableLabel label="Font Family" variable="fontFamily" />
        <Popover.Trigger>
          <InputGroup className="w-40 cursor-pointer">
            <InputGroup.Prefix className="w-10">
              <FontCase />
            </InputGroup.Prefix>
            <InputGroup.Input
              readOnly
              className="max-w-20 cursor-pointer"
              id="font-family"
              name="font-family"
              value={currentFont?.label ?? "Inter"}
            />
            <InputGroup.Suffix className="w-10">
              <ChevronsExpandVertical className="size-3" />
            </InputGroup.Suffix>
          </InputGroup>
        </Popover.Trigger>
      </div>
      <Popover.Content className="w-[324px]">
        <Popover.Dialog className="p-3">
          <Popover.Arrow />
          <ListBox
            disallowEmptySelection
            aria-label="Font Family"
            className="grid grid-cols-3 gap-2 p-0"
            items={fonts}
            layout="grid"
            selectedKeys={new Set([variables.fontFamily])}
            selectionMode="single"
            onSelectionChange={(keys) => {
              const selected = [...keys][0];

              if (selected) {
                setVariable("fontFamily", String(selected));
              }
            }}
          >
            {(item) => (
              <ListBox.Item
                id={item.id}
                style={{fontFamily: `var(${item.variable})`}}
                textValue={item.label}
                className={cn(
                  "group border-separator-on-surface flex h-[83px] w-[95px] flex-col items-center justify-center gap-[5px] rounded-2xl border",
                  "data-[selected=true]:border-2 data-[selected=true]:border-foreground",
                  "data-[hovered=true]:bg-default",
                )}
              >
                <span className="text-xl font-medium">Ag</span>
                <p className="text-[10px] text-muted group-data-[selected=true]:text-foreground">
                  {item.label}
                </p>
              </ListBox.Item>
            )}
          </ListBox>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

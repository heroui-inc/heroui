"use client";

import {BucketPaint, ChevronsExpandVertical} from "@gravity-ui/icons";
import {InputGroup, Label, ListBox, Popover} from "@heroui/react";
import Image from "next/image";

import {useThemeBuilder} from "@/stores/theme-builder";
import {cn} from "@/utils/cn";

import {themes} from "../constants";

export function ThemePopover() {
  const {setVariable, variables} = useThemeBuilder();
  const currentTheme = themes.find((t) => t.id === variables.theme);

  return (
    <Popover>
      <div className="flex flex-col gap-1">
        <Label>Theme</Label>
        <Popover.Trigger>
          <InputGroup className="w-40 cursor-pointer">
            <InputGroup.Prefix className="w-10">
              <BucketPaint />
            </InputGroup.Prefix>
            <InputGroup.Input
              readOnly
              className="max-w-20 cursor-pointer capitalize"
              id="theme"
              name="theme"
              value={currentTheme?.label}
            />
            <InputGroup.Suffix className="w-10">
              <ChevronsExpandVertical className="size-3" />
            </InputGroup.Suffix>
          </InputGroup>
        </Popover.Trigger>
      </div>
      <Popover.Content className="w-[228px]">
        <Popover.Dialog className="p-4">
          <Popover.Arrow />
          <ListBox
            disallowEmptySelection
            aria-label="Theme"
            className="grid grid-cols-4 gap-3"
            items={themes}
            layout="grid"
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
                  "group relative flex w-10 flex-col items-center justify-center gap-1.5 p-0",
                  "data-[hovered=true]:bg-transparent",
                )}
              >
                <Image
                  alt={item.label}
                  height={36}
                  src={item.image}
                  width={36}
                  className={cn(
                    "size-9 rounded-full bg-surface",
                    "group-data-[selected=true]:ring-2 group-data-[selected=true]:ring-accent group-data-[selected=true]:ring-offset-2 group-data-[selected=true]:ring-offset-surface",
                  )}
                />
                <span className="text-[10px] font-medium text-muted capitalize group-data-[selected=true]:text-foreground">
                  {item.label}
                </span>
              </ListBox.Item>
            )}
          </ListBox>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

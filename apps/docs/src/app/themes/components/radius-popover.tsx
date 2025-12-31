"use client";

import type {ThemeVariables} from "@/stores/theme-builder";

import {ChevronsExpandVertical} from "@gravity-ui/icons";
import {InputGroup, ListBox, Popover} from "@heroui/react";

import {useThemeBuilder} from "@/stores/theme-builder";
import {cn} from "@/utils/cn";

import {radiusOptions} from "../constants";

import {ThemeBuilderLabel} from "./theme-builder-label";

type RadiusPopoverProps = {
  label: string;
  variableKey: keyof Pick<ThemeVariables, "radius" | "formRadius">;
};

export function RadiusPopover({label, variableKey}: RadiusPopoverProps) {
  const {setVariable, variables} = useThemeBuilder();
  const currentValue = variables[variableKey];
  const currentOption = radiusOptions.find((r) => r.id === currentValue);

  return (
    <Popover>
      <div className="flex flex-col gap-1">
        <ThemeBuilderLabel label={label} variable={variableKey} />
        <Popover.Trigger>
          <InputGroup className="w-40 cursor-pointer">
            <InputGroup.Prefix className="w-10">
              <span className="text-base font-semibold text-muted">{currentOption?.label}</span>
            </InputGroup.Prefix>
            <InputGroup.Input
              readOnly
              className="max-w-20 cursor-pointer capitalize"
              id={variableKey}
              name={variableKey}
              value={currentOption?.description}
            />
            <InputGroup.Suffix className="w-10">
              <ChevronsExpandVertical className="size-3" />
            </InputGroup.Suffix>
          </InputGroup>
        </Popover.Trigger>
      </div>
      <Popover.Content className="w-[304px]">
        <Popover.Dialog className="p-3">
          <Popover.Arrow />
          <ListBox
            disallowEmptySelection
            aria-label={label}
            className="grid grid-cols-3 gap-2"
            items={radiusOptions}
            layout="grid"
            selectedKeys={new Set([currentValue])}
            selectionMode="single"
            onSelectionChange={(keys) => {
              const selected = [...keys][0];

              if (selected) {
                setVariable(variableKey, String(selected));
              }
            }}
          >
            {(item) => (
              <ListBox.Item
                id={item.id}
                textValue={item.id}
                className={cn(
                  "group flex h-[83px] w-[88px] flex-col items-center justify-center gap-[5px] rounded-2xl border-2 border-separator-on-surface",
                  "data-[selected=true]:border-foreground",
                )}
              >
                <span className="text-xl font-semibold">{item.label}</span>
                <p className="text-xs text-muted capitalize group-data-[selected=true]:text-foreground">
                  {item.description}
                </p>
              </ListBox.Item>
            )}
          </ListBox>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

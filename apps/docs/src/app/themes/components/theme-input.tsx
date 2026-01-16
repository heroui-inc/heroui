"use client";

import {ChevronsExpandVertical} from "@gravity-ui/icons";
import {Avatar, InputGroup} from "@heroui/react";

import {defaultThemeValues, themes} from "../constants";
import {useVariablesState} from "../hooks/use-variables-state";

export function ThemeInput() {
  const [variables] = useVariablesState();
  const currentTheme = themes.find((t) => t.id === (variables?.theme ?? defaultThemeValues.theme));

  return (
    <InputGroup className="w-full cursor-pointer">
      <InputGroup.Prefix className="w-10">
        <Avatar className="size-4">
          <Avatar.Fallback>D</Avatar.Fallback>
          <Avatar.Image
            alt={currentTheme?.label ?? "Default"}
            height={16}
            src={currentTheme?.image.src}
            width={16}
          />
        </Avatar>
      </InputGroup.Prefix>
      <InputGroup.Input
        readOnly
        className="max-w-20 sm:max-w-none"
        value={currentTheme?.label ?? "Default"}
      />
      <InputGroup.Suffix className="flex w-10 flex-1 justify-end">
        <ChevronsExpandVertical className="size-4" />
      </InputGroup.Suffix>
    </InputGroup>
  );
}

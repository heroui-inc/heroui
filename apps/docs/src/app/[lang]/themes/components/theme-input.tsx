"use client";

import {ChevronsExpandVertical} from "@gravity-ui/icons";
import {Avatar, InputGroup} from "@heroui/react";

import {findMatchingTheme, themes} from "../constants";
import {useVariablesState} from "../hooks/use-variables-state";

export function ThemeInput() {
  const [variables] = useVariablesState();
  const currentThemeId = findMatchingTheme(variables);
  const currentTheme = currentThemeId ? themes.find((t) => t.id === currentThemeId) : undefined;

  const accentColor = `oklch(${variables.lightness} ${variables.chroma} ${variables.hue})`;
  const customThemeGradient = `radial-gradient(85.29% 80.57% at 40.28% 34.72%, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.02) 43.66%, rgba(0, 0, 0, 0.27) 72.4%, rgba(0, 0, 0, 0.30) 100%), ${accentColor}`;

  return (
    <InputGroup className="w-full cursor-pointer">
      <InputGroup.Prefix className="w-10">
        {currentTheme ? (
          <Avatar className="size-4">
            <Avatar.Fallback>{currentTheme.label[0]}</Avatar.Fallback>
            <Avatar.Image
              alt={currentTheme.label}
              height={16}
              src={currentTheme.image.src}
              width={16}
            />
          </Avatar>
        ) : (
          <div className="size-4 rounded-full" style={{background: customThemeGradient}} />
        )}
      </InputGroup.Prefix>
      <InputGroup.Input
        readOnly
        className="max-w-20 sm:max-w-none"
        value={currentTheme?.label ?? "Custom"}
      />
      <InputGroup.Suffix className="flex w-10 flex-1 justify-end">
        <ChevronsExpandVertical className="size-4" />
      </InputGroup.Suffix>
    </InputGroup>
  );
}

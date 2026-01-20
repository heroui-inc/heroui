"use client";

import type {CustomFont} from "../hooks";

import {Plus, TrashBin} from "@gravity-ui/icons";
import {Button, ListBox, ScrollShadow, Tooltip} from "@heroui/react";
import {useEffect} from "react";

import {cn} from "@/utils/cn";

import {defaultThemeVariables, fonts} from "../constants";
import {useCustomFonts, useVariableSetter} from "../hooks";
import {injectFontLink, isCustomFontUrl} from "../utils/font-utils";

interface SuggestedFontsProps {
  customFonts: CustomFont[];
  goToCustom: () => void;
}

export function SuggestedFonts({customFonts, goToCustom}: SuggestedFontsProps) {
  const {setVariable, variables} = useVariableSetter();
  const {removeCustomFont} = useCustomFonts();

  // Inject font links for all suggested fonts so they can be previewed
  useEffect(() => {
    fonts.forEach((font) => {
      injectFontLink(font.id, font.cdnUrl);
    });
  }, []);

  // Inject font links for all custom fonts so they can be previewed
  useEffect(() => {
    customFonts.forEach((font) => {
      injectFontLink(font.id, font.url);
    });
  }, [customFonts]);

  // Also inject font link if current selection is a URL-based font
  useEffect(() => {
    if (isCustomFontUrl(variables.fontFamily)) {
      injectFontLink("current-url-font", variables.fontFamily);
    }
  }, [variables.fontFamily]);

  // Combine suggested fonts with custom fonts for the list
  // For custom fonts, use the URL as the ID (for shareable links)
  const allFonts = [
    ...fonts.map((f) => ({...f, isCustom: false, url: f.cdnUrl})),
    ...customFonts.map((f) => ({
      cdnUrl: f.url,
      id: f.url, // Use URL as ID so it's stored in the URL params
      isCustom: true,
      label: f.label,
      url: f.url,
      variable: f.variable,
    })),
  ];

  // The selected key is the fontFamily value (either a font ID or a CDN URL)
  const selectedKey = variables.fontFamily;

  const handleDeleteCustomFont = (fontUrl: string) => {
    // Find the font by URL and remove it
    const font = customFonts.find((f) => f.url === fontUrl);

    if (font) {
      removeCustomFont(font.id);
    }
    // If the deleted font was selected, switch to Inter
    if (variables.fontFamily === fontUrl) {
      setVariable("fontFamily", defaultThemeVariables.fontFamily);
    }
  };

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium capitalize">
          {customFonts.length > 0 ? "All Fonts" : "Suggested"}
        </p>
        <Button size="sm" variant="ghost" onPress={goToCustom}>
          Add from CDN
          <Plus className="size-4" />
        </Button>
      </div>
      <ScrollShadow hideScrollBar className="max-h-56 pb-3" size={15}>
        <ListBox
          disallowEmptySelection
          aria-label="Font Family"
          className="grid grid-cols-3 gap-2 p-0"
          items={allFonts}
          layout="grid"
          selectedKeys={new Set([selectedKey])}
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
              textValue={item.label}
              className={cn(
                "group border-separator-on-surface relative flex h-[83px] w-[95px] flex-col items-center justify-center gap-[5px] rounded-2xl border",
                "data-[selected=true]:border-foreground",
                "data-[hovered=true]:bg-default",
              )}
              style={{
                fontFamily: `"${item.label}", sans-serif`,
              }}
            >
              <span className="text-xl font-medium">Ag</span>
              <p className="max-w-[80px] truncate text-[10px] text-muted group-data-[selected=true]:text-foreground">
                {item.label}
              </p>
              {item.isCustom ? (
                <Tooltip closeDelay={0} delay={100}>
                  <Tooltip.Trigger className="absolute top-1 right-1">
                    <Button
                      isIconOnly
                      className="size-5 min-h-0 min-w-0 p-0 opacity-0 group-data-[hovered=true]:opacity-100"
                      size="sm"
                      variant="ghost"
                      onPress={() => {
                        handleDeleteCustomFont(item.url);
                      }}
                    >
                      <TrashBin className="size-3 text-danger" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <Tooltip.Arrow />
                    <p>Remove font</p>
                  </Tooltip.Content>
                </Tooltip>
              ) : null}
            </ListBox.Item>
          )}
        </ListBox>
      </ScrollShadow>
    </>
  );
}

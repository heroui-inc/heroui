"use client";

import type {ColorFormat, ColorPickerProps} from "./types";

import {Shuffle} from "@gravity-ui/icons";
import {Button, InputGroup, ListBox, Popover, Select, TextField} from "@heroui/react";
import React, {useState} from "react";
import {ColorPicker as AriaColorPicker, parseColor} from "react-aria-components";

import {cn} from "@/utils/cn";

import {ColorArea, ColorSlider, ColorSwatchesCarousel} from "./components";
import {DEFAULT_COLOR, defaultSwatches} from "./constants";
import {
  detectColorFormat,
  formatColor,
  parseSafeDefaultValue,
  safeParseColor,
  validateColorInput,
} from "./utils";

export default function ColorPicker({
  children,
  defaultValue = DEFAULT_COLOR,
  onChange,
  popoverClassName,
  showAlpha = false,
  showColorField = true,
  showShuffle = true,
  showSwatches = true,
  swatches = defaultSwatches,
  trigger,
  value: controlledValue,
  ...props
}: ColorPickerProps) {
  const [currentColorFormat, setCurrentColorFormat] = useState<ColorFormat>("hex");
  const [editingValue, setEditingValue] = useState<string | null>(null);
  const [inputError, setInputError] = useState<boolean>(false);

  // Safely parse default color value
  const safeDefaultValue = React.useMemo(() => parseSafeDefaultValue(defaultValue), [defaultValue]);

  // Internal color state for uncontrolled mode
  const [internalColor, setInternalColor] = useState(safeDefaultValue);

  // Use controlled value if provided, otherwise use internal state
  const colorValue = controlledValue ? safeParseColor(controlledValue) : internalColor;

  // Get initial color hex for swatches carousel
  const initialColorHex =
    (controlledValue as string | undefined)?.toLowerCase() ??
    safeDefaultValue.toString("hex").toLowerCase();

  const handleColorChange = (newColor: typeof colorValue) => {
    if (!controlledValue) {
      setInternalColor(newColor);
    }
    // const newColorString = formatColor(newColor, "oklch");

    onChange?.(newColor);
  };

  // Compute the displayed input value
  const displayedInputValue = editingValue ?? formatColor(colorValue, currentColorFormat);

  // Handle input change - validate on every change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setEditingValue(newValue);

    // Auto-detect and switch color format based on input
    const detectedFormat = detectColorFormat(newValue);
    const colorFormat = detectedFormat ?? currentColorFormat;

    setCurrentColorFormat(colorFormat);
    const validatedColor = validateColorInput(newValue, colorFormat);

    if (validatedColor) {
      handleColorChange(validatedColor);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  // On blur, reset to the current valid color if there was an error
  const handleInputBlur = () => {
    if (inputError) {
      setEditingValue(null);
      setInputError(false);
    } else {
      setEditingValue(null);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setEditingValue(null);
      setInputError(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleInputFocus = () => {
    setEditingValue(formatColor(colorValue, currentColorFormat));
  };

  const handleShuffle = () => {
    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = 50 + Math.floor(Math.random() * 50);
    const randomLightness = 40 + Math.floor(Math.random() * 30);
    const randomColor = parseColor(`hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`);

    handleColorChange(randomColor);
  };

  return (
    <AriaColorPicker value={colorValue} onChange={handleColorChange} {...props}>
      {() => (
        <Popover>
          <Popover.Trigger>{trigger}</Popover.Trigger>
          <Popover.Content className={cn("w-[248px]", popoverClassName)} placement="top">
            <Popover.Dialog className="flex flex-col gap-2 px-2 pt-4 pb-2">
              {children ?? (
                <>
                  {/* Color Swatches Carousel */}
                  {showSwatches ? (
                    <ColorSwatchesCarousel initialColorHex={initialColorHex} swatches={swatches} />
                  ) : null}

                  {/* Color Area */}
                  <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" />

                  {/* Hue Slider with Shuffle */}
                  <div className="flex items-center gap-2">
                    <ColorSlider channel="hue" className="h-5 flex-1" colorSpace="hsb" />
                    {showShuffle ? (
                      <Button
                        isIconOnly
                        className="size-8 min-w-8 shrink-0 rounded-full"
                        size="sm"
                        variant="tertiary"
                        onPress={handleShuffle}
                      >
                        <Shuffle className="size-4" />
                      </Button>
                    ) : null}
                  </div>

                  {/* Alpha Slider */}
                  {showAlpha ? <ColorSlider channel="alpha" /> : null}

                  {/* Color Field with Color Space Selector */}
                  {showColorField ? (
                    <TextField aria-labelledby="Accent color" isInvalid={inputError}>
                      <InputGroup fullWidth className="rounded-xl">
                        <InputGroup.Input
                          className="w-full flex-1 px-4 text-sm"
                          value={displayedInputValue}
                          onBlur={handleInputBlur}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          onKeyDown={handleInputKeyDown}
                        />
                        <InputGroup.Suffix className="border-l border-separator px-0">
                          <Select
                            aria-label="Color format"
                            value={currentColorFormat}
                            onChange={(key) => {
                              if (key) {
                                setCurrentColorFormat(key as ColorFormat);
                              }
                            }}
                          >
                            <Select.Trigger className="h-full min-w-22 rounded-none border-none bg-transparent px-3">
                              <Select.Value />
                              <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                              <ListBox>
                                <ListBox.Item id="hex" textValue="HEX">
                                  HEX
                                </ListBox.Item>
                                <ListBox.Item id="hsl" textValue="HSL">
                                  HSL
                                </ListBox.Item>
                                <ListBox.Item id="rgb" textValue="RGB">
                                  RGB
                                </ListBox.Item>
                                <ListBox.Item id="hsb" textValue="HSB">
                                  HSB
                                </ListBox.Item>
                                <ListBox.Item id="oklch" textValue="OKLCH">
                                  OKLCH
                                </ListBox.Item>
                              </ListBox>
                            </Select.Popover>
                          </Select>
                        </InputGroup.Suffix>
                      </InputGroup>
                    </TextField>
                  ) : null}
                </>
              )}
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      )}
    </AriaColorPicker>
  );
}

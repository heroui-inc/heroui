"use client";

import type {
  ColorPickerProps as AriaColorPickerProps,
  Color,
  ColorSpace,
} from "react-aria-components";

import {ChevronLeft, ChevronRight, Shuffle} from "@gravity-ui/icons";
import {Button, InputGroup, ListBox, Popover, Select} from "@heroui/react";
import React, {useState} from "react";
import {
  ColorArea as AriaColorArea,
  ColorField as AriaColorField,
  ColorPicker as AriaColorPicker,
  ColorSlider as AriaColorSlider,
  ColorSwatch as AriaColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  Input,
  Label,
  SliderTrack,
  parseColor,
} from "react-aria-components";
import {tv} from "tailwind-variants";

import {cn} from "@/utils/cn";
import {composeTailwindRenderProps} from "@/utils/compose-tw-render";
import {focusRing} from "@/utils/focus";

/* -------------------------------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------------------------*/

const colorSwatchStyles = tv({
  base: "size-8 rounded-full border border-black/10 shadow-sm forced-colors:bg-[Canvas]",
  extend: focusRing,
});

const colorAreaStyles = tv({
  base: "size-full min-h-48 min-w-48 shrink-0 rounded-xl forced-colors:bg-[GrayText]",
});

const colorThumbStyles = tv({
  base: "size-6 rounded-full border-[3px] border-white shadow-lg forced-colors:bg-[Canvas]!",
  extend: focusRing,
});

const colorSliderTrackStyles = tv({
  base: "h-8 w-full rounded-full forced-colors:bg-[GrayText]",
  variants: {
    orientation: {
      horizontal: "h-8 w-full",
      vertical: "ml-2 h-full w-8",
    },
  },
});

const colorFieldStyles = tv({
  base: "flex flex-1 flex-col gap-1",
});

const colorFieldInputStyles = tv({
  base: "h-12 w-full rounded-xl border-none bg-default px-4 text-sm text-foreground transition-all outline-none placeholder:text-muted",
  extend: focusRing,
});

/* -------------------------------------------------------------------------------------------------
 * Default Swatches
 * -----------------------------------------------------------------------------------------------*/

const defaultSwatches = [
  "hsla(26, 35%, 92%, 1)",
  "hsla(338, 77%, 78%, 1)",
  "hsla(309, 23%, 55%, 1)",
  "hsla(355, 85%, 66%, 1)",
  "hsla(16, 100%, 67%, 1)",
  "hsla(47, 92%, 66%, 1)",
  "hsla(152, 80%, 56%, 1)",
  "hsla(197, 59%, 64%, 1)",
];

/* -------------------------------------------------------------------------------------------------
 * ColorSwatch (Trigger Button)
 * -----------------------------------------------------------------------------------------------*/

interface ColorSwatchProps {
  className?: string;
}

function ColorSwatch({className}: ColorSwatchProps) {
  return (
    <AriaColorSwatch
      className={cn(colorSwatchStyles(), className)}
      style={({color}) => ({
        background: color.toString("css"),
      })}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * ColorArea
 * -----------------------------------------------------------------------------------------------*/

interface ColorAreaProps {
  colorSpace?: ColorSpace;
  xChannel?: "hue" | "saturation" | "brightness" | "lightness" | "red" | "green" | "blue" | "alpha";
  yChannel?: "hue" | "saturation" | "brightness" | "lightness" | "red" | "green" | "blue" | "alpha";
  className?: string;
}

function ColorArea({className, colorSpace = "hsb", xChannel, yChannel}: ColorAreaProps) {
  return (
    <AriaColorArea
      className={composeTailwindRenderProps(className, colorAreaStyles())}
      colorSpace={colorSpace}
      xChannel={xChannel}
      yChannel={yChannel}
    >
      <ColorThumb
        className={colorThumbStyles}
        style={({color}) => ({
          background: color.toString("css"),
        })}
      />
    </AriaColorArea>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ColorSlider
 * -----------------------------------------------------------------------------------------------*/

interface ColorSliderProps {
  channel: "hue" | "saturation" | "brightness" | "lightness" | "red" | "green" | "blue" | "alpha";
  colorSpace?: ColorSpace;
  orientation?: "horizontal" | "vertical";
  label?: string;
  showOutput?: boolean;
  className?: string;
}

function ColorSlider({
  channel,
  className,
  colorSpace,
  orientation = "horizontal",
}: ColorSliderProps) {
  return (
    <AriaColorSlider
      channel={channel}
      className={cn("group flex w-full flex-col gap-1", className)}
      colorSpace={colorSpace}
      orientation={orientation}
    >
      <SliderTrack
        className={colorSliderTrackStyles({orientation})}
        style={({defaultStyle}) => ({
          background: `${defaultStyle.background}`,
        })}
      >
        <ColorThumb
          className={cn(colorThumbStyles(), orientation === "horizontal" ? "top-1/2" : "left-1/2")}
          style={({color}) => ({
            background: color.toString("css"),
          })}
        />
      </SliderTrack>
    </AriaColorSlider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ColorField
 * -----------------------------------------------------------------------------------------------*/

interface ColorFieldProps {
  label?: string;
  channel?: "hue" | "saturation" | "brightness" | "lightness" | "red" | "green" | "blue" | "alpha";
  colorSpace?: ColorSpace;
  className?: string;
}

function ColorField({channel, className, colorSpace, label}: ColorFieldProps) {
  return (
    <AriaColorField
      channel={channel}
      className={cn(colorFieldStyles(), className)}
      colorSpace={colorSpace}
    >
      {label ? <Label className="text-sm font-medium text-foreground">{label}</Label> : null}
      <Input className={colorFieldInputStyles} />
    </AriaColorField>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ColorPicker
 * -----------------------------------------------------------------------------------------------*/

export interface ColorPickerProps extends Omit<AriaColorPickerProps, "children"> {
  /** Label for the trigger button */
  label?: string;
  /** Custom children for the popover content */
  children?: React.ReactNode;
  /** Show alpha slider */
  showAlpha?: boolean;
  /** Show hex/color field */
  showColorField?: boolean;
  /** Show color swatches */
  showSwatches?: boolean;
  /** Custom swatches array */
  swatches?: string[];
  /** Show shuffle/random button */
  showShuffle?: boolean;
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Class name for popover content */
  popoverClassName?: string;
}

// Helper to chunk array into pages
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

const SWATCHES_PER_PAGE = 8;

export default function ColorPicker({
  children,
  defaultValue = "#006FEE",
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
  const [colorFormat, setColorFormat] = useState<"hex" | "hsl" | "rgb" | "hsb">("hex");

  // Chunk swatches into pages of 8
  const swatchPages = React.useMemo(() => chunkArray(swatches, SWATCHES_PER_PAGE), [swatches]);
  const totalPages = swatchPages.length;

  // Safely parse color - react-aria doesn't support OKLCH or other modern color formats
  const safeDefaultValue = React.useMemo(() => {
    if (!defaultValue) return parseColor("#006FEE");

    // If it's already a Color object, return as-is
    if (typeof defaultValue !== "string") return defaultValue;

    // Check for unsupported color formats (oklch, oklab, lab, lch, etc.)
    const unsupportedFormats = ["oklch", "oklab", "lab(", "lch(", "color("];

    if (unsupportedFormats.some((format) => defaultValue.toLowerCase().startsWith(format))) {
      return parseColor("#006FEE"); // Fallback to default blue
    }

    // Try to parse, fallback if it fails
    try {
      return parseColor(defaultValue);
    } catch {
      return parseColor("#006FEE");
    }
  }, [defaultValue]);

  // Internal color state for uncontrolled mode
  const [internalColor, setInternalColor] = useState<Color>(safeDefaultValue);

  // Use controlled value if provided, otherwise use internal state
  const color = controlledValue ? parseColor(controlledValue as string) : internalColor;

  // Calculate initial swatch page based on current color - using lazy initializer
  const [swatchPage, setSwatchPage] = useState(() => {
    const currentColorHex =
      (controlledValue as string | undefined)?.toLowerCase() ??
      safeDefaultValue.toString("hex").toLowerCase();
    const swatchIndex = swatches.findIndex((s) => s.toLowerCase() === currentColorHex);

    return swatchIndex !== -1 ? Math.floor(swatchIndex / SWATCHES_PER_PAGE) : 0;
  });

  const handleColorChange = (newColor: Color) => {
    if (!controlledValue) {
      setInternalColor(newColor);
    }
    onChange?.(newColor);
  };

  const navigateSwatches = (direction: "left" | "right") => {
    setSwatchPage((prev) => {
      if (direction === "left") {
        return Math.max(0, prev - 1);
      }

      return Math.min(totalPages - 1, prev + 1);
    });
  };

  const currentSwatches = swatchPages[swatchPage] || [];
  const isFirstPage = swatchPage === 0;
  const isLastPage = swatchPage === totalPages - 1;

  const handleShuffle = () => {
    // Generate a random color
    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = 50 + Math.floor(Math.random() * 50); // 50-100%
    const randomLightness = 40 + Math.floor(Math.random() * 30); // 40-70%
    const randomColor = parseColor(`hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`);

    handleColorChange(randomColor);
  };

  return (
    <AriaColorPicker value={color} onChange={handleColorChange} {...props}>
      {({color}) => (
        <Popover>
          <Popover.Trigger>{trigger}</Popover.Trigger>
          <Popover.Content className={cn("w-[248px]", popoverClassName)} placement="top">
            <Popover.Dialog className="flex flex-col gap-2 px-2 pt-4 pb-2">
              {children ?? (
                <>
                  {/* Color Swatches Row */}
                  {showSwatches && totalPages > 0 ? (
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        className="size-4 min-w-4 shrink-0 rounded-full"
                        isDisabled={isFirstPage}
                        size="sm"
                        variant="ghost"
                        onPress={() => navigateSwatches("left")}
                      >
                        <ChevronLeft className="size-4" />
                      </Button>
                      <div className="flex w-full flex-1 justify-center">
                        <ColorSwatchPicker className="flex justify-start gap-1.5">
                          {currentSwatches.map((swatch) => (
                            <ColorSwatchPickerItem
                              key={swatch}
                              className="size-4 rounded-full transition-all data-selected:ring-2 data-selected:ring-foreground data-selected:ring-offset-1"
                              color={swatch}
                            >
                              <AriaColorSwatch
                                className="size-full cursor-pointer rounded-full"
                                style={{background: swatch}}
                              />
                            </ColorSwatchPickerItem>
                          ))}
                        </ColorSwatchPicker>
                      </div>
                      <Button
                        isIconOnly
                        className="size-4 min-w-4 shrink-0 rounded-full"
                        isDisabled={isLastPage}
                        size="sm"
                        variant="ghost"
                        onPress={() => navigateSwatches("right")}
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
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
                    <InputGroup fullWidth className="rounded-xl">
                      <InputGroup.Input
                        readOnly
                        className="w-full flex-1 px-4 text-sm"
                        value={color.toString(colorFormat)}
                      />
                      <InputGroup.Suffix className="border-l border-separator px-0">
                        <Select
                          aria-label="Color format"
                          value={colorFormat}
                          onChange={(key) => {
                            if (key) {
                              setColorFormat(key as "hex" | "hsl" | "rgb" | "hsb");
                            }
                          }}
                        >
                          <Select.Trigger className="h-full min-w-17 rounded-none border-none bg-transparent px-3">
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
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </InputGroup.Suffix>
                    </InputGroup>
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

/* -------------------------------------------------------------------------------------------------
 * Additional Export for Flexibility
 * -----------------------------------------------------------------------------------------------*/

export {ColorArea, ColorField, ColorSlider, ColorSwatch, parseColor};

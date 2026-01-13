"use client";

import type {ColorSwatchesCarouselProps} from "../types";

import {ChevronLeft, ChevronRight} from "@gravity-ui/icons";
import {Button} from "@heroui/react";
import React, {useState} from "react";
import {
  ColorSwatch as AriaColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "react-aria-components";

import {SWATCHES_PER_PAGE} from "../constants";
import {chunkArray} from "../utils";

export function ColorSwatchesCarousel({initialColorHex, swatches}: ColorSwatchesCarouselProps) {
  // Chunk swatches into pages
  const swatchPages = React.useMemo(() => chunkArray(swatches, SWATCHES_PER_PAGE), [swatches]);
  const totalPages = swatchPages.length;

  // Calculate initial swatch page based on current color
  const [swatchPage, setSwatchPage] = useState(() => {
    if (!initialColorHex) return 0;
    const swatchIndex = swatches.findIndex(
      (s) => s.toLowerCase() === initialColorHex.toLowerCase(),
    );

    return swatchIndex !== -1 ? Math.floor(swatchIndex / SWATCHES_PER_PAGE) : 0;
  });

  const navigateSwatches = (direction: "left" | "right") => {
    setSwatchPage((prev) => {
      if (direction === "left") {
        return Math.max(0, prev - 1);
      }

      return Math.min(totalPages - 1, prev + 1);
    });
  };

  const isFirstPage = swatchPage === 0;
  const isLastPage = swatchPage === totalPages - 1;

  if (totalPages === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        isIconOnly
        className="size-5.5 min-w-5.5 shrink-0 rounded-full"
        isDisabled={isFirstPage}
        size="sm"
        variant="ghost"
        onPress={() => navigateSwatches("left")}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${swatchPage * 100}%)`,
          }}
        >
          {swatchPages.map((pageSwatches, pageIndex) => (
            <div key={pageIndex} className="flex h-[22px] w-full shrink-0 justify-center">
              <ColorSwatchPicker className="flex items-center justify-start gap-1.5">
                {pageSwatches.map((swatch) => (
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
          ))}
        </div>
      </div>
      <Button
        isIconOnly
        className="size-5.5 min-w-5.5 shrink-0 rounded-full"
        isDisabled={isLastPage}
        size="sm"
        variant="ghost"
        onPress={() => navigateSwatches("right")}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

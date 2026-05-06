"use client";

import {Chip} from "@heroui/react";
import * as React from "react";

import {Iconify} from "@/components/iconify";
import {cn} from "@/utils/cn";

const contrastStyle = (bgVar: string): React.CSSProperties => ({
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  backgroundColor: `var(${bgVar})`,
  color: "transparent",
  filter: "invert(1) grayscale(1) contrast(100)",
});

interface SideBySideProps {
  name: string;
  baseVariable: string;
  hoverVariable: string;
  hoverCssValue?: string;
  foregroundVariable: string;
  soft?: {
    baseVariable: string;
    baseCssValue?: string;
    hoverVariable: string;
    hoverCssValue?: string;
    foregroundVariable: string;
    foregroundCssValue?: string;
  };
}

interface StackedColor {
  label: string;
  variable: string;
  /** Raw CSS color expression (e.g. color-mix). When set, used instead of var(variable). */
  cssValue?: string;
  border?: boolean;
}

function ThemeChip({theme}: {theme: "Light" | "Dark"}) {
  return (
    <div>
      <Chip size="sm">
        <Iconify className="size-3.5" icon="gear" />
        <Chip.Label>{theme}</Chip.Label>
      </Chip>
    </div>
  );
}

function ColorHeader({
  bgVariable,
  name,
  theme,
}: {
  name: string;
  theme: "Light" | "Dark";
  bgVariable: string;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-3"
      style={{backgroundColor: `var(${bgVariable})`}}
    >
      <div className="flex flex-col">
        <span className="text-lg font-medium tracking-tight" style={contrastStyle(bgVariable)}>
          {name}
        </span>
        <span
          className="font-mono text-[10px] leading-tight opacity-50"
          style={contrastStyle(bgVariable)}
        >
          {bgVariable}
        </span>
      </div>
      <span className="text-xs font-medium" style={contrastStyle(bgVariable)}>
        {theme}
      </span>
    </div>
  );
}

function ColorBlock({
  bgVariable,
  cssValue,
  hasBorder,
  label,
  varName,
}: {
  label: string;
  bgVariable: string;
  /** Raw CSS color expression (e.g. color-mix). When set, used for background instead of var(bgVariable). */
  cssValue?: string;
  hasBorder?: boolean;
  /** Variable name to display. Defaults to bgVariable. */
  varName?: string;
}) {
  const bgValue = cssValue || `var(${bgVariable})`;

  return (
    <div
      style={{backgroundColor: bgValue}}
      className={cn(
        "flex flex-col justify-center rounded-xl px-4 py-2",
        hasBorder && "border border-black/12 dark:border-white/12",
      )}
    >
      <span className="text-sm font-medium tracking-tight" style={contrastStyle(bgVariable)}>
        {label}
      </span>
      <span
        className="font-mono text-[10px] leading-tight opacity-50"
        style={contrastStyle(bgVariable)}
      >
        {varName || bgVariable}
      </span>
    </div>
  );
}

function ThemeColumn({
  baseVariable,
  foregroundVariable,
  hoverCssValue,
  hoverVariable,
  name,
  soft,
  theme,
}: {
  theme: "Light" | "Dark";
  name: string;
  baseVariable: string;
  hoverVariable: string;
  hoverCssValue?: string;
  foregroundVariable: string;
  soft?: SideBySideProps["soft"];
}) {
  return (
    <div className="flex flex-1 flex-col gap-2" data-theme={theme.toLowerCase()}>
      <ColorHeader bgVariable={baseVariable} name={name} theme={theme} />
      <div className={cn("flex gap-2", soft ? "flex-row" : "flex-col")}>
        <div
          className="flex flex-1 flex-col gap-1.5 rounded-xl p-3"
          style={{backgroundColor: `var(${baseVariable})`}}
        >
          <span
            className="text-base font-medium tracking-tight"
            style={contrastStyle(baseVariable)}
          >
            {name}
          </span>
          <ColorBlock
            bgVariable={hoverVariable}
            cssValue={hoverCssValue}
            label="Hover"
            varName={`${baseVariable}-hover`}
          />
          <ColorBlock
            bgVariable={foregroundVariable}
            label="Foreground"
            varName={`${baseVariable}-foreground`}
          />
        </div>
        {!!soft && (
          <div className="relative flex flex-1 flex-col gap-1.5 overflow-hidden rounded-xl p-3">
            <div className="absolute inset-0" style={{backgroundColor: "var(--surface)"}} />
            <div
              className="absolute inset-0"
              style={{backgroundColor: soft.baseCssValue || `var(${soft.baseVariable})`}}
            />
            <span className="relative text-base font-medium tracking-tight text-foreground">
              {name} Soft
            </span>
            <div className="relative">
              <div
                className="flex flex-col justify-center rounded-xl border border-black/12 px-4 py-2 dark:border-white/12"
                style={{backgroundColor: soft.hoverCssValue || `var(${soft.hoverVariable})`}}
              >
                <span className="text-sm font-medium tracking-tight text-foreground">Hover</span>
                <span className="font-mono text-[10px] leading-tight text-foreground opacity-50">
                  {baseVariable}-soft-hover
                </span>
              </div>
            </div>
            <div className="relative">
              <ColorBlock
                bgVariable={soft.foregroundVariable}
                cssValue={soft.foregroundCssValue}
                label="Foreground"
                varName={`${baseVariable}-soft-foreground`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ColorSectionSideBySide({
  baseVariable,
  foregroundVariable,
  hoverCssValue,
  hoverVariable,
  name,
  soft,
}: SideBySideProps) {
  return (
    <div className="not-prose flex flex-col gap-4 sm:flex-row">
      <ThemeColumn
        baseVariable={baseVariable}
        foregroundVariable={foregroundVariable}
        hoverCssValue={hoverCssValue}
        hoverVariable={hoverVariable}
        name={name}
        soft={soft}
        theme="Light"
      />
      <ThemeColumn
        baseVariable={baseVariable}
        foregroundVariable={foregroundVariable}
        hoverCssValue={hoverCssValue}
        hoverVariable={hoverVariable}
        name={name}
        soft={soft}
        theme="Dark"
      />
    </div>
  );
}

function StackedSwatch({
  border,
  cssValue,
  label,
  variable,
}: {
  label: string;
  variable: string;
  cssValue?: string;
  border?: boolean;
}) {
  const bgValue = cssValue || `var(${variable})`;

  return (
    <div className="flex flex-1 flex-col">
      <div
        style={{backgroundColor: bgValue}}
        className={cn(
          "flex h-16 flex-col justify-center rounded-xl px-4 py-2",
          border && "border border-border",
        )}
      >
        <span className="text-sm font-medium tracking-tight" style={contrastStyle(variable)}>
          {label}
        </span>
        <span className="font-mono text-[10px] opacity-60" style={contrastStyle(variable)}>
          {variable}
        </span>
      </div>
    </div>
  );
}

export function ColorSectionStacked({
  darkColors,
  lightColors,
}: {
  lightColors: StackedColor[];
  darkColors: StackedColor[];
}) {
  return (
    <div className="not-prose flex flex-col gap-2">
      <div data-theme="light">
        <div className="flex flex-col gap-2">
          <ThemeChip theme="Light" />
          <div className="flex flex-wrap gap-2">
            {lightColors.map((color) => (
              <StackedSwatch
                key={color.variable}
                border={color.border}
                cssValue={color.cssValue}
                label={color.label}
                variable={color.variable}
              />
            ))}
          </div>
        </div>
      </div>
      <div data-theme="dark">
        <div className="flex flex-col gap-2">
          <ThemeChip theme="Dark" />
          <div className="flex flex-wrap gap-2">
            {darkColors.map((color) => (
              <StackedSwatch
                key={color.variable}
                border={color.border}
                cssValue={color.cssValue}
                label={color.label}
                variable={color.variable}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormFieldColors {
  bg: string;
  bgHover: string;
  placeholder: string;
  foreground: string;
}

function FormFieldThemeBlock({colors, theme}: {colors: FormFieldColors; theme: "light" | "dark"}) {
  return (
    <div data-theme={theme}>
      <div className="flex flex-col gap-2">
        <ThemeChip theme={theme === "light" ? "Light" : "Dark"} />
        <div className="flex flex-wrap gap-2">
          <div
            className="flex flex-1 flex-col gap-1.5 rounded-xl border border-black/12 p-3"
            style={{backgroundColor: `var(${colors.bg})`}}
          >
            <div>
              <span
                className="text-base font-medium tracking-tight"
                style={contrastStyle(colors.bg)}
              >
                Bg
              </span>
              <div className="font-mono text-[10px] opacity-60" style={contrastStyle(colors.bg)}>
                {colors.bg}
              </div>
            </div>
            <ColorBlock
              hasBorder
              bgVariable={colors.bg}
              cssValue={colors.bgHover}
              label="Hover"
              varName="--color-field-hover"
            />
            <ColorBlock
              hasBorder
              bgVariable={colors.bg}
              label="Focus"
              varName="--color-field-focus"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-1">
              <div
                className="flex h-full flex-col justify-center rounded-xl border border-border px-4 py-3"
                style={{backgroundColor: `var(${colors.placeholder})`}}
              >
                <span
                  className="text-sm font-medium tracking-tight"
                  style={contrastStyle(colors.placeholder)}
                >
                  Placeholder
                </span>
                <span
                  className="font-mono text-[10px] opacity-60"
                  style={contrastStyle(colors.placeholder)}
                >
                  {colors.placeholder}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div
                className="flex h-full flex-col justify-center rounded-xl px-4 py-3"
                style={{backgroundColor: `var(${colors.foreground})`}}
              >
                <span
                  className="text-sm font-medium tracking-tight"
                  style={contrastStyle(colors.foreground)}
                >
                  Foreground
                </span>
                <span
                  className="font-mono text-[10px] opacity-60"
                  style={contrastStyle(colors.foreground)}
                >
                  {colors.foreground}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ColorSectionFormField({colors}: {colors: FormFieldColors}) {
  return (
    <div className="not-prose flex flex-col gap-2">
      <FormFieldThemeBlock colors={colors} theme="light" />
      <FormFieldThemeBlock colors={colors} theme="dark" />
    </div>
  );
}

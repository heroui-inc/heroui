"use client";

import {Chip, Tooltip, toast} from "@heroui/react";
import {converter, parse} from "culori";
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

const getTokenName = (content: string | undefined, fallback: string) => {
  if (!content) return fallback;

  return content.split(":")[0]?.trim() || fallback;
};

const toOklch = converter("oklch");

const formatNumber = (value: number | undefined) => {
  if (typeof value !== "number") return "0";

  return Number(value.toFixed(4)).toString();
};

const toOklchCss = (value: string) => {
  const parsed = parse(value);

  if (!parsed) return value;

  const oklch = toOklch(parsed);

  if (!oklch) return value;

  if (typeof oklch.alpha === "number" && oklch.alpha < 1) {
    return `oklch(${formatNumber(oklch.l)} ${formatNumber(oklch.c)} ${formatNumber(oklch.h)} / ${formatNumber(oklch.alpha)})`;
  }

  return `oklch(${formatNumber(oklch.l)} ${formatNumber(oklch.c)} ${formatNumber(oklch.h)})`;
};

const copyColorValue = async (
  event: React.MouseEvent<HTMLElement>,
  fallback: string | undefined,
) => {
  const computedValue = getComputedStyle(event.currentTarget).backgroundColor || fallback;
  const value = computedValue ? toOklchCss(computedValue) : fallback || "";

  if (!value) return;

  await navigator.clipboard.writeText(value);
  toast.success("Copied color value", {
    description: value,
  });
};

function ColorTooltip({
  children,
  className,
  content,
}: {
  children: React.ReactNode;
  content?: string;
  className?: string;
}) {
  if (!content) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger className={className}>{children}</Tooltip.Trigger>
      <Tooltip.Content className="max-w-xs">
        <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap">{content}</pre>
      </Tooltip.Content>
    </Tooltip>
  );
}

interface SideBySideProps {
  name: string;
  baseVariable: string;
  baseTooltip?: string;
  hoverVariable: string;
  hoverCssValue?: string;
  hoverTooltip?: string;
  foregroundVariable: string;
  foregroundTooltip?: string;
  soft?: {
    baseVariable: string;
    baseCssValue?: string;
    baseTooltip?: string;
    hoverVariable: string;
    hoverCssValue?: string;
    hoverTooltip?: string;
    foregroundVariable: string;
    foregroundCssValue?: string;
    foregroundTooltip?: string;
  };
}

interface StackedColor {
  label: string;
  variable: string;
  cssValue?: string;
  border?: boolean;
  tooltip?: string;
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
  tooltip,
}: {
  name: string;
  theme: "Light" | "Dark";
  bgVariable: string;
  tooltip?: string;
}) {
  const token = getTokenName(tooltip, bgVariable);

  return (
    <ColorTooltip content={tooltip}>
      <div
        className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3"
        style={{backgroundColor: `var(${bgVariable})`}}
        onClick={(event) => copyColorValue(event, bgVariable)}
      >
        <div className="flex flex-col">
          <span className="text-lg font-medium tracking-tight" style={contrastStyle(bgVariable)}>
            {name}
          </span>
          <span
            className="font-mono text-[10px] leading-tight opacity-60 sm:hidden"
            style={contrastStyle(bgVariable)}
          >
            {token}
          </span>
        </div>
        <span className="text-xs font-medium" style={contrastStyle(bgVariable)}>
          {theme}
        </span>
      </div>
    </ColorTooltip>
  );
}

function ColorBlock({
  bgVariable,
  cssValue,
  hasBorder,
  label,
  tooltip,
}: {
  label: string;
  bgVariable: string;
  cssValue?: string;
  hasBorder?: boolean;
  tooltip?: string;
}) {
  const bgValue = cssValue || `var(${bgVariable})`;
  const token = getTokenName(tooltip, bgVariable);

  return (
    <ColorTooltip className="block w-full" content={tooltip}>
      <div
        style={{backgroundColor: bgValue}}
        className={cn(
          "flex w-full cursor-pointer flex-col justify-center rounded-xl px-4 py-2.5",
          hasBorder && "border border-black/12 dark:border-white/12",
        )}
        onClick={(event) => copyColorValue(event, cssValue || bgVariable)}
      >
        <span className="text-sm font-medium tracking-tight" style={contrastStyle(bgVariable)}>
          {label}
        </span>
        <span
          className="font-mono text-[10px] leading-tight opacity-60 sm:hidden"
          style={contrastStyle(bgVariable)}
        >
          {token}
        </span>
      </div>
    </ColorTooltip>
  );
}

function ThemeColumn({
  baseTooltip,
  baseVariable,
  foregroundTooltip,
  foregroundVariable,
  hoverCssValue,
  hoverTooltip,
  hoverVariable,
  name,
  soft,
  theme,
}: {
  theme: "Light" | "Dark";
  name: string;
  baseVariable: string;
  baseTooltip?: string;
  hoverVariable: string;
  hoverCssValue?: string;
  hoverTooltip?: string;
  foregroundVariable: string;
  foregroundTooltip?: string;
  soft?: SideBySideProps["soft"];
}) {
  return (
    <div className="flex flex-1 flex-col gap-2" data-theme={theme.toLowerCase()}>
      <ColorHeader bgVariable={baseVariable} name={name} theme={theme} tooltip={baseTooltip} />
      <div className={cn("flex gap-2", soft ? "flex-col sm:flex-row" : "flex-col")}>
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
            tooltip={hoverTooltip}
          />
          <ColorBlock
            bgVariable={foregroundVariable}
            label="Foreground"
            tooltip={foregroundTooltip}
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
              {(() => {
                const token = getTokenName(soft.hoverTooltip, soft.hoverVariable);

                return (
                  <ColorTooltip className="block w-full" content={soft.hoverTooltip}>
                    <div
                      className="flex w-full cursor-pointer flex-col justify-center rounded-xl border border-black/12 px-4 py-2.5 dark:border-white/12"
                      style={{backgroundColor: soft.hoverCssValue || `var(${soft.hoverVariable})`}}
                      onClick={(event) =>
                        copyColorValue(event, soft.hoverCssValue || soft.hoverVariable)
                      }
                    >
                      <span className="text-sm font-medium tracking-tight text-foreground">
                        Hover
                      </span>
                      <span className="font-mono text-[10px] leading-tight text-foreground opacity-60 sm:hidden">
                        {token}
                      </span>
                    </div>
                  </ColorTooltip>
                );
              })()}
            </div>
            <div className="relative">
              <ColorBlock
                bgVariable={soft.foregroundVariable}
                cssValue={soft.foregroundCssValue}
                label="Foreground"
                tooltip={soft.foregroundTooltip}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ColorSectionSideBySide({
  baseTooltip,
  baseVariable,
  foregroundTooltip,
  foregroundVariable,
  hoverCssValue,
  hoverTooltip,
  hoverVariable,
  name,
  soft,
}: SideBySideProps) {
  return (
    <div className="not-prose flex flex-col gap-4 sm:flex-row">
      <ThemeColumn
        baseTooltip={baseTooltip}
        baseVariable={baseVariable}
        foregroundTooltip={foregroundTooltip}
        foregroundVariable={foregroundVariable}
        hoverCssValue={hoverCssValue}
        hoverTooltip={hoverTooltip}
        hoverVariable={hoverVariable}
        name={name}
        soft={soft}
        theme="Light"
      />
      <ThemeColumn
        baseTooltip={baseTooltip}
        baseVariable={baseVariable}
        foregroundTooltip={foregroundTooltip}
        foregroundVariable={foregroundVariable}
        hoverCssValue={hoverCssValue}
        hoverTooltip={hoverTooltip}
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
  tooltip,
  variable,
}: {
  label: string;
  variable: string;
  cssValue?: string;
  border?: boolean;
  tooltip?: string;
}) {
  const bgValue = cssValue || `var(${variable})`;
  const token = getTokenName(tooltip, variable);

  return (
    <ColorTooltip className="min-w-0 basis-full sm:flex-1 sm:basis-0" content={tooltip}>
      <div
        style={{backgroundColor: bgValue}}
        className={cn(
          "flex min-h-14 w-full cursor-pointer flex-col justify-center rounded-xl px-4 py-2",
          border && "border border-border",
        )}
        onClick={(event) => copyColorValue(event, cssValue || variable)}
      >
        <span className="text-sm font-medium tracking-tight" style={contrastStyle(variable)}>
          {label}
        </span>
        <span
          className="truncate font-mono text-[10px] leading-tight opacity-60 sm:hidden"
          style={contrastStyle(variable)}
        >
          {token}
        </span>
      </div>
    </ColorTooltip>
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
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            {lightColors.map((color) => (
              <StackedSwatch
                key={color.variable + color.label}
                border={color.border}
                cssValue={color.cssValue}
                label={color.label}
                tooltip={color.tooltip}
                variable={color.variable}
              />
            ))}
          </div>
        </div>
      </div>
      <div data-theme="dark">
        <div className="flex flex-col gap-2">
          <ThemeChip theme="Dark" />
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            {darkColors.map((color) => (
              <StackedSwatch
                key={color.variable + color.label}
                border={color.border}
                cssValue={color.cssValue}
                label={color.label}
                tooltip={color.tooltip}
                variable={color.variable}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ColorSectionPrimitive({colors}: {colors: StackedColor[]}) {
  return (
    <div className="not-prose flex flex-wrap gap-2 sm:flex-nowrap">
      {colors.map((color) => (
        <StackedSwatch
          key={color.variable + color.label}
          border={color.border}
          cssValue={color.cssValue}
          label={color.label}
          tooltip={color.tooltip}
          variable={color.variable}
        />
      ))}
    </div>
  );
}

interface FormFieldColors {
  bg: string;
  bgTooltip?: string;
  bgHover: string;
  bgHoverTooltip?: string;
  bgFocusTooltip?: string;
  placeholder: string;
  placeholderTooltip?: string;
  foreground: string;
  foregroundTooltip?: string;
}

function FormFieldThemeBlock({colors, theme}: {colors: FormFieldColors; theme: "light" | "dark"}) {
  return (
    <div data-theme={theme}>
      <div className="flex flex-col gap-2">
        <ThemeChip theme={theme === "light" ? "Light" : "Dark"} />
        <div className="flex flex-col gap-2 sm:flex-row">
          <div
            className="flex flex-1 flex-col gap-1.5 rounded-xl border border-black/12 p-3"
            style={{backgroundColor: `var(${colors.bg})`}}
          >
            <ColorTooltip content={colors.bgTooltip}>
              <span
                className="cursor-default text-base font-medium tracking-tight"
                style={contrastStyle(colors.bg)}
              >
                Bg
              </span>
            </ColorTooltip>
            <ColorBlock
              hasBorder
              bgVariable={colors.bg}
              cssValue={colors.bgHover}
              label="Hover"
              tooltip={colors.bgHoverTooltip}
            />
            <ColorBlock
              hasBorder
              bgVariable={colors.bg}
              label="Focus"
              tooltip={colors.bgFocusTooltip}
            />
          </div>
          <div className="flex min-w-0 flex-row gap-2 sm:w-40 sm:flex-col">
            <ColorTooltip className="min-w-0 flex-1" content={colors.placeholderTooltip}>
              <div
                className="flex h-full cursor-pointer items-center rounded-xl border border-border px-4 py-3"
                style={{backgroundColor: `var(${colors.placeholder})`}}
                onClick={(event) => copyColorValue(event, colors.placeholder)}
              >
                <span
                  className="text-sm font-medium tracking-tight"
                  style={contrastStyle(colors.placeholder)}
                >
                  Placeholder
                </span>
              </div>
            </ColorTooltip>
            <ColorTooltip className="min-w-0 flex-1" content={colors.foregroundTooltip}>
              <div
                className="flex h-full cursor-pointer items-center rounded-xl px-4 py-3"
                style={{backgroundColor: `var(${colors.foreground})`}}
                onClick={(event) => copyColorValue(event, colors.foreground)}
              >
                <span
                  className="text-sm font-medium tracking-tight"
                  style={contrastStyle(colors.foreground)}
                >
                  Foreground
                </span>
              </div>
            </ColorTooltip>
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

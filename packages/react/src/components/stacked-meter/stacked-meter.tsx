"use client";

import type {StackedMeterVariants} from "@heroui/styles";
import type {ComponentPropsWithoutRef, ReactNode} from "react";

import {stackedMeterVariants} from "@heroui/styles";
import React, {createContext, useContext, useEffect, useId, useMemo, useState} from "react";

import {Tooltip} from "../tooltip";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export type StackedMeterColor = "default" | "accent" | "success" | "warning" | "danger";

export type StackedMeterSize = "sm" | "md" | "lg";

export interface StackedMeterSegment {
  /** Stable React key and ARIA id seed. */
  id: string;
  /** Numeric contribution; sums with siblings up to `maxValue`. */
  value: number;
  /** Human-readable name shown in the tooltip and legend. */
  label: string;
  /** One of HeroUI's status colours. Defaults to `accent`. */
  color?: StackedMeterColor;
  /** Override the tooltip content. Falls back to "{label}: {formatted value}". */
  tooltip?: ReactNode;
}

export interface StackedMeterRootProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    StackedMeterVariants {
  /** Segments to render, in left-to-right order. */
  segments: ReadonlyArray<StackedMeterSegment>;
  /** Total capacity (denominator). Defaults to 100. */
  maxValue?: number;
  /** Intl.NumberFormat options for the Output and tooltip values. */
  formatOptions?: Intl.NumberFormatOptions;
  /** Track thickness. Matches HeroUI Meter's `size` scale. */
  size?: StackedMeterSize;
  /**
   * Run the fill-in animation on mount. Defaults to true; ignored
   * when the user prefers reduced motion.
   */
  animate?: boolean;
  /** Compound slots: Output, Track, Legend (in any order). */
  children?: ReactNode;
}

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

interface StackedMeterContextValue {
  segments: ReadonlyArray<StackedMeterSegment>;
  maxValue: number;
  formatOptions?: Intl.NumberFormatOptions;
  size: StackedMeterSize;
  mounted: boolean;
  rootId: string;
  slots: ReturnType<typeof stackedMeterVariants>;
}

const StackedMeterContext = createContext<StackedMeterContextValue | null>(null);

function useStackedMeterContext(slot: string): StackedMeterContextValue {
  const context = useContext(StackedMeterContext);

  if (!context) {
    throw new Error(`<StackedMeter.${slot}> must be rendered inside <StackedMeter>.`);
  }

  return context;
}

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

const StackedMeterRoot = ({
  segments,
  maxValue = 100,
  formatOptions,
  size = "md",
  animate = true,
  className,
  children,
  ...rest
}: StackedMeterRootProps) => {
  const rootId = useId();
  const slots = useMemo(() => stackedMeterVariants({size}), [size]);

  // Skip the initial-render width=0 frame when animation is disabled.
  const [mounted, setMounted] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const frame = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(frame);
  }, [animate]);

  if (process.env.NODE_ENV !== "production") {
    const total = segments.reduce((sum, s) => sum + s.value, 0);

    if (total > maxValue) {
      // eslint-disable-next-line no-console
      console.warn(
        `[StackedMeter] segment values total ${total}, which exceeds maxValue ${maxValue}. Segments will be clamped proportionally.`,
      );
    }
  }

  const context = useMemo<StackedMeterContextValue>(
    () => ({segments, maxValue, formatOptions, size, mounted, rootId, slots}),
    [segments, maxValue, formatOptions, size, mounted, rootId, slots],
  );

  return (
    <StackedMeterContext value={context}>
      <div
        className={slots.base({className})}
        data-size={size}
        data-slot="stacked-meter"
        role="group"
        {...rest}
      >
        {children}
      </div>
    </StackedMeterContext>
  );
};

StackedMeterRoot.displayName = "HeroUI.StackedMeter";

/* -------------------------------------------------------------------------------------------------
 * Output
 * -----------------------------------------------------------------------------------------------*/

export interface StackedMeterOutputProps
  extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  /** Custom render. Receives the sum, max, and formatter. */
  children?: (args: {total: number; maxValue: number; format: (n: number) => string}) => ReactNode;
}

const StackedMeterOutput = ({className, children, ...rest}: StackedMeterOutputProps) => {
  const {segments, maxValue, formatOptions, slots} = useStackedMeterContext("Output");
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const format = (n: number) => formatNumber(n, formatOptions);

  return (
    <span className={slots.output({className})} data-slot="stacked-meter-output" {...rest}>
      {children ? children({total, maxValue, format}) : `${format(total)} / ${format(maxValue)}`}
    </span>
  );
};

StackedMeterOutput.displayName = "HeroUI.StackedMeter.Output";

/* -------------------------------------------------------------------------------------------------
 * Track
 * -----------------------------------------------------------------------------------------------*/

export type StackedMeterTrackProps = Omit<ComponentPropsWithoutRef<"div">, "children">;

const StackedMeterTrack = ({className, ...rest}: StackedMeterTrackProps) => {
  const {segments, maxValue, formatOptions, mounted, rootId, slots} =
    useStackedMeterContext("Track");

  const totalRaw = segments.reduce((sum, s) => sum + s.value, 0);
  // Clamp the denominator so we never exceed 100% width even on overflow.
  const denom = Math.max(maxValue, totalRaw);

  return (
    <div className={slots.track({className})} data-slot="stacked-meter-track" {...rest}>
      {segments.map((seg, index) => {
        const pct = denom === 0 ? 0 : (seg.value / denom) * 100;
        const tooltipNode = seg.tooltip ?? (
          <span>
            <strong>{seg.label}</strong>: {formatNumber(seg.value, formatOptions)}
          </span>
        );
        const color = seg.color ?? "accent";

        return (
          <Tooltip delay={150} key={seg.id}>
            <Tooltip.Trigger
              aria-label={`${seg.label}: ${formatNumber(seg.value, formatOptions)}`}
              aria-valuemax={maxValue}
              aria-valuemin={0}
              aria-valuenow={seg.value}
              className={slots.segment({className: `stacked-meter__segment--${color}`})}
              data-color={color}
              data-index={index}
              data-segment-id={`${rootId}-${seg.id}`}
              role="meter"
              style={{
                width: mounted ? `${pct}%` : "0%",
                ["--stacked-meter-segment-index" as string]: index,
              }}
            />
            <Tooltip.Content>{tooltipNode}</Tooltip.Content>
          </Tooltip>
        );
      })}
    </div>
  );
};

StackedMeterTrack.displayName = "HeroUI.StackedMeter.Track";

/* -------------------------------------------------------------------------------------------------
 * Legend
 * -----------------------------------------------------------------------------------------------*/

export type StackedMeterLegendProps = Omit<ComponentPropsWithoutRef<"ul">, "children">;

const StackedMeterLegend = ({className, ...rest}: StackedMeterLegendProps) => {
  const {segments, slots} = useStackedMeterContext("Legend");

  return (
    <ul
      aria-hidden="true"
      className={slots.legend({className})}
      data-slot="stacked-meter-legend"
      {...rest}
    >
      {segments.map((seg) => {
        const color = seg.color ?? "accent";

        return (
          <li className={slots.legendItem()} data-color={color} key={seg.id}>
            <span
              aria-hidden="true"
              className={slots.legendSwatch({className: `stacked-meter__legend-swatch--${color}`})}
            />
            <span className={slots.legendLabel()}>{seg.label}</span>
          </li>
        );
      })}
    </ul>
  );
};

StackedMeterLegend.displayName = "HeroUI.StackedMeter.Legend";

/* -------------------------------------------------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------------------------------------------*/

function formatNumber(value: number, options: Intl.NumberFormatOptions | undefined): string {
  try {
    return new Intl.NumberFormat(undefined, options).format(value);
  } catch {
    return String(value);
  }
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {StackedMeterRoot, StackedMeterOutput, StackedMeterTrack, StackedMeterLegend};

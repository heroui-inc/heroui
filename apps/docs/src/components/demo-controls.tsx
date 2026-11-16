"use client";

import type {
  DemoControl,
  DemoControlValue,
  DemoControlValues,
  DemoControls,
} from "@/lib/demo-controls";
import type {Key} from "@heroui/react";
import type {ReactNode} from "react";

import {ArrowRotateLeft, Sliders} from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  ListBox,
  Select,
  Slider,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@heroui/react";
import {Pre} from "fumadocs-ui/components/codeblock";
import {useEffect, useId, useRef, useState} from "react";

import {CodeBlock} from "@/components/codeblock-client";
import {useDictionary} from "@/hooks/use-dictionary";
import {getEnumOptions, isUnsettable} from "@/lib/demo-controls";
import {docsShikiOptions} from "@/lib/shiki-themes";
import {cn} from "@/utils/cn";

/** Enums with this many options or fewer render as a segmented control. */
const SEGMENTED_MAX_OPTIONS = 3;

/** Key of the enum option that leaves the prop unset; never a real prop value. */
const UNSET_KEY = "__unset";

interface EnumOption {
  id: string;
  label: string;
}

const labelClassName = "font-mono text-xs leading-4 font-normal text-(--docs-fg-muted)";

/* -------------------------------------------------------------------------------------------------
 * Toggle
 * -----------------------------------------------------------------------------------------------*/

export function DemoControlsToggle({
  controlsId,
  isOpen,
  onToggle,
}: {
  controlsId: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const dict = useDictionary().demoControls;

  const label = isOpen ? dict.hide : dict.show;

  return (
    <Tooltip delay={300}>
      <Tooltip.Trigger className="absolute end-3 top-3 z-1" role="presentation" tabIndex={-1}>
        <Button
          isIconOnly
          aria-controls={controlsId}
          aria-expanded={isOpen}
          aria-label={label}
          className="docs-demo-controls-toggle size-8 min-w-0 rounded-full"
          data-open={isOpen || undefined}
          size="sm"
          variant="ghost"
          onPress={onToggle}
        >
          <Sliders className="size-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content placement="left">{label}</Tooltip.Content>
    </Tooltip>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Panel
 * -----------------------------------------------------------------------------------------------*/

export function DemoControlsPanel({
  className,
  controls,
  id,
  isDirty,
  isOpen,
  onChange,
  onReset,
  values,
}: {
  className?: string;
  controls: DemoControls;
  id: string;
  /** Whether any value differs from the demo's initial values. */
  isDirty: boolean;
  isOpen: boolean;
  values: DemoControlValues;
  onChange: (name: string, value: DemoControlValue) => void;
  onReset: () => void;
}) {
  const dict = useDictionary().demoControls;
  const panelRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const entries = Object.entries(controls);

  // Reset disables itself, which would drop keyboard focus to the page; move it to the first control.
  const handleReset = () => {
    const hadFocus = document.activeElement === resetRef.current;

    onReset();
    if (!hadFocus) return;
    requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("button:not(:disabled), input, [tabindex='0']")
        ?.focus();
    });
  };
  const fields = entries.filter(([, control]) => control.type !== "boolean");
  const toggles = entries.filter(([, control]) => control.type === "boolean");

  // Stays mounted (it sizes the stage); closed, it is hidden and out of the tab order.
  return (
    <div
      ref={panelRef}
      aria-label={dict.label}
      className={cn("docs-demo-controls flex flex-col gap-5 px-4 pt-3 pb-6", className)}
      data-open={isOpen || undefined}
      id={id}
      inert={!isOpen}
      role="group"
    >
      {/* Shares the toggle's row. Kept in place while disabled so nothing shifts. */}
      <div className="flex h-8 items-center">
        <Button
          ref={resetRef}
          className="-ms-2.5 h-7 gap-1.5 rounded-full px-2.5 text-xs text-(--docs-fg-muted) data-[hovered=true]:text-(--docs-fg)"
          isDisabled={!isDirty}
          size="sm"
          variant="ghost"
          onPress={handleReset}
        >
          <ArrowRotateLeft className="size-3.5" />
          {dict.reset}
        </Button>
      </div>
      {fields.map(([name, control]) => (
        <ControlField
          key={name}
          control={control}
          name={name}
          unsetLabel={dict.unset}
          values={values}
          onChange={(value) => onChange(name, value)}
        />
      ))}
      {toggles.length > 0 ? (
        <div className="flex flex-col gap-3">
          {toggles.map(([name]) => (
            <BooleanControl
              key={name}
              name={name}
              value={values[name] === true}
              onChange={(value) => onChange(name, value)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ControlField({
  control,
  name,
  onChange,
  unsetLabel,
  values,
}: {
  control: DemoControl;
  name: string;
  /** Label of the enum option that leaves the prop unset. */
  unsetLabel: string;
  values: DemoControlValues;
  onChange: (value: DemoControlValue) => void;
}) {
  const value = values[name];

  switch (control.type) {
    case "enum": {
      const options: EnumOption[] = getEnumOptions(control, values).map((option) => ({
        id: option,
        label: option,
      }));

      if (isUnsettable(control)) options.unshift({id: UNSET_KEY, label: unsetLabel});

      const selected = value === undefined ? UNSET_KEY : String(value);
      const handleChange = (key: string) => onChange(key === UNSET_KEY ? undefined : key);
      // Sized without `distinctFrom`, so the control keeps its shape as the other value changes.
      const size =
        getEnumOptions({...control, distinctFrom: undefined}, values).length +
        Number(isUnsettable(control));

      return size <= SEGMENTED_MAX_OPTIONS ? (
        <SegmentedControl name={name} options={options} value={selected} onChange={handleChange} />
      ) : (
        <SelectControl name={name} options={options} value={selected} onChange={handleChange} />
      );
    }
    case "string":
      return (
        <TextControl
          name={name}
          placeholder={control.placeholder}
          value={String(value ?? "")}
          onChange={onChange}
        />
      );
    case "number":
      if (control.min != null && control.max != null) {
        return (
          <RangeControl
            max={control.max}
            min={control.min}
            name={name}
            step={control.step}
            value={typeof value === "number" ? value : control.min}
            onChange={onChange}
          />
        );
      }

      return (
        <TextControl
          max={control.max}
          min={control.min}
          name={name}
          step={control.step}
          type="number"
          value={value == null ? "" : String(value)}
          onChange={(next) => onChange(next === "" ? undefined : Number(next))}
        />
      );
    default:
      return null;
  }
}

function SelectControl({
  name,
  onChange,
  options,
  value,
}: {
  name: string;
  options: readonly EnumOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      className="gap-2"
      value={value}
      variant="secondary"
      onChange={(key: Key | null) => key != null && onChange(String(key))}
    >
      <Label className={labelClassName}>{name}</Label>
      <Select.Trigger className="min-h-9 rounded-xl text-[13px]">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

function SegmentedControl({
  name,
  onChange,
  options,
  value,
}: {
  name: string;
  options: readonly EnumOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-2">
      <span className={labelClassName} id={labelId}>
        {name}
      </span>
      <ToggleButtonGroup
        disallowEmptySelection
        fullWidth
        aria-labelledby={labelId}
        className="docs-demo-segmented"
        selectedKeys={new Set([value])}
        selectionMode="single"
        size="sm"
        onSelectionChange={(keys) => {
          const [key] = keys;

          if (key != null) onChange(String(key));
        }}
      >
        {options.map((option) => (
          <ToggleButton key={option.id} id={option.id}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

function RangeControl({
  max,
  min,
  name,
  onChange,
  step,
  value,
}: {
  max: number;
  min: number;
  name: string;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Slider
      className="gap-2"
      maxValue={max}
      minValue={min}
      step={step}
      value={value}
      onChange={(next) => onChange(Array.isArray(next) ? (next[0] ?? min) : next)}
    >
      <Label className={labelClassName}>{name}</Label>
      <Slider.Output className="font-mono text-xs leading-4 font-normal text-(--docs-fg)" />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}

function BooleanControl({
  name,
  onChange,
  value,
}: {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Switch className="w-full" isSelected={value} onChange={onChange}>
      <Switch.Content className="h-6 w-full justify-between">
        <span className={labelClassName}>{name}</span>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}

function TextControl({
  name,
  onChange,
  value,
  ...props
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  max?: number;
  min?: number;
  placeholder?: string;
  step?: number;
  type?: "number" | "text";
}) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <Label className={labelClassName} htmlFor={id}>
        {name}
      </Label>
      <Input
        className="h-9 rounded-xl text-[13px]"
        id={id}
        value={value}
        variant="secondary"
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Live code
 * -----------------------------------------------------------------------------------------------*/

export interface HighlightedDemoCode {
  code: string;
  rendered: ReactNode;
  /** First lines, highlighted, for the collapsed peek of long code. */
  preview?: ReactNode;
}

/**
 * The demo's code, following the controls. The server highlights the initial
 * values; other values are highlighted here, keeping the last result on screen
 * while Shiki loads so the code never flashes.
 */
export function DemoControlsCode({code, initial}: {code: string; initial?: HighlightedDemoCode}) {
  const isInitial = code === initial?.code;
  const [highlighted, setHighlighted] = useState<HighlightedDemoCode | undefined>(initial);

  useEffect(() => {
    if (isInitial) return;

    let cancelled = false;

    void import("fumadocs-core/highlight")
      .then(({highlight}) =>
        highlight(code, {components: {pre: Pre}, lang: "tsx", ...docsShikiOptions}),
      )
      .then((rendered) => {
        if (!cancelled) setHighlighted({code, rendered});
      })
      .catch(() => {
        if (!cancelled) setHighlighted(undefined);
      });

    return () => {
      cancelled = true;
    };
  }, [code, isInitial]);

  // While a new value highlights, the previous result stays up.
  const current = isInitial ? initial : (highlighted ?? initial);

  return (
    <div className="relative">
      <CodeBlock
        collapsible
        showLineNumbers
        code={code}
        lang="tsx"
        preview={isInitial ? initial?.preview : undefined}
        title={undefined}
      >
        {current?.rendered ?? (
          <Pre>
            <code>{code}</code>
          </Pre>
        )}
      </CodeBlock>
    </div>
  );
}

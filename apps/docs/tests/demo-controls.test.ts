/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix -- key order is the panel order */
import type {DemoControls} from "@/lib/demo-controls";

import {readFileSync} from "node:fs";
import {join} from "node:path";

import {describe, expect, it} from "vitest";

import {demos as cnDemos} from "@/demos/cn";
import {demos as enDemos} from "@/demos/en";
import {
  getChangedProps,
  getEnumOptions,
  getInitialControlValues,
  renderDemoSource,
  setControlValue,
} from "@/lib/demo-controls";

const controls = {
  variant: {type: "enum", options: ["primary", "secondary"], default: "primary"},
  size: {type: "enum", options: ["sm", "md", "lg"], default: "md"},
  isDisabled: {type: "boolean"},
  fullWidth: {type: "boolean"},
} satisfies DemoControls;

const source = `"use client";

import type {ButtonProps} from "@heroui/react";

import {Button} from "@heroui/react";

export function Basic(props: ButtonProps) {
  return <Button {...props} onPress={() => console.log("pressed")}>Click me</Button>;
}
`;

describe("demo controls", () => {
  it("prints the file without the props plumbing at the initial values", () => {
    expect(renderDemoSource(source, controls, getInitialControlValues(controls))).toBe(
      `"use client";

import {Button} from "@heroui/react";

export function Basic() {
  return <Button onPress={() => console.log("pressed")}>Click me</Button>;
}`,
    );
  });

  it("prints only changed props, sorted like jsx-sort-props", () => {
    const short = `export function Basic(props: ButtonProps) {
  return <Button {...props}>Click me</Button>;
}`;

    expect(
      renderDemoSource(short, controls, {isDisabled: true, size: "md", variant: "secondary"}),
    ).toContain(`return <Button isDisabled variant="secondary">Click me</Button>;`);
  });

  it("wraps the element once the tag gets too long", () => {
    const code = renderDemoSource(source, controls, {
      fullWidth: true,
      isDisabled: true,
      size: "lg",
      variant: "secondary",
    });

    expect(code).toContain(`  return (
    <Button
      fullWidth
      isDisabled
      size="lg"
      variant="secondary"
      onPress={() => console.log("pressed")}
    >
      Click me
    </Button>
  );`);
  });

  it("keeps imports that are still used", () => {
    const code = renderDemoSource(
      `import {Input, type InputProps} from "@heroui/react";

export function Basic(props: InputProps) {
  const extra: InputProps = {};

  return <Input {...props} {...extra} />;
}`,
      {isInvalid: {type: "boolean"}},
      {isInvalid: true},
    );

    expect(code).toContain(`import {Input, type InputProps} from "@heroui/react";`);
    expect(code).toContain(`export function Basic() {`);
    expect(code).toContain(`<Input isInvalid {...extra} />`);
  });

  it("replaces every spread when a demo renders the target more than once", () => {
    const code = renderDemoSource(
      `export function Basic(props: SwatchProps) {
  return (
    <div>
      <Swatch {...props} color="red" />
      <Swatch {...props} color="blue" />
    </div>
  );
}`,
      {size: {type: "enum", options: ["sm", "md"], default: "md"}},
      {size: "sm"},
    );

    expect(code).toContain(`<Swatch color="red" size="sm" />`);
    expect(code).toContain(`<Swatch color="blue" size="sm" />`);
  });

  it("moves dependent values back to a valid option", () => {
    const channels = {
      colorSpace: {type: "enum", options: ["rgb", "hsl"], default: "rgb"},
      channel: {
        type: "enum",
        options: {by: "colorSpace", options: {rgb: ["red", "blue"], hsl: ["hue", "lightness"]}},
        initial: "blue",
        required: true,
      },
      optionalChannel: {
        type: "enum",
        options: {by: "colorSpace", options: {rgb: ["red", "blue"], hsl: ["hue"]}},
        initial: "red",
      },
      otherAxis: {
        type: "enum",
        options: {by: "colorSpace", options: {rgb: ["red", "blue"], hsl: ["hue"]}},
        distinctFrom: "optionalChannel",
      },
    } satisfies DemoControls;

    expect(
      setControlValue(channels, getInitialControlValues(channels), "colorSpace", "hsl"),
    ).toEqual({
      colorSpace: "hsl",
      channel: "hue",
      optionalChannel: undefined,
      otherAxis: undefined,
    });
    expect(getEnumOptions(channels.otherAxis, getInitialControlValues(channels))).toEqual(["blue"]);
  });

  it("drops default and empty values from the rendered props", () => {
    expect(
      getChangedProps(
        {...controls, label: {type: "string"}},
        {fullWidth: false, isDisabled: true, label: "", size: "md", variant: "primary"},
      ),
    ).toEqual({isDisabled: true});
  });
});

describe("controlled demos", () => {
  const controlled = [...Object.values(enDemos), ...Object.values(cnDemos)].filter(
    (demo) => demo.controls,
  );

  it.each(controlled.map((demo) => [demo.file, demo] as const))(
    "%s spreads props and prints without them",
    (_, demo) => {
      const source = readFileSync(join(process.cwd(), "src/demos", demo.file), "utf-8");
      const controls = demo.controls!;
      // Every control set to its last option, the way the panel would set them.
      const everyValue = Object.entries(controls).reduce(
        (values, [name, control]) =>
          setControlValue(
            controls,
            values,
            name,
            control.type === "boolean"
              ? true
              : control.type === "enum"
                ? getEnumOptions(control, values).at(-1)
                : 1,
          ),
        getInitialControlValues(controls),
      );

      expect(source).toContain("{...props}");

      for (const values of [getInitialControlValues(controls), everyValue]) {
        expect(renderDemoSource(source, controls, values)).not.toMatch(/\bprops\b|\w+Props\b/);
      }
    },
  );
});

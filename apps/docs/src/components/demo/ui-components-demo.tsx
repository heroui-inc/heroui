"use client";

import {Checkbox, Radio, RadioGroup, Spinner, Switch} from "@heroui/react";

import {useDictionary} from "@/hooks/use-dictionary";

export function UIComponentsDemo() {
  const {demos} = useDictionary();
  const t = demos.uiComponents;

  return (
    <div className="flex w-full items-center justify-center gap-8">
      {/* Checkbox - Selected State */}
      <Checkbox defaultSelected aria-label={t.checkboxAriaLabel}>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>

      {/* Switch - On State */}
      <Switch defaultSelected aria-label={t.switchAriaLabel}>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>

      {/* Radio Buttons - Unselected and Selected */}
      <RadioGroup
        aria-label={t.radioAriaLabel}
        className="gap-8"
        defaultValue="option2"
        name="demo"
        orientation="horizontal"
      >
        <Radio value="option1">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
        </Radio>
        <Radio value="option2">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
        </Radio>
      </RadioGroup>

      {/* Spinner */}
      <Spinner />
    </div>
  );
}

import {Checkbox, Radio, RadioGroup, Spinner, Switch} from "@heroui/react";

export function UIComponentsDemo() {
  return (
    <div className="flex w-full items-center justify-center gap-8">
      {/* Checkbox - Selected State */}
      <Checkbox defaultSelected aria-label="Checkbox Indicator Example">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>

      {/* Switch - On State */}
      <Switch defaultSelected aria-label="Switch On State Example">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>

      {/* Radio Buttons - Unselected and Selected */}
      <RadioGroup
        aria-label="Radio Buttons Example"
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

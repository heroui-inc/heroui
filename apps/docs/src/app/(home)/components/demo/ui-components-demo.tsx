import {Checkbox, Radio, RadioGroup, Spinner, Switch} from "@heroui/react";

export function UIComponentsDemo() {
  return (
    <div className="flex w-full items-center justify-center gap-8">
      {/* Checkbox - Selected State */}
      <Checkbox defaultSelected>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>

      {/* Switch - On State */}
      <Switch defaultSelected>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>

      {/* Radio Buttons - Unselected and Selected */}
      <RadioGroup className="gap-8" defaultValue="option2" name="demo" orientation="horizontal">
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

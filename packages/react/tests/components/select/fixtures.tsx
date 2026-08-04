import type {Key} from "@react-types/shared";

import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";
import {Select} from "@/components/select";

export type SelectFixtureProps = {
  defaultOpen?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (key: Key | null) => void;
};

export const SelectFixture = (props: SelectFixtureProps = {}) => (
  <Select
    data-testid="select"
    defaultOpen={props.defaultOpen}
    defaultValue={props.defaultValue}
    isDisabled={props.isDisabled}
    isInvalid={props.isInvalid}
    placeholder="Select one"
    value={props.value}
    onChange={props.onChange}
  >
    <Label>State</Label>
    <Select.Trigger>
      <Select.Value />
      <Select.Indicator />
    </Select.Trigger>
    <Select.Popover>
      <ListBox>
        <ListBox.Item id="florida" textValue="Florida">
          Florida
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="california" textValue="California">
          California
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="texas" textValue="Texas">
          Texas
          <ListBox.ItemIndicator />
        </ListBox.Item>
      </ListBox>
    </Select.Popover>
    {props.isInvalid ? <FieldError>Please choose a state</FieldError> : null}
  </Select>
);

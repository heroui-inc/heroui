import type {Key} from "@react-types/shared";

import {ComboBox} from "@/components/combo-box";
import {FieldError} from "@/components/field-error";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";

export type ComboBoxFixtureProps = {
  isDisabled?: boolean;
  isInvalid?: boolean;
  defaultValue?: string;
  onChange?: (key: Key | null) => void;
};

export const ComboBoxFixture = (props: ComboBoxFixtureProps = {}) => (
  <ComboBox
    data-testid="combo-box"
    defaultValue={props.defaultValue}
    isDisabled={props.isDisabled}
    isInvalid={props.isInvalid}
    onChange={props.onChange}
  >
    <Label>Favorite Animal</Label>
    <ComboBox.InputGroup>
      <Input placeholder="Search animals..." />
      <ComboBox.Trigger />
    </ComboBox.InputGroup>
    <ComboBox.Popover>
      <ListBox>
        <ListBox.Item id="cat" textValue="Cat">
          Cat
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="dog" textValue="Dog">
          Dog
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="panda" textValue="Panda">
          Panda
          <ListBox.ItemIndicator />
        </ListBox.Item>
      </ListBox>
    </ComboBox.Popover>
    {props.isInvalid ? <FieldError>Please choose an animal</FieldError> : null}
  </ComboBox>
);

import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function Basic() {
  return (
    <CheckboxGroup name="interests">
      <Label>Select your interests</Label>
      <Description>Choose all that apply</Description>
      <Checkbox value="coding">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Coding
        </Checkbox.Content>
        <Description>Love building software</Description>
      </Checkbox>
      <Checkbox value="design">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Design
        </Checkbox.Content>
        <Description>Enjoy creating beautiful interfaces</Description>
      </Checkbox>
      <Checkbox value="writing">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Writing
        </Checkbox.Content>
        <Description>Passionate about content creation</Description>
      </Checkbox>
    </CheckboxGroup>
  );
}

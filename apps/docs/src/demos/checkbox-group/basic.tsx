import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function Basic() {
  return (
    <CheckboxGroup name="interests">
      <Label>Select your interests</Label>
      <Description>Choose all that apply</Description>
      <Checkbox.Root value="coding">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Coding</Label>
          <Description>Love building software</Description>
        </Checkbox.Content>
      </Checkbox.Root>
      <Checkbox.Root value="design">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Design</Label>
          <Description>Enjoy creating beautiful interfaces</Description>
        </Checkbox.Content>
      </Checkbox.Root>
      <Checkbox.Root value="writing">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Writing</Label>
          <Description>Passionate about content creation</Description>
        </Checkbox.Content>
      </Checkbox.Root>
    </CheckboxGroup>
  );
}

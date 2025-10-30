import {Checkbox, CheckboxGroup, Description, Label, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <CheckboxGroup name="interests">
        <Label>Select your interests</Label>
        <Description>Choose all that apply</Description>
        <Checkbox value="coding">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Coding</Label>
            <Description>Love building software</Description>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="design">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Design</Label>
            <Description>Enjoy creating beautiful interfaces</Description>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="writing">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Writing</Label>
            <Description>Passionate about content creation</Description>
          </Checkbox.Content>
        </Checkbox>
      </CheckboxGroup>
    </Surface>
  );
}

import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function Basic() {
  return (
    <CheckboxGroup name="interests">
      <Label>Select your interests</Label>
      <Description>Choose all that apply</Description>
      <Checkbox value="coding">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Coding</Label>
        </Checkbox.Button>
        <Description>Love building software</Description>
      </Checkbox>
      <Checkbox value="design">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Design</Label>
        </Checkbox.Button>
        <Description>Enjoy creating beautiful interfaces</Description>
      </Checkbox>
      <Checkbox value="writing">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Writing</Label>
        </Checkbox.Button>
        <Description>Passionate about content creation</Description>
      </Checkbox>
    </CheckboxGroup>
  );
}

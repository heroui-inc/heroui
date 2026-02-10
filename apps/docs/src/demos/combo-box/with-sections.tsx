"use client";

import {ComboBox, Header, Input, Label, ListBox, Separator} from "@heroui/react";

export function WithSections() {
  return (
    <ComboBox className="w-[256px]">
      <Label>Country</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search countries..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBox.Section>
            <Header>North America</Header>
            <ListBox.Item id="usa" textValue="United States">
              United States
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="canada" textValue="Canada">
              Canada
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="mexico" textValue="Mexico">
              Mexico
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
          <Separator />
          <ListBox.Section>
            <Header>Europe</Header>
            <ListBox.Item id="uk" textValue="United Kingdom">
              United Kingdom
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="france" textValue="France">
              France
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="germany" textValue="Germany">
              Germany
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="spain" textValue="Spain">
              Spain
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="italy" textValue="Italy">
              Italy
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
          <Separator />
          <ListBox.Section>
            <Header>Asia</Header>
            <ListBox.Item id="japan" textValue="Japan">
              Japan
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="china" textValue="China">
              China
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="india" textValue="India">
              India
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="south-korea" textValue="South Korea">
              South Korea
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}

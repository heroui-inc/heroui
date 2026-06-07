"use client";

import type {Selection} from "@heroui/react";

import {Button, Dropdown, Header, Kbd, Label, Separator} from "@heroui/react";
import {useState} from "react";

export function WithSectionLevelSelection() {
  const [textStyles, setTextStyles] = useState<Selection>(new Set(["bold", "italic"]));
  const [textAlignment, setTextAlignment] = useState<Selection>(new Set(["left"]));

  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Styles
      </Button>
      <Dropdown.Popover className="min-w-[256px]">
        <Dropdown.Menu>
          <Dropdown.Section>
            <Header>Actions</Header>
            <Dropdown.Item id="cut" textValue="Cut">
              <Label>Cut</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>X</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="copy" textValue="Copy">
              <Label>Copy</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>C</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="paste" textValue="Paste">
              <Label>Paste</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>U</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section
            selectedKeys={textStyles}
            selectionMode="multiple"
            onSelectionChange={setTextStyles}
          >
            <Header>Text Style</Header>
            <Dropdown.Item id="bold" textValue="Bold">
              <Dropdown.ItemIndicator />
              <Label>Bold</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>B</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="italic" textValue="Italic">
              <Dropdown.ItemIndicator />
              <Label>Italic</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>I</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="underline" textValue="Underline">
              <Dropdown.ItemIndicator />
              <Label>Underline</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>U</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section
            selectedKeys={textAlignment}
            selectionMode="single"
            onSelectionChange={setTextAlignment}
          >
            <Header>Text Alignment</Header>
            <Dropdown.Item id="left" textValue="Left">
              <Dropdown.ItemIndicator type="dot" />
              <Label>Left</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>A</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="center" textValue="Center">
              <Dropdown.ItemIndicator type="dot" />
              <Label>Center</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>H</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="right" textValue="Right">
              <Dropdown.ItemIndicator type="dot" />
              <Label>Right</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>D</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

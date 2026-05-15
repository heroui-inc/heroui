"use client";

import type {Selection} from "@heroui/react";

import {Button, Dropdown, Header, Kbd, Label, Separator} from "@heroui/react";
import {useState} from "react";

export function WithSectionLevelSelection() {
  const [textStyles, setTextStyles] = useState<Selection>(new Set(["bold", "italic"]));
  const [textAlignment, setTextAlignment] = useState<Selection>(new Set(["left"]));

  return (
    <Dropdown>
      <Button aria-label="菜单" variant="secondary">
        样式
      </Button>
      <Dropdown.Popover className="min-w-[256px]">
        <Dropdown.Menu>
          <Dropdown.Section>
            <Header>操作</Header>
            <Dropdown.Item id="cut" textValue="剪切">
              <Label>剪切</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>X</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="copy" textValue="复制">
              <Label>复制</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>C</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="paste" textValue="粘贴">
              <Label>粘贴</Label>
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
            <Header>文本样式</Header>
            <Dropdown.Item id="bold" textValue="粗体">
              <Dropdown.ItemIndicator />
              <Label>粗体</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>B</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="italic" textValue="斜体">
              <Dropdown.ItemIndicator />
              <Label>斜体</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>I</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="underline" textValue="下划线">
              <Dropdown.ItemIndicator />
              <Label>下划线</Label>
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
            <Header>文本对齐</Header>
            <Dropdown.Item id="left" textValue="左对齐">
              <Dropdown.ItemIndicator type="dot" />
              <Label>左对齐</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>A</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="center" textValue="居中">
              <Dropdown.ItemIndicator type="dot" />
              <Label>居中</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>H</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="right" textValue="右对齐">
              <Dropdown.ItemIndicator type="dot" />
              <Label>右对齐</Label>
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

import type {Key} from "@react-types/shared";

import {MenuTrigger, Popover} from "react-aria-components/Menu";

import {Button} from "@/components/button";
import {Label} from "@/components/label";
import {Menu} from "@/components/menu";

export type MenuFixtureProps = {
  onAction?: (key: Key) => void;
};

export const MenuFixture = (props: MenuFixtureProps = {}) => (
  <MenuTrigger>
    <Button aria-label="Menu">Actions</Button>
    <Popover>
      <Menu onAction={props.onAction}>
        <Menu.Item id="new-file" textValue="New file">
          <Label>New file</Label>
        </Menu.Item>
        <Menu.Item id="copy-link" textValue="Copy link">
          <Label>Copy link</Label>
        </Menu.Item>
        <Menu.Item id="delete-file" textValue="Delete file">
          <Label>Delete file</Label>
        </Menu.Item>
      </Menu>
    </Popover>
  </MenuTrigger>
);

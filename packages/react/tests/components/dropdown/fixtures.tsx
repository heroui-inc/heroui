import type {Key} from "@react-types/shared";

import {Dropdown} from "@/components/dropdown";
import {Label} from "@/components/label";

export type DropdownFixtureProps = {
  defaultOpen?: boolean;
  onAction?: (key: Key) => void;
};

export const DropdownFixture = (props: DropdownFixtureProps = {}) => (
  <Dropdown defaultOpen={props.defaultOpen}>
    <Dropdown.Trigger aria-label="Menu">Actions</Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu onAction={props.onAction}>
        <Dropdown.Item id="new-file" textValue="New file">
          <Label>New file</Label>
        </Dropdown.Item>
        <Dropdown.Item id="copy-link" textValue="Copy link">
          <Label>Copy link</Label>
        </Dropdown.Item>
        <Dropdown.Item id="delete-file" textValue="Delete file">
          <Label>Delete file</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
);

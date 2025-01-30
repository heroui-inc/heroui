import type {Selection} from "@vezham/react";

import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@vezham/react";

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Multiple selection example"
        closeOnSelect={false}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        variant="flat"
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

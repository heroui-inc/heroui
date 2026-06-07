"use client";

import {Button, Description, Label, SearchField} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-4">
      <SearchField name="search" value={value} onChange={setValue}>
        <Label>搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="搜索…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>当前值： {value || "（空）"}</Description>
      </SearchField>
      <div className="flex gap-2">
        <Button variant="tertiary" onPress={() => setValue("")}>
          Clear
        </Button>
        <Button variant="tertiary" onPress={() => setValue("示例查询")}>
          设置示例
        </Button>
      </div>
    </div>
  );
}

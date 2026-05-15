"use client";

import {Description, FieldError, Label, SearchField} from "@heroui/react";
import React from "react";

export function WithValidation() {
  const [value, setValue] = React.useState("");
  const isInvalid = value.length > 0 && value.length < 3;

  return (
    <div className="flex flex-col gap-4">
      <SearchField isRequired isInvalid={isInvalid} name="search" value={value} onChange={setValue}>
        <Label>搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="搜索…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        {isInvalid ? (
          <FieldError>搜索内容至少需要 3 个字符</FieldError>
        ) : (
          <Description>请输入至少 3 个字符后再搜索</Description>
        )}
      </SearchField>
    </div>
  );
}

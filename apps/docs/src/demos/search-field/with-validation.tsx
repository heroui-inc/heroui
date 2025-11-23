"use client";

import {Description, FieldError, Label, SearchField} from "@heroui/react";
import React from "react";

export function WithValidation() {
  const [value, setValue] = React.useState("");
  const isInvalid = value.length > 0 && value.length < 3;

  return (
    <div className="flex flex-col gap-4">
      <SearchField isRequired isInvalid={isInvalid} name="search" value={value} onChange={setValue}>
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        {isInvalid ? (
          <FieldError>Search query must be at least 3 characters</FieldError>
        ) : (
          <Description>Enter at least 3 characters to search</Description>
        )}
      </SearchField>
    </div>
  );
}

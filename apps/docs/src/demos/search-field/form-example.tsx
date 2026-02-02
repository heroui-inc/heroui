"use client";

import {Button, Description, FieldError, Form, Label, SearchField, Spinner} from "@heroui/react";
import React from "react";

export function FormExample() {
  const [value, setValue] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const MIN_LENGTH = 3;
  const isInvalid = value.length > 0 && value.length < MIN_LENGTH;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (value.length < MIN_LENGTH) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Search submitted:", {query: value});
      setValue("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
      <SearchField isRequired isInvalid={isInvalid} name="search" value={value} onChange={setValue}>
        <Label>Search products</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="Search products..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        {isInvalid ? (
          <FieldError>Search query must be at least {MIN_LENGTH} characters</FieldError>
        ) : (
          <Description>Enter at least {MIN_LENGTH} characters to search</Description>
        )}
      </SearchField>
      <Button
        className="w-full"
        isDisabled={value.length < MIN_LENGTH}
        isPending={isSubmitting}
        type="submit"
        variant="primary"
      >
        {isSubmitting ? (
          <>
            <Spinner color="current" size="sm" />
            Searching...
          </>
        ) : (
          "Search"
        )}
      </Button>
    </Form>
  );
}

"use client";

import {Button, Description, FieldError, Form, Label, SearchField, Spinner} from "@heroui/react";
import React from "react";

export function FormExample() {
  const [value, setValue] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const MIN_LENGTH = 3;
  const isInvalid = value.length > 0 && value.length < MIN_LENGTH;

  const handleSubmit = (e: React.FormEvent) => {
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
        <Label>搜索产品</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="搜索产品…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        {isInvalid ? (
          <FieldError>搜索内容至少需要 {MIN_LENGTH} 个字符</FieldError>
        ) : (
          <Description>请输入至少 {MIN_LENGTH} 个字符后再搜索</Description>
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
            搜索中…
          </>
        ) : (
          "搜索"
        )}
      </Button>
    </Form>
  );
}

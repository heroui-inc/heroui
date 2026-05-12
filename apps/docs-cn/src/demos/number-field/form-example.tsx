"use client";

import {Button, Description, FieldError, Form, Label, NumberField, Spinner} from "@heroui/react";
import React from "react";

export function FormExample() {
  const [value, setValue] = React.useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const STOCK_AVAILABLE = 3;
  const isOutOfStock = value !== undefined && value > STOCK_AVAILABLE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (value === undefined || value === null || value < 1 || value > STOCK_AVAILABLE) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Order submitted:", {quantity: value});
      setValue(undefined);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
      <NumberField
        isRequired
        isInvalid={isOutOfStock}
        maxValue={5}
        minValue={1}
        name="quantity"
        value={value}
        onChange={setValue}
      >
        <Label>Order quantity</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        {isOutOfStock ? (
          <FieldError>Only {STOCK_AVAILABLE} items left in stock</FieldError>
        ) : (
          <Description>Only {STOCK_AVAILABLE} items available</Description>
        )}
      </NumberField>
      <Button
        className="w-full"
        isDisabled={value === undefined || value < 1 || value > STOCK_AVAILABLE}
        isPending={isSubmitting}
        type="submit"
        variant="primary"
      >
        {isSubmitting ? (
          <>
            <Spinner color="current" size="sm" />
            Processing...
          </>
        ) : (
          "Place Order"
        )}
      </Button>
    </Form>
  );
}

import {Description, Label, NumberField} from "@heroui/react";

export function WithFormatOptions() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField
        defaultValue={99}
        minValue={0}
        name="currency-eur"
        formatOptions={{
          currency: "EUR",
          currencySign: "accounting",
          style: "currency",
        }}
      >
        <Label>Currency (EUR - Accounting)</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Accounting format with EUR currency</Description>
      </NumberField>
      <NumberField
        defaultValue={99.99}
        minValue={0}
        name="currency-usd"
        formatOptions={{
          currency: "USD",
          style: "currency",
        }}
      >
        <Label>Currency (USD)</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Standard USD currency format</Description>
      </NumberField>
      <NumberField
        defaultValue={0.5}
        formatOptions={{style: "percent"}}
        maxValue={1}
        minValue={0}
        name="percentage"
        step={0.01}
      >
        <Label>Percentage</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Percentage format (0-1, where 0.5 = 50%)</Description>
      </NumberField>
      <NumberField
        defaultValue={1234.56}
        minValue={0}
        name="decimal"
        formatOptions={{
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
          style: "decimal",
        }}
      >
        <Label>Decimal (2 decimal places)</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Decimal format with 2 decimal places</Description>
      </NumberField>
      <NumberField
        defaultValue={1000}
        minValue={0}
        name="unit"
        formatOptions={{
          style: "unit",
          unit: "kilogram",
          unitDisplay: "short",
        }}
      >
        <Label>Unit (Kilograms)</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Unit format with kilograms</Description>
      </NumberField>
    </div>
  );
}

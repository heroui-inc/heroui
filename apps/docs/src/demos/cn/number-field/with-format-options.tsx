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
        <Label>货币（EUR - 会计格式）</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>欧元会计记账格式</Description>
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
        <Label>货币（USD）</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>标准美元货币格式</Description>
      </NumberField>
      <NumberField
        defaultValue={0.5}
        formatOptions={{style: "percent"}}
        maxValue={1}
        minValue={0}
        name="percentage"
        step={0.01}
      >
        <Label>百分比</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>百分比格式（0–1，0.5 表示 50%）</Description>
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
        <Label>小数（保留 2 位）</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>保留 2 位小数格式</Description>
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
        <Label>单位（千克）</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>千克单位格式</Description>
      </NumberField>
    </div>
  );
}

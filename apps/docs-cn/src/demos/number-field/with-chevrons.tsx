import {Label, NumberField} from "@heroui/react";

export function WithChevrons() {
  return (
    <NumberField
      className="w-full max-w-64"
      defaultValue={99}
      minValue={0}
      name="amount"
      formatOptions={{
        currency: "EUR",
        currencySign: "accounting",
        style: "currency",
      }}
    >
      <Label>Number field with chevrons</Label>
      <NumberField.Group>
        <NumberField.Input />
        <div className="flex h-[calc(100%+2px)] flex-col border-l border-field-placeholder/15">
          <NumberField.IncrementButton className="-ml-px flex h-1/2 w-6 flex-1 rounded-none border-r-0 border-l-0 pt-0.5 text-sm">
            <svg
              aria-hidden="true"
              height="11"
              viewBox="0 0 16 16"
              width="11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M13.03 10.53a.75.75 0 0 1-1.06 0L8 6.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </NumberField.IncrementButton>
          <NumberField.DecrementButton className="-ml-px flex h-1/2 w-6 flex-1 rounded-none border-r-0 border-l-0 pb-0.5 text-sm">
            <svg
              aria-hidden="true"
              height="11"
              viewBox="0 0 16 16"
              width="11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </NumberField.DecrementButton>
        </div>
      </NumberField.Group>
    </NumberField>
  );
}

"use client";

import {Fieldset, TextField} from "@heroui/react";

export function Layout() {
  return (
    <Fieldset className="w-full max-w-2xl">
      <Fieldset.Legend>Billing Details</Fieldset.Legend>
      <Fieldset.Group className="grid gap-4 md:grid-cols-2">
        <TextField>
          <TextField.Label>First name</TextField.Label>
          <TextField.Input placeholder="Jane" />
        </TextField>
        <TextField>
          <TextField.Label>Last name</TextField.Label>
          <TextField.Input placeholder="Doe" />
        </TextField>
        <TextField className="md:col-span-2">
          <TextField.Label>Company name</TextField.Label>
          <TextField.Input placeholder="Acme Inc." />
        </TextField>
        <TextField className="md:col-span-2">
          <TextField.Label>Address</TextField.Label>
          <TextField.TextArea placeholder="123 Main St, Springfield" rows={3} />
        </TextField>
        <TextField>
          <TextField.Label>City</TextField.Label>
          <TextField.Input placeholder="Springfield" />
        </TextField>
        <TextField>
          <TextField.Label>Postal code</TextField.Label>
          <TextField.Input placeholder="12345" />
        </TextField>
      </Fieldset.Group>
      <Fieldset.Actions className="text-default-500 justify-end text-sm">
        Provide a company address if you need VAT-compliant invoices.
      </Fieldset.Actions>
    </Fieldset>
  );
}

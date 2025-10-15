"use client";

import {Fieldset, Input, Label, TextArea, TextField} from "@heroui/react";

export function Layout() {
  return (
    <Fieldset className="w-full max-w-2xl">
      <Fieldset.Legend>Billing Details</Fieldset.Legend>
      <Fieldset.Group className="grid gap-4 md:grid-cols-2">
        <TextField>
          <Label>First name</Label>
          <Input placeholder="Jane" />
        </TextField>
        <TextField>
          <Label>Last name</Label>
          <Input placeholder="Doe" />
        </TextField>
        <TextField className="md:col-span-2">
          <Label>Company name</Label>
          <Input placeholder="Acme Inc." />
        </TextField>
        <TextField className="md:col-span-2">
          <Label>Address</Label>
          <TextArea placeholder="123 Main St, Springfield" rows={3} />
        </TextField>
        <TextField>
          <Label>City</Label>
          <Input placeholder="Springfield" />
        </TextField>
        <TextField>
          <Label>Postal code</Label>
          <Input placeholder="12345" />
        </TextField>
      </Fieldset.Group>
      <Fieldset.Actions className="text-default-500 justify-end text-sm">
        Provide a company address if you need VAT-compliant invoices.
      </Fieldset.Actions>
    </Fieldset>
  );
}

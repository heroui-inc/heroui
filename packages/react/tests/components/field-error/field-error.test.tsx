import {render, screen} from "@heroui/testing/helpers";

import {FieldError} from "@/components/field-error";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {TextField} from "@/components/textfield";

describe("FieldError", () => {
  it("renders with data-slot and BEM when the field is invalid", () => {
    render(
      <TextField isInvalid name="email">
        <Label>Email</Label>
        <Input />
        <FieldError>Enter a valid email</FieldError>
      </TextField>,
    );

    const error = document.querySelector('[data-slot="field-error"]');

    expect(error).not.toBeNull();
    expect(error?.className).toEqual(expect.stringContaining("field-error"));
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  it("renders nothing when the field is valid", () => {
    render(
      <TextField name="email">
        <Label>Email</Label>
        <Input />
        <FieldError>Enter a valid email</FieldError>
      </TextField>,
    );

    expect(screen.queryByText("Enter a valid email")).toBeNull();
    expect(document.querySelector('[data-slot="field-error"]')).toBeNull();
  });

  it("supports render props when invalid", () => {
    render(
      <TextField isInvalid name="email">
        <Label>Email</Label>
        <Input />
        <FieldError>{({isInvalid}) => (isInvalid ? "Rendered via props" : null)}</FieldError>
      </TextField>,
    );

    expect(screen.getByText("Rendered via props")).toBeInTheDocument();
  });
});

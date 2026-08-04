import type {FormEvent} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Button} from "@/components/button";
import {FieldError} from "@/components/field-error";
import {Form} from "@/components/form";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {TextField} from "@/components/textfield";

describe("Form", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders a form element that nests fields", () => {
    render(
      <Form aria-label="Profile">
        <TextField name="name">
          <Label>Your name</Label>
          <Input />
        </TextField>
      </Form>,
    );

    expect(screen.getByRole("form", {name: "Profile"})).toBeInTheDocument();
    expect(screen.getByRole("textbox", {name: "Your name"})).toBeInTheDocument();
  });

  it("calls onSubmit with form data", async () => {
    const onSubmit = vi.fn((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    });

    render(
      <Form aria-label="Profile" onSubmit={onSubmit}>
        <TextField defaultValue="Ada" name="name">
          <Label>Your name</Label>
          <Input />
        </TextField>
        <Button type="submit">Save</Button>
      </Form>,
    );

    await user.click(screen.getByRole("button", {name: "Save"}));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders validationErrors on nested FieldError", () => {
    render(
      <Form aria-label="Profile" validationErrors={{name: "Name is required"}}>
        <TextField name="name">
          <Label>Your name</Label>
          <Input />
          <FieldError />
        </TextField>
      </Form>,
    );

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="field-error"]')).not.toBeNull();
  });
});

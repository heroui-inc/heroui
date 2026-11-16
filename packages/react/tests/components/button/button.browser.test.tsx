import type {FormEvent} from "react";

import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {Button} from "@/components/button";
import {Form} from "@/components/form";

// Real keyboard activation of a submit button differs from jsdom: the browser fires the native
// click on Enter keydown and on Space keyup, and that click submits the form.
const renderSubmitForm = async () => {
  const events: string[] = [];
  const onPress = vi.fn();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    events.push("submit");
  };

  await render(
    <Form onSubmit={onSubmit}>
      <Button type="submit" onClick={() => events.push("click")} onPress={onPress}>
        Submit
      </Button>
    </Form>,
  );

  return {button: page.getByRole("button", {name: "Submit"}), events, onPress};
};

describe("Button (browser)", () => {
  describe("form submission", () => {
    it("calls onClick once before submit on mouse click", async () => {
      const {button, events, onPress} = await renderSubmitForm();

      await button.click();

      await expect.poll(() => events).toEqual(["click", "submit"]);
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("calls onClick once before submit on Enter", async () => {
      const {button, events, onPress} = await renderSubmitForm();

      (button.element() as HTMLElement).focus();
      await userEvent.keyboard("{Enter}");

      await expect.poll(() => events).toEqual(["click", "submit"]);
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("calls onClick once before submit on Space", async () => {
      const {button, events} = await renderSubmitForm();

      (button.element() as HTMLElement).focus();
      await userEvent.keyboard(" ");

      await expect.poll(() => events).toEqual(["click", "submit"]);
    });

    it("calls onClick once without submitting when the activation key is prevented", async () => {
      const events: string[] = [];
      const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        events.push("submit");
      };

      await render(
        <Form onSubmit={onSubmit}>
          <Button
            type="submit"
            onClick={() => events.push("click")}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            onKeyUp={(e) => {
              if (e.key === " ") e.preventDefault();
            }}
          >
            Submit
          </Button>
        </Form>,
      );
      const button = page.getByRole("button", {name: "Submit"});

      (button.element() as HTMLElement).focus();
      await userEvent.keyboard("{Enter}");
      await expect.poll(() => events).toEqual(["click"]);

      await userEvent.keyboard(" ");
      await expect.poll(() => events).toEqual(["click", "click"]);
    });

    it("calls onClick once for a mouse click after keyboard activation", async () => {
      const {button, events} = await renderSubmitForm();

      (button.element() as HTMLElement).focus();
      await userEvent.keyboard("{Enter}");
      await button.click();

      await expect.poll(() => events).toEqual(["click", "submit", "click", "submit"]);
    });
  });
});

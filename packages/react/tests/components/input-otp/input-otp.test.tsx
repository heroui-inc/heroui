import type {InputOTPProps} from "@/components/input-otp";

import {cleanup, render, screen, setupUser} from "@heroui/testing/helpers";

import {FieldError} from "@/components/field-error";
import {InputOTP} from "@/components/input-otp";

const renderOtp = (props: Omit<Partial<InputOTPProps>, "children"> = {}) => {
  return render(
    <InputOTP maxLength={6} {...props}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>,
  );
};

describe("InputOTP", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  afterEach(() => {
    // Unmount before jsdom tears down `window` (pending rAF/timeout).
    cleanup();
  });

  it("exposes root and compound data-slots", () => {
    renderOtp();

    expect(document.querySelector('[data-slot="input-otp"]')).not.toBeNull();
    expect(document.querySelectorAll('[data-slot="input-otp-group"]')).toHaveLength(2);
    expect(document.querySelectorAll('[data-slot="input-otp-slot"]')).toHaveLength(6);
    expect(document.querySelector('[data-slot="input-otp-separator"]')).not.toBeNull();
  });

  it("exposes BEM block on the container", () => {
    renderOtp();

    const container = document.querySelector('[data-input-otp-container="true"]');

    expect(container?.className).toEqual(expect.stringContaining("input-otp"));
  });

  it("calls onChange while typing digits", async () => {
    const onChange = vi.fn();

    renderOtp({onChange});

    const input = document.querySelector('[data-slot="input-otp"]') as HTMLInputElement;

    expect(input).not.toBeNull();
    await user.click(input);
    await user.keyboard("12");

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls.at(-1)?.[0]).toBe("12");
  });

  it("calls onComplete when maxLength is reached", async () => {
    const onComplete = vi.fn();

    renderOtp({maxLength: 4, onComplete});

    const input = document.querySelector('[data-slot="input-otp"]') as HTMLInputElement;

    await user.click(input);
    await user.keyboard("1234");

    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("supports disabled state", async () => {
    const onChange = vi.fn();

    renderOtp({isDisabled: true, onChange});

    const input = document.querySelector('[data-slot="input-otp"]') as HTMLInputElement;

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("data-disabled", "true");

    await user.click(input);
    await user.keyboard("1");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports invalid state with FieldError", () => {
    render(
      <InputOTP isInvalid maxLength={6} validationErrors={["Invalid code"]}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
        <FieldError>Invalid code</FieldError>
      </InputOTP>,
    );

    const root = document.querySelector('[data-slot="input-otp"]');

    expect(root).toHaveAttribute("data-invalid", "true");
    expect(document.querySelector('[data-slot="input-otp-slot"]')).toHaveAttribute(
      "data-invalid",
      "true",
    );
    expect(screen.getByText("Invalid code")).toBeInTheDocument();
  });

  it("supports filling slots from paste", async () => {
    const onChange = vi.fn();

    renderOtp({onChange});

    const input = document.querySelector('[data-slot="input-otp"]') as HTMLInputElement;

    await user.click(input);
    await user.paste("654321");

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls.at(-1)?.[0]).toBe("654321");
    expect(document.querySelectorAll('[data-filled="true"]')).toHaveLength(6);
  });
});

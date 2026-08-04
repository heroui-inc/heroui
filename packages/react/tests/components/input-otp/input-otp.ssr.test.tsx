import {ssrSmoke} from "@heroui/testing/helpers";

import {InputOTP} from "@/components/input-otp";

describe("InputOTP SSR", () => {
  it("renders without hydration mismatch with grouped slots", async () => {
    const {html} = await ssrSmoke(
      <InputOTP maxLength={6}>
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

    expect(html).toContain('data-slot="input-otp"');
    expect(html).toContain('data-slot="input-otp-slot"');
  });
});

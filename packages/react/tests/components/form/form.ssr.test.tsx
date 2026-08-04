import {ssrSmoke} from "@heroui/testing/helpers";

import {Form} from "@/components/form";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {TextField} from "@/components/textfield";

describe("Form SSR", () => {
  it("renders without hydration mismatch with a nested TextField", async () => {
    const {html} = await ssrSmoke(
      <Form aria-label="Profile">
        <TextField defaultValue="Ada" name="name">
          <Label>Your name</Label>
          <Input />
        </TextField>
      </Form>,
    );

    expect(html).toContain("<form");
    expect(html).toContain('data-slot="textfield"');
  });
});

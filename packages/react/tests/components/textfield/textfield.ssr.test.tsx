import {ssrSmoke} from "@heroui/testing/helpers";

import {Description} from "@/components/description";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {TextField} from "@/components/textfield";

describe("TextField SSR", () => {
  it("renders without hydration mismatch with Label, Input, and Description", async () => {
    const {html} = await ssrSmoke(
      <TextField defaultValue="Ada" name="name">
        <Label>Your name</Label>
        <Input placeholder="John" />
        <Description>Visible to other users</Description>
      </TextField>,
    );

    expect(html).toContain('data-slot="textfield"');
    expect(html).toContain('data-slot="input"');
    expect(html).toContain('data-slot="description"');
  });
});

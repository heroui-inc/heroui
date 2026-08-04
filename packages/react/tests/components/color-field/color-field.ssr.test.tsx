import {ssrSmoke} from "@heroui/testing/helpers";

import {ColorField} from "@/components/color-field";
import {Label} from "@/components/label";
import {parseColor} from "@/components/rac";

describe("ColorField SSR", () => {
  it("renders without hydration mismatch with a fixed color value", async () => {
    const {html} = await ssrSmoke(
      <ColorField defaultValue={parseColor("#0485F7")} name="color">
        <Label>Color</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>,
    );

    expect(html).toContain('data-slot="color-field"');
    expect(html).toContain("#0485F7");
  });
});

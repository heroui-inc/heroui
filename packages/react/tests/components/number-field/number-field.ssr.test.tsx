import {ssrSmoke} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {NumberField} from "@/components/number-field";

describe("NumberField SSR", () => {
  it("renders without hydration mismatch with a default value", async () => {
    const {html} = await ssrSmoke(
      <NumberField defaultValue={10} minValue={0} name="width">
        <Label>Width</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input />
          <NumberField.IncrementButton />
        </NumberField.Group>
      </NumberField>,
    );

    expect(html).toContain('data-slot="number-field"');
    expect(html).toContain('data-slot="number-field-input"');
  });
});

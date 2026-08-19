import {ssrSmoke} from "@heroui/testing/helpers";

import {Checkbox} from "@/components/checkbox";
import {Label} from "@/components/label";

describe("Checkbox SSR", () => {
  it("renders without hydration mismatch when defaultSelected", async () => {
    const {html} = await ssrSmoke(
      <Checkbox defaultSelected>
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Accept terms</Label>
        </Checkbox.Content>
      </Checkbox>,
    );

    expect(html).toContain('data-slot="checkbox"');
    expect(html).toContain('data-selected="true"');
  });
});

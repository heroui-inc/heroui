import {ssrSmoke} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {Switch} from "@/components/switch";

describe("Switch SSR", () => {
  it("renders without hydration mismatch when defaultSelected", async () => {
    const {html} = await ssrSmoke(
      <Switch defaultSelected>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Enable notifications</Label>
        </Switch.Content>
      </Switch>,
    );

    expect(html).toContain('data-slot="switch"');
    expect(html).toContain('data-selected="true"');
  });
});

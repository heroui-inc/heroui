import {ssrSmoke} from "@heroui/testing/helpers";

import {Button} from "@/components/button";
import {Tooltip} from "@/components/tooltip";

describe("Tooltip SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(
      <Tooltip delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content>Hover tip</Tooltip.Content>
      </Tooltip>,
    );
  });

  it("renders without hydration mismatch when defaultOpen with an arrow", async () => {
    await ssrSmoke(
      <Tooltip defaultOpen delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          Hover tip
        </Tooltip.Content>
      </Tooltip>,
    );
  });
});

import {ssrSmoke} from "@heroui/testing/helpers";

import {Skeleton} from "@/components/skeleton";

describe("Skeleton SSR", () => {
  it("renders without hydration mismatch with default props", async () => {
    await ssrSmoke(<Skeleton data-testid="skeleton" />);
  });

  it("renders without hydration mismatch with an explicit animationType", async () => {
    await ssrSmoke(<Skeleton animationType="pulse" data-testid="skeleton" />);
  });
});

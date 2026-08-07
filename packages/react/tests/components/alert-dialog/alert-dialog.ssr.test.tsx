import {ssrSmoke} from "@heroui/testing/helpers";

import {AlertDialogFixture} from "./fixtures";

describe("AlertDialog SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<AlertDialogFixture />);
  });

  it("renders without hydration mismatch when defaultOpen", async () => {
    await ssrSmoke(<AlertDialogFixture defaultOpen />);
  });
});

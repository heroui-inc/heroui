import {ssrSmoke} from "@heroui/testing/helpers";

import {RatingFixture} from "./fixtures";

describe("Agent bridge SSR", () => {
  it("renders a component registered with useAgentComponent on the server", async () => {
    await ssrSmoke(<RatingFixture />);
  });
});

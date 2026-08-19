import {ssrSmoke} from "@heroui/testing/helpers";

import {Spinner} from "@/components/spinner";

describe("Spinner SSR", () => {
  it("renders without hydration mismatch with default props", async () => {
    const {html} = await ssrSmoke(<Spinner />);

    expect(html).toMatch(/url\(#|<linearGradient/);
  });

  it("renders without hydration mismatch with color and size variants", async () => {
    const {html} = await ssrSmoke(<Spinner color="danger" size="lg" />);

    expect(html).toMatch(/url\(#|<linearGradient/);
  });
});

import * as React from "react";
import {render} from "@testing-library/react";

import {Carousel} from "../src";

describe("Carousel", () => {
  it("should render correctly", () => {
    const wrapper = render(<Carousel />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Carousel ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});

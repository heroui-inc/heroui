import React from "react";
import {renderToStaticMarkup} from "react-dom/server";

import {useIsMounted} from "../src";

function Example() {
  const [isMountedFn] = useIsMounted({rerender: true});

  return <p>{isMountedFn() ? "mounted" : "not mounted"}</p>;
}

describe("useIsMounted", () => {
  it("should export a function", () => {
    expect(useIsMounted).toBeInstanceOf(Function);
  });

  it("should return false before mount (default)", () => {
    const text = renderToStaticMarkup(<Example />);

    expect(text).toBe("<p>not mounted</p>");
  });

  it("should return false before mount (beforePaint)", () => {
    const text = renderToStaticMarkup(<Example />);

    expect(text).toBe("<p>not mounted</p>");
  });
});

import * as React from "react";
import {render, act, fireEvent, waitFor} from "@testing-library/react";

import {Image} from "../src";

const src = "https://via.placeholder.com/300x450";
const fallbackSrc = "https://via.placeholder.com/300x450";
const loadingSrc = "/images/local-image-small.jpg";

describe("Image", () => {
  it("should render correctly", () => {
    const wrapper = render(<Image />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLImageElement>();

    render(<Image ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  test("creates an instance of Image when mounted", () => {
    const wrapper = render(<Image fallbackSrc={fallbackSrc} src={src} />);

    expect(wrapper.getByRole("img")).toBeInstanceOf(HTMLImageElement);
  });

  test("renders loading source while loading the image.", async () => {
    const wrapper = render(<Image loadingSrc={loadingSrc} src={src} />);
    const imageParent = wrapper.getByRole("img").parentElement;

    expect(imageParent?.getAttribute("data-testid")).toEqual("heroUI/image_parent");

    const computedStyle = window.getComputedStyle(imageParent!);

    expect(computedStyle.backgroundImage).toBe(`url(${loadingSrc})`);
  });

  test("renders fallback source if src is wrong or not found.", async () => {
    const onError = jest.fn();
    const wrapper = render(
      <Image alt="test" fallbackSrc={fallbackSrc} src="wrong-src-address" onError={onError} />,
    );
    const imageParent = wrapper.getByRole("img").parentElement;

    fireEvent.error(wrapper.getByRole("img"));
    await waitFor(() => expect(onError).toHaveBeenCalled(), {timeout: 5_000});
    expect(imageParent?.getAttribute("data-testid")).toEqual("heroUI/image_parent");

    const computedStyle = window.getComputedStyle(imageParent!);

    expect(computedStyle.backgroundImage).toBe(`url(${fallbackSrc})`);
  }, 6_000);

  test("renders image if there is no loading or fallback behavior defined", async () => {
    const wrapper = render(<Image src={src} />);

    expect(wrapper.getByRole("img")).toHaveAttribute("src", src);
  });

  test("should render a wrapper when isZoomed or isBlurred is true", () => {
    const wrapper = render(<Image isBlurred isZoomed src={src} />);

    expect(wrapper.getByRole("img").parentElement).toBeInstanceOf(HTMLDivElement);
  });

  test("should render a blurred image when isBlurred is true", () => {
    const wrapper = render(<Image isBlurred src={src} />);
    const blurredImage = wrapper.getByRole("img").nextElementSibling;

    expect(blurredImage).toBeInstanceOf(HTMLImageElement);
  });

  test("should fire onload", () => {
    let imageOnload: any = null;

    function trackImageOnload() {
      Object.defineProperty(window.Image.prototype, "onload", {
        get() {
          return this._onload;
        },
        set(fn) {
          imageOnload = fn;
          this._onload = fn;
        },
      });
    }

    trackImageOnload();

    const onLoad = jest.fn();

    const wrapper = render(<Image fallbackSrc={fallbackSrc} src={src} onLoad={onLoad} />);

    act(() => {
      imageOnload();
    });

    expect(wrapper.getByRole("img")).toHaveAttribute("src", src);
    expect(onLoad).toHaveBeenCalled();
  });

  test("should disable aspect ratio if height is set", () => {
    const wrapper = render(
      <>
        <Image height={30} src={src} />
        <Image height={"40px"} src={src} />
        <Image height={50} src={src} width={50} />
        <Image height={"60px"} src={src} width={50} />
      </>,
    );

    const images = wrapper.getAllByRole("img");

    expect(images).toHaveLength(4);

    expect(getComputedStyle(images[0]).height).toBe("30px");
    expect(getComputedStyle(images[1]).height).toBe("40px");
    expect(getComputedStyle(images[2]).height).toBe("50px");
    expect(getComputedStyle(images[3]).height).toBe("60px");
  });
});

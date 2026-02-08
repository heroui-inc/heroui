import React from "react";
import {render, screen} from "@testing-library/react";

import {extendVariants} from "../src/extend-variants";
// import {Button} from "../test-utils/extend-components";
// import {Card} from "../test-utils/slots-component";
import {Link, Button, Card, CardHeader, CardBody, CardFooter} from "../../react/src";

const BaseButton = extendVariants(Button, {
  variants: {
    isScalable: {
      true: "scale-125",
      false: "",
    },
    size: {
      xl: "size--xl",
      "2xl": "size--2xl",
    },
    mySize: {
      lg: "px-12 py-6 text-lg",
      xl: "px-12 py-6 text-xl",
    },
  },
  defaultVariants: {
    size: "xl",
  },
  compoundVariants: [
    {
      isScalable: true,
      size: "2xl",
      class: "scale-150",
    },
  ],
});

const BaseCard = extendVariants(Card, {
  slots: {
    base: "",
    header: "",
    body: "",
    footer: "",
  },
  variants: {
    variant: {
      flat: "",
      filled: "",
      test: "",
    },
    shadow: {
      none: {
        base: "shadow-xs",
      },
      sm: {
        base: "shadow-xs",
      },
      xl: {
        base: "shadow-xl",
      },
    },
    radius: {
      none: {
        base: "rounded-xs",
        header: "rounded-xs",
        footer: "rounded-xs",
      },
      sm: {
        base: "rounded-sm",
        header: "rounded-t-sm",
        footer: "rounded-b-sm",
      },
      xl: {
        base: "rounded-xl",
        header: "rounded-t-xl",
        footer: "rounded-b-xl",
      },
    },
  },
  defaultVariants: {
    shadow: "xl",
    radius: "xl",
  },
  compoundVariants: [
    {
      shadow: "none",
      radius: "none",
      class: "rounded-sm",
    },
    {
      shadow: "none",
      class: {
        header: "scale-75",
      },
    },
  ],
});

describe("extendVariants function - no slots", () => {
  it("should render correctly", () => {
    const Button2 = BaseButton;
    const wrapper = render(<Button2 disableRipple />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLButtonElement>();
    const Button2 = BaseButton;

    render(<Button2 ref={ref} disableRipple />);
    expect(ref.current).not.toBeNull();
  });

  test("as Link should work", () => {
    const Button2 = BaseButton;

    const {container} = render(
      <Button2 as={Link} href="/sign-in">
        Press me
      </Button2>,
    );

    // Link component from react package - verify it renders
    const link = container.querySelector("a");

    expect(link).toBeInTheDocument();
    expect(screen.getByText("Press me")).toBeInTheDocument();
  });

  test("should render with given text", () => {
    const Button2 = BaseButton;
    const {container} = render(
      <Button2 className="px-3 py-2 rounded-medium hover:opacity-80">Press me</Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveTextContent("Press me");
  });

  test("should override the base styles", () => {
    const Button2 = BaseButton;
    const {container} = render(
      <Button2 className="px-3 py-2 rounded-medium hover:opacity-80">Press me</Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveClass("px-3 py-2 rounded-medium hover:opacity-80");
  });

  test("should have the default variant styles - extended", () => {
    const Button2 = BaseButton;
    const {container} = render(<Button2>Press me</Button2>);

    const button = container.querySelector("button");

    expect(button).toHaveClass("size--xl");
  });

  test("should have the default variant styles - original", () => {
    const Button2 = extendVariants(BaseButton, {
      defaultVariants: {
        size: "sm",
      },
    });

    const {container} = render(<Button2>Press me</Button2>);

    const button = container.querySelector("button");

    expect(button).toHaveClass("px-3 min-w-16 h-8 text-tiny gap-2 rounded-small");
  });

  test("should include the compound variant styles - extended", () => {
    const Button2 = BaseButton;
    const {container} = render(
      <Button2 isScalable size="2xl">
        Press me
      </Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveClass("scale-150");
  });

  test("should include the compound variant styles - original", () => {
    const Button2 = extendVariants(BaseButton, {
      variants: {
        size: {
          custom: "size--custom",
        },
      },
      compoundVariants: [
        {
          isScalable: true,
          size: "custom",
          class: "scale-[custom_scale]",
        },
      ],
    });

    const {container} = render(
      <Button2 isScalable size="custom">
        Press me
      </Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveClass("scale-[custom_scale]");
  });

  test("as prop should work with polymorphic base component", () => {
    const Button2 = BaseButton;
    const {container} = render(
      <Button2 as={Link} href="/test">
        Link Button
      </Button2>,
    );

    const link = container.querySelector("a");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveTextContent("Link Button");
  });

  test("as prop should change rendered element to div", () => {
    const Button2 = BaseButton;
    const {container} = render(<Button2 as="div">Div Button</Button2>);

    const div = container.querySelector("div");

    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent("Div Button");

    // Should not be a button
    const button = container.querySelector("button");

    expect(button).not.toBeInTheDocument();
  });

  test("ref should work with polymorphic component as anchor", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    const Button2 = BaseButton;

    render(
      <Button2 ref={ref} as="a" href="/test">
        Link
      </Button2>,
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current).toHaveAttribute("href", "/test");
  });

  test("variant styles should persist with 'as' prop", () => {
    const Button2 = BaseButton;
    const {container} = render(
      <Button2 isScalable as="a" href="/test" size="2xl">
        Link
      </Button2>,
    );

    const link = container.querySelector("a");

    expect(link).toHaveClass("size--2xl");
    expect(link).toHaveClass("scale-150");
  });

  test("compound variant styles should work with 'as' prop", () => {
    const Button2 = BaseButton;
    const {container} = render(
      <Button2 isScalable as="a" href="/test" size="2xl">
        Link
      </Button2>,
    );

    const link = container.querySelector("a");

    expect(link).toHaveClass("scale-150");
  });

  test("should respect defaultVariants.className", () => {
    const Button2 = extendVariants(BaseButton, {
      defaultVariants: {
        className: "w-full text-medium rounded-small",
        color: "primary",
        variant: "solid",
      },
    });

    const {container} = render(<Button2>Press me</Button2>);
    const button = container.querySelector("button");

    expect(button).toHaveClass("w-full");
    expect(button).toHaveClass("text-medium");
    expect(button).toHaveClass("rounded-small");
  });

  test("should merge defaultVariants.className with props.className", () => {
    const Button2 = extendVariants(BaseButton, {
      defaultVariants: {
        className: "w-full text-medium rounded-small",
        color: "primary",
        variant: "solid",
      },
    });

    const {container} = render(<Button2 className="px-4 py-2">Press me</Button2>);
    const button = container.querySelector("button");

    // Should have both default and props className
    expect(button).toHaveClass("w-full");
    expect(button).toHaveClass("text-medium");
    expect(button).toHaveClass("rounded-small");
    expect(button).toHaveClass("px-4");
    expect(button).toHaveClass("py-2");
  });
});

describe("extendVariants function - with slots", () => {
  it("should render correctly", () => {
    const Card2 = BaseCard;
    const wrapper = render(<Card2 />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();
    const Card2 = BaseCard;

    render(<Card2 ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  test("should render with given text", () => {
    const Card2 = BaseCard;

    render(<Card2>Card Content</Card2>);

    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  test("should override the base styles", () => {
    const Card2 = BaseCard;
    const {container} = render(
      <Card2 className="px-3 py-2 rounded-medium hover:opacity-80">Card Content</Card2>,
    );

    const card = container.querySelector("div");

    expect(card).toHaveClass("px-3 py-2 rounded-medium hover:opacity-80");
  });

  test("should have the default variant styles - (base slot) extended", () => {
    const Card2 = BaseCard;
    const {getByTestId} = render(<Card2 data-testid="base">Card Content</Card2>);

    const baseEl = getByTestId("base");

    expect(baseEl).toHaveClass("shadow-xl");
  });

  test("should have all slots styles", () => {
    const Card2 = BaseCard;
    const {getByTestId} = render(
      <Card2 data-testid="base">
        <CardHeader data-testid="header">Header</CardHeader>
        <CardBody data-testid="body">Body</CardBody>
        <CardFooter data-testid="footer">Footer</CardFooter>
      </Card2>,
    );

    const baseEl = getByTestId("base");
    const headerEl = getByTestId("header");
    const footerEl = getByTestId("footer");

    // shadow
    expect(baseEl).toHaveClass("shadow-xl");
    expect(headerEl).toHaveClass("rounded-t-xl");
    expect(footerEl).toHaveClass("rounded-b-xl");

    // radius
    expect(baseEl).toHaveClass("rounded-xl");
    expect(headerEl).toHaveClass("rounded-t-xl");
    expect(footerEl).toHaveClass("rounded-b-xl");
  });

  test("should override the slots styles", () => {
    const Card2 = BaseCard;
    const {getByTestId} = render(
      <Card2 classNames={{base: "shadow-xs"}} data-testid="base">
        Card Content
      </Card2>,
    );

    const baseEl = getByTestId("base");

    expect(baseEl).toHaveClass("shadow-xs");
  });

  test("should override all slots styles", () => {
    const Card2 = BaseCard;
    const {getByTestId} = render(
      <Card2 classNames={{base: "shadow-xs", header: "rounded-none"}} data-testid="base">
        <CardHeader data-testid="header">Header</CardHeader>
      </Card2>,
    );

    const baseEl = getByTestId("base");
    const headerEl = getByTestId("header");

    expect(baseEl).toHaveClass("shadow-xs");
    expect(headerEl).toHaveClass("rounded-none");
  });

  test("should include the compound variant styles - extended", () => {
    const Card2 = BaseCard;

    const {getByTestId} = render(
      <Card2 data-testid="base" radius="none" shadow="none">
        <CardHeader data-testid="header">Header</CardHeader>
      </Card2>,
    );

    const baseEl = getByTestId("base");
    const headerEl = getByTestId("header");

    expect(baseEl).toHaveClass("rounded-sm");
    expect(headerEl).toHaveClass("scale-75");
  });

  test("should include the compound variant styles - original", () => {
    const Card2 = extendVariants(BaseCard, {
      variants: {
        shadow: {
          test: "",
        },
      },
      compoundVariants: [
        {
          shadow: "test",
          radius: "sm",
          class: "rounded-[test_sm]",
        },
        {
          shadow: "test",
          class: {
            header: "scale-[test]",
          },
        },
      ],
    });

    const {getByTestId} = render(
      <Card2 data-testid="base" radius="sm" shadow="test">
        <CardHeader data-testid="header">Header</CardHeader>
      </Card2>,
    );

    const baseEl = getByTestId("base");
    const headerEl = getByTestId("header");

    expect(baseEl).toHaveClass("rounded-[test_sm]");
    expect(headerEl).toHaveClass("scale-[test]");
  });

  test("should override base component slots with direct slots option", () => {
    const Card2 = extendVariants(BaseCard, {
      slots: {
        header: "!font-bold !text-lg",
        footer: "!bg-red-500",
      },
    });

    const {getByTestId} = render(
      <Card2 data-testid="base">
        <CardHeader data-testid="header">Header</CardHeader>
        <CardFooter data-testid="footer">Footer</CardFooter>
      </Card2>,
    );

    const headerEl = getByTestId("header");
    const footerEl = getByTestId("footer");

    expect(headerEl).toHaveClass("!font-bold");
    expect(headerEl).toHaveClass("!text-lg");
    expect(footerEl).toHaveClass("!bg-red-500");
  });

  test("should merge direct slots with variant-based slots", () => {
    const Card2 = extendVariants(BaseCard, {
      slots: {
        header: "!font-bold",
      },
      variants: {
        shadow: {
          xl: {
            base: "shadow-xl",
          },
        },
      },
      defaultVariants: {
        shadow: "xl",
      },
    });

    const {getByTestId} = render(
      <Card2 data-testid="base">
        <CardHeader data-testid="header">Header</CardHeader>
      </Card2>,
    );

    const baseEl = getByTestId("base");
    const headerEl = getByTestId("header");

    expect(baseEl).toHaveClass("shadow-xl");
    expect(headerEl).toHaveClass("!font-bold");
  });

  test("direct slots should override variant-based slots for the same slot", () => {
    const Card2 = extendVariants(BaseCard, {
      slots: {
        base: "!bg-blue-500",
      },
      variants: {
        shadow: {
          xl: {
            base: "shadow-xl",
          },
        },
      },
      defaultVariants: {
        shadow: "xl",
      },
    });

    const {getByTestId} = render(<Card2 data-testid="base" />);

    const baseEl = getByTestId("base");

    // Direct slots should be applied
    expect(baseEl).toHaveClass("!bg-blue-500");
    // Variant-based slots should also be applied (they merge)
    expect(baseEl).toHaveClass("shadow-xl");
  });
});

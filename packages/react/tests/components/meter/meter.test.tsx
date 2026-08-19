import {render, screen} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {Meter} from "@/components/meter";

describe("Meter", () => {
  it("renders with meter role and accessible name", () => {
    render(
      <Meter value={60}>
        <Label>Storage</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>,
    );

    expect(screen.getByRole("meter", {name: "Storage"})).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(
      <Meter aria-label="Storage" data-testid="meter" value={50}>
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>,
    );
    const meter = screen.getByTestId("meter");

    expect(meter).toHaveAttribute("data-slot", "meter");
    expect(meter.className).toEqual(expect.stringContaining("meter"));
  });

  it("exposes color BEM modifier", () => {
    render(
      <Meter aria-label="Storage" color="danger" data-testid="meter" value={50}>
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>,
    );

    expect(screen.getByTestId("meter").className).toEqual(expect.stringContaining("meter--danger"));
  });

  it("supports data attribute passthrough", () => {
    render(
      <Meter aria-label="Storage" data-foo="bar" data-testid="meter" value={50}>
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>,
    );

    expect(screen.getByTestId("meter")).toHaveAttribute("data-foo", "bar");
  });

  describe("composition", () => {
    it("exposes data-slot on each sub-part", () => {
      render(
        <Meter aria-label="Storage" value={60}>
          <Meter.Output data-testid="output" />
          <Meter.Track data-testid="track">
            <Meter.Fill data-testid="fill" />
          </Meter.Track>
        </Meter>,
      );

      expect(screen.getByTestId("output")).toHaveAttribute("data-slot", "meter-output");
      expect(screen.getByTestId("track")).toHaveAttribute("data-slot", "meter-track");
      expect(screen.getByTestId("fill")).toHaveAttribute("data-slot", "meter-fill");
    });

    it("renders the formatted value text in the output", () => {
      render(
        <Meter aria-label="Storage" value={60}>
          <Meter.Output data-testid="output" />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>,
      );

      expect(screen.getByTestId("output")).toHaveTextContent("60%");
    });
  });
});

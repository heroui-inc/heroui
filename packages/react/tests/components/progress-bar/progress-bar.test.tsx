import {render, screen} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {ProgressBar} from "@/components/progress-bar";

describe("ProgressBar", () => {
  it("renders with progressbar role and accessible name", () => {
    render(
      <ProgressBar value={60}>
        <Label>Loading</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>,
    );

    expect(screen.getByRole("progressbar", {name: "Loading"})).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(
      <ProgressBar aria-label="Loading" data-testid="progress-bar" value={50}>
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>,
    );
    const progressBar = screen.getByTestId("progress-bar");

    expect(progressBar).toHaveAttribute("data-slot", "progress-bar");
    expect(progressBar.className).toEqual(expect.stringContaining("progress-bar"));
  });

  it("exposes color BEM modifier", () => {
    render(
      <ProgressBar aria-label="Loading" color="success" data-testid="progress-bar" value={50}>
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>,
    );

    expect(screen.getByTestId("progress-bar").className).toEqual(
      expect.stringContaining("progress-bar--success"),
    );
  });

  it("supports data attribute passthrough", () => {
    render(
      <ProgressBar aria-label="Loading" data-foo="bar" data-testid="progress-bar" value={50}>
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>,
    );

    expect(screen.getByTestId("progress-bar")).toHaveAttribute("data-foo", "bar");
  });

  it("supports the indeterminate state", () => {
    render(
      <ProgressBar isIndeterminate aria-label="Loading">
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>,
    );

    expect(screen.getByRole("progressbar", {name: "Loading"})).not.toHaveAttribute("aria-valuenow");
  });

  describe("composition", () => {
    it("exposes data-slot on each sub-part", () => {
      render(
        <ProgressBar aria-label="Loading" value={60}>
          <ProgressBar.Output data-testid="output" />
          <ProgressBar.Track data-testid="track">
            <ProgressBar.Fill data-testid="fill" />
          </ProgressBar.Track>
        </ProgressBar>,
      );

      expect(screen.getByTestId("output")).toHaveAttribute("data-slot", "progress-bar-output");
      expect(screen.getByTestId("track")).toHaveAttribute("data-slot", "progress-bar-track");
      expect(screen.getByTestId("fill")).toHaveAttribute("data-slot", "progress-bar-fill");
    });
  });
});

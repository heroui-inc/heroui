import {render, screen} from "@heroui/testing/helpers";

import {ProgressCircle} from "@/components/progress-circle";

describe("ProgressCircle", () => {
  it("renders with progressbar role and accessible name", () => {
    render(
      <ProgressCircle aria-label="Loading" value={60}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>,
    );

    expect(screen.getByRole("progressbar", {name: "Loading"})).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(
      <ProgressCircle aria-label="Loading" data-testid="progress-circle" value={50}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>,
    );
    const progressCircle = screen.getByTestId("progress-circle");

    expect(progressCircle).toHaveAttribute("data-slot", "progress-circle");
    expect(progressCircle.className).toEqual(expect.stringContaining("progress-circle"));
  });

  it("exposes color BEM modifier", () => {
    render(
      <ProgressCircle aria-label="Loading" color="warning" data-testid="progress-circle" value={50}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>,
    );

    expect(screen.getByTestId("progress-circle").className).toEqual(
      expect.stringContaining("progress-circle--warning"),
    );
  });

  it("supports data attribute passthrough", () => {
    render(
      <ProgressCircle aria-label="Loading" data-foo="bar" data-testid="progress-circle" value={50}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>,
    );

    expect(screen.getByTestId("progress-circle")).toHaveAttribute("data-foo", "bar");
  });

  describe("composition", () => {
    it("exposes data-slot on each sub-part", () => {
      render(
        <ProgressCircle aria-label="Loading" value={60}>
          <ProgressCircle.Track data-testid="track">
            <ProgressCircle.TrackCircle data-testid="track-circle" />
            <ProgressCircle.FillCircle data-testid="fill-circle" />
          </ProgressCircle.Track>
        </ProgressCircle>,
      );

      expect(screen.getByTestId("track")).toHaveAttribute("data-slot", "progress-circle-track");
      expect(screen.getByTestId("track-circle")).toHaveAttribute(
        "data-slot",
        "progress-circle-track-circle",
      );
      expect(screen.getByTestId("fill-circle")).toHaveAttribute(
        "data-slot",
        "progress-circle-fill-circle",
      );
    });
  });
});

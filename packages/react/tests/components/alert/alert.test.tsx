import {render, screen} from "@heroui/testing/helpers";

import {Alert} from "@/components/alert";

describe("Alert", () => {
  it("exposes data-slot and BEM block", () => {
    render(
      <Alert>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>New features available</Alert.Title>
          <Alert.Description>Check out our latest updates.</Alert.Description>
        </Alert.Content>
      </Alert>,
    );

    const root = document.querySelector('[data-slot="alert-root"]');

    expect(root).not.toBeNull();
    expect(root?.className).toEqual(expect.stringContaining("alert"));
    expect(document.querySelector('[data-slot="alert-indicator"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="alert-content"]')).not.toBeNull();
    expect(screen.getByText("New features available")).toBeInTheDocument();
    expect(screen.getByText("Check out our latest updates.")).toBeInTheDocument();
  });

  it("exposes default status BEM modifier", () => {
    render(
      <Alert>
        <Alert.Content>
          <Alert.Title>Default</Alert.Title>
        </Alert.Content>
      </Alert>,
    );

    expect(document.querySelector('[data-slot="alert-root"]')?.className).toEqual(
      expect.stringContaining("alert--default"),
    );
  });

  it.each(["accent", "success", "warning", "danger"] as const)(
    "maps status=%s to the matching BEM modifier",
    (status) => {
      render(
        <Alert status={status}>
          <Alert.Content>
            <Alert.Title>Status alert</Alert.Title>
          </Alert.Content>
        </Alert>,
      );

      expect(document.querySelector('[data-slot="alert-root"]')?.className).toEqual(
        expect.stringContaining(`alert--${status}`),
      );
    },
  );

  it("renders a default icon per status when no indicator children are given", () => {
    render(
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Unable to connect</Alert.Title>
        </Alert.Content>
      </Alert>,
    );

    expect(document.querySelector('[data-slot="alert-default-icon"]')).not.toBeNull();
  });

  it("renders custom indicator children instead of the default icon", () => {
    render(
      <Alert status="accent">
        <Alert.Indicator>
          <span data-testid="custom-indicator">Loading…</span>
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title>Processing</Alert.Title>
        </Alert.Content>
      </Alert>,
    );

    expect(screen.getByTestId("custom-indicator")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="alert-default-icon"]')).toBeNull();
  });

  it("renders without a description", () => {
    render(
      <Alert status="success">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Profile updated successfully</Alert.Title>
        </Alert.Content>
      </Alert>,
    );

    expect(screen.getByText("Profile updated successfully")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="alert-description"]')).toBeNull();
  });
});

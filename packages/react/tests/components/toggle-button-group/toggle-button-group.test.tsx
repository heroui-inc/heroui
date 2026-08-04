import {render, screen, setupUser} from "@heroui/testing/helpers";

import {ToggleButton} from "@/components/toggle-button";
import {ToggleButtonGroup} from "@/components/toggle-button-group";

describe("ToggleButtonGroup", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes data-slot and BEM block", () => {
    render(
      <ToggleButtonGroup data-testid="group" selectionMode="multiple">
        <ToggleButton id="bold">Bold</ToggleButton>
      </ToggleButtonGroup>,
    );

    const group = screen.getByTestId("group");

    expect(group).toHaveAttribute("data-slot", "toggle-button-group");
    expect(group.className).toEqual(expect.stringContaining("toggle-button-group"));
  });

  it("renders a Separator with data-slot", () => {
    render(
      <ToggleButtonGroup selectionMode="multiple">
        <ToggleButton id="bold">Bold</ToggleButton>
        <ToggleButton id="italic">
          <ToggleButtonGroup.Separator />
          Italic
        </ToggleButton>
      </ToggleButtonGroup>,
    );

    const separator = document.querySelector('[data-slot="toggle-button-group-separator"]');

    expect(separator).not.toBeNull();
    expect(separator).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes orientation and full-width BEM modifiers", () => {
    render(
      <ToggleButtonGroup
        fullWidth
        data-testid="group"
        orientation="vertical"
        selectionMode="multiple"
      >
        <ToggleButton id="bold">Bold</ToggleButton>
      </ToggleButtonGroup>,
    );

    const group = screen.getByTestId("group");

    expect(group.className).toEqual(expect.stringContaining("toggle-button-group--vertical"));
    expect(group.className).toEqual(expect.stringContaining("toggle-button-group--full-width"));
  });

  it("exposes detached BEM modifier", () => {
    render(
      <ToggleButtonGroup isDetached data-testid="group" selectionMode="multiple">
        <ToggleButton id="bold">Bold</ToggleButton>
      </ToggleButtonGroup>,
    );

    expect(screen.getByTestId("group").className).toEqual(
      expect.stringContaining("toggle-button-group--detached"),
    );
  });

  describe("selectionMode=multiple", () => {
    it("exposes a toolbar role with pressable toggle buttons", async () => {
      const onSelectionChange = vi.fn();

      render(
        <ToggleButtonGroup selectionMode="multiple" onSelectionChange={onSelectionChange}>
          <ToggleButton id="bold">Bold</ToggleButton>
          <ToggleButton id="italic">Italic</ToggleButton>
        </ToggleButtonGroup>,
      );

      const bold = screen.getByRole("button", {name: "Bold"});

      expect(screen.getByRole("toolbar")).toBeInTheDocument();
      expect(bold).toHaveAttribute("aria-pressed", "false");

      await user.click(bold);

      expect(bold).toHaveAttribute("aria-pressed", "true");
      expect(onSelectionChange).toHaveBeenCalledWith(new Set(["bold"]));

      await user.click(screen.getByRole("button", {name: "Italic"}));

      expect(onSelectionChange).toHaveBeenCalledWith(new Set(["bold", "italic"]));
    });

    it("supports defaultSelectedKeys", () => {
      render(
        <ToggleButtonGroup defaultSelectedKeys={["bold"]} selectionMode="multiple">
          <ToggleButton id="bold">Bold</ToggleButton>
          <ToggleButton id="italic">Italic</ToggleButton>
        </ToggleButtonGroup>,
      );

      expect(screen.getByRole("button", {name: "Bold"})).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByRole("button", {name: "Italic"})).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("selectionMode=single", () => {
    it("exposes a radiogroup role with radio-style buttons", async () => {
      const onSelectionChange = vi.fn();

      render(
        <ToggleButtonGroup selectionMode="single" onSelectionChange={onSelectionChange}>
          <ToggleButton id="left">Left</ToggleButton>
          <ToggleButton id="center">Center</ToggleButton>
        </ToggleButtonGroup>,
      );

      expect(screen.getByRole("radiogroup")).toBeInTheDocument();

      const left = screen.getByRole("radio", {name: "Left"});
      const center = screen.getByRole("radio", {name: "Center"});

      expect(left).toHaveAttribute("aria-checked", "false");

      await user.click(left);
      expect(left).toHaveAttribute("aria-checked", "true");
      expect(onSelectionChange).toHaveBeenCalledWith(new Set(["left"]));

      await user.click(center);
      expect(center).toHaveAttribute("aria-checked", "true");
      expect(left).toHaveAttribute("aria-checked", "false");
    });

    it("supports disallowEmptySelection", async () => {
      render(
        <ToggleButtonGroup
          disallowEmptySelection
          defaultSelectedKeys={["left"]}
          selectionMode="single"
        >
          <ToggleButton id="left">Left</ToggleButton>
          <ToggleButton id="center">Center</ToggleButton>
        </ToggleButtonGroup>,
      );

      const left = screen.getByRole("radio", {name: "Left"});

      await user.click(left);

      expect(left).toHaveAttribute("aria-checked", "true");
    });
  });

  it("supports group disabled state on every button", () => {
    render(
      <ToggleButtonGroup isDisabled selectionMode="multiple">
        <ToggleButton id="bold">Bold</ToggleButton>
        <ToggleButton id="italic">Italic</ToggleButton>
      </ToggleButtonGroup>,
    );

    expect(screen.getByRole("button", {name: "Bold"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Italic"})).toBeDisabled();
  });

  it("exposes inherited size on child ToggleButtons", () => {
    render(
      <ToggleButtonGroup selectionMode="multiple" size="lg">
        <ToggleButton id="bold">Bold</ToggleButton>
      </ToggleButtonGroup>,
    );

    expect(screen.getByRole("button", {name: "Bold"}).className).toEqual(
      expect.stringContaining("toggle-button--lg"),
    );
  });
});

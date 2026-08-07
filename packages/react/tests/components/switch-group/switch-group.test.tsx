import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {Switch} from "@/components/switch";
import {SwitchGroup} from "@/components/switch-group";

const GroupedSwitch = ({label}: {label: string}) => {
  return (
    <Switch>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label>{label}</Label>
      </Switch.Content>
    </Switch>
  );
};

describe("SwitchGroup", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes data-slot and BEM block", () => {
    render(
      <SwitchGroup>
        <GroupedSwitch label="Wifi" />
      </SwitchGroup>,
    );

    const group = document.querySelector('[data-slot="switch-group"]');

    expect(group).not.toBeNull();
    expect(group?.className).toEqual(expect.stringContaining("switch-group"));
    expect(document.querySelector('[data-slot="switch-group-items"]')).not.toBeNull();
  });

  it("exposes vertical orientation BEM by default", () => {
    render(
      <SwitchGroup>
        <GroupedSwitch label="Wifi" />
      </SwitchGroup>,
    );

    expect(document.querySelector('[data-slot="switch-group"]')?.className).toEqual(
      expect.stringContaining("switch-group--vertical"),
    );
  });

  it("exposes horizontal orientation BEM", () => {
    render(
      <SwitchGroup orientation="horizontal">
        <GroupedSwitch label="Wifi" />
      </SwitchGroup>,
    );

    expect(document.querySelector('[data-slot="switch-group"]')?.className).toEqual(
      expect.stringContaining("switch-group--horizontal"),
    );
  });

  it("renders children switches", () => {
    render(
      <SwitchGroup>
        <GroupedSwitch label="Wifi" />
        <GroupedSwitch label="Bluetooth" />
      </SwitchGroup>,
    );

    expect(screen.getByRole("switch", {name: "Wifi"})).toBeInTheDocument();
    expect(screen.getByRole("switch", {name: "Bluetooth"})).toBeInTheDocument();
  });

  it("supports independent switch toggles", async () => {
    render(
      <SwitchGroup>
        <GroupedSwitch label="Wifi" />
        <GroupedSwitch label="Bluetooth" />
      </SwitchGroup>,
    );

    const wifi = screen.getByRole("switch", {name: "Wifi"});
    const bluetooth = screen.getByRole("switch", {name: "Bluetooth"});

    await user.click(wifi);

    expect(wifi).toBeChecked();
    expect(bluetooth).not.toBeChecked();
  });
});

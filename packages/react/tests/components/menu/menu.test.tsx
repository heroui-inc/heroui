import type {Key} from "@react-types/shared";

import {User, cleanup, render, runAllTimers, screen} from "@heroui/testing/helpers";
import {MenuTrigger, Popover} from "react-aria-components/Menu";

import {Button} from "@/components/button";
import {Header} from "@/components/header";
import {Label} from "@/components/label";
import {Menu} from "@/components/menu";

import {MenuFixture} from "./fixtures";

const renderMenu = (onAction?: (key: Key) => void) => render(<MenuFixture onAction={onAction} />);

const renderMenuWithSection = (onAction?: (key: Key) => void) => {
  return render(
    <MenuTrigger>
      <Button aria-label="Menu">Actions</Button>
      <Popover>
        <Menu onAction={onAction}>
          <Menu.Section>
            <Header>File</Header>
            <Menu.Item id="new-file" textValue="New file">
              <Label>New file</Label>
            </Menu.Item>
            <Menu.Item id="copy-link" textValue="Copy link">
              <Label>Copy link</Label>
            </Menu.Item>
          </Menu.Section>
        </Menu>
      </Popover>
    </MenuTrigger>,
  );
};

describe("Menu", () => {
  let testUtilUser: User;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    testUtilUser = new User({
      interactionType: "mouse",
      advanceTimer: vi.advanceTimersByTime,
    });
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  it("exposes menu data-slot via Menu tester", async () => {
    renderMenu();

    const tester = testUtilUser.createTester("Menu", {
      root: screen.getByRole("button", {name: "Menu"}),
    });

    expect(tester.getMenu()).toBeNull();

    await tester.open();
    runAllTimers();

    const menu = tester.getMenu();

    expect(menu).not.toBeNull();
    expect(menu).toHaveAttribute("data-slot", "menu");
    expect(menu?.className).toEqual(expect.stringContaining("menu"));
    expect(document.querySelector('[data-slot="menu-item"]')).not.toBeNull();
    expect(tester.getOptions()).toHaveLength(3);
  });

  it("calls onAction when an item is selected", async () => {
    const onAction = vi.fn();

    renderMenu(onAction);

    const tester = testUtilUser.createTester("Menu", {
      root: screen.getByRole("button", {name: "Menu"}),
    });

    await tester.open();
    runAllTimers();

    await tester.toggleOptionSelection({option: "Copy link"});
    runAllTimers();

    expect(onAction.mock.calls[0]?.[0]).toBe("copy-link");
    expect(tester.getMenu()).toBeNull();
  });

  it("supports Escape dismiss without selecting", async () => {
    const onAction = vi.fn();

    renderMenu(onAction);

    const tester = testUtilUser.createTester("Menu", {
      root: screen.getByRole("button", {name: "Menu"}),
    });

    await tester.open();
    runAllTimers();
    expect(tester.getMenu()).not.toBeNull();

    await tester.close();
    runAllTimers();

    expect(tester.getMenu()).toBeNull();
    expect(onAction).not.toHaveBeenCalled();
  });

  it("supports Menu.Section with Header and item action", async () => {
    const onAction = vi.fn();

    renderMenuWithSection(onAction);

    const tester = testUtilUser.createTester("Menu", {
      root: screen.getByRole("button", {name: "Menu"}),
    });

    await tester.open();
    runAllTimers();

    expect(screen.getByText("File")).toBeInTheDocument();
    expect(document.querySelector(".menu-section")).not.toBeNull();

    await tester.toggleOptionSelection({option: "Copy link"});
    runAllTimers();

    expect(onAction.mock.calls[0]?.[0]).toBe("copy-link");
  });
});

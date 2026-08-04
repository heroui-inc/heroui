import {act, cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";

import {Toast, ToastQueue} from "@/components/toast";

describe("Toast", () => {
  let user: ReturnType<typeof setupUser>;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    user = setupUser({advanceTimers: vi.advanceTimersByTime});
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  it("renders nothing until a toast is queued", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    expect(screen.queryByRole("region")).toBeNull();
  });

  it("renders the region with data-slot and an accessible notification count label", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "Saved"});
    });

    const region = screen.getByRole("region");

    expect(region).toHaveAttribute("data-slot", "toast-region");
    expect(region).toHaveAttribute("aria-label", "1 notification.");
  });

  it("renders default children with alertdialog role, title, description, and close button", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({description: "Your changes have been saved.", title: "Saved", variant: "success"});
    });

    const toastEl = screen.getByRole("alertdialog");

    expect(toastEl).toHaveAttribute("data-slot", "toast");
    expect(toastEl).toHaveAttribute("data-frontmost", "true");
    expect(toastEl.className).toEqual(expect.stringContaining("toast--success"));
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="toast-indicator"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="toast-default-icon"]')).not.toBeNull();
    expect(screen.getByRole("button", {name: "Close"})).toBeInTheDocument();
  });

  it("renders no indicator when indicator is null", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({indicator: null, title: "No icon"});
    });

    expect(document.querySelector('[data-slot="toast-indicator"]')).toBeNull();
  });

  it("renders a custom indicator instead of the default icon", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({indicator: <span data-testid="custom-indicator" />, title: "Custom"});
    });

    expect(screen.getByTestId("custom-indicator")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="toast-default-icon"]')).toBeNull();
  });

  it("calls onClose when the close button is pressed", async () => {
    const queue = new ToastQueue();
    const onClose = vi.fn();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "Dismiss me"}, {onClose});
    });

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", {name: "Close"}));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("supports auto-dismiss after the default timeout", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "Auto dismiss"});
    });

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("exposes stacked toasts with newest frontmost and indexed", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "First"});
    });
    act(() => {
      queue.add({title: "Second"});
    });

    const toasts = screen.getAllByRole("alertdialog");

    expect(toasts).toHaveLength(2);

    const frontmost = toasts.find((t) => t.getAttribute("data-frontmost") === "true");

    expect(frontmost).toHaveTextContent("Second");
    expect(screen.getByRole("region")).toHaveAttribute("aria-label", "2 notifications.");
  });

  it("exposes data-hidden on toasts beyond maxVisibleToasts", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider maxVisibleToasts={1} queue={queue} />);

    act(() => {
      queue.add({title: "First"});
    });
    act(() => {
      queue.add({title: "Second"});
    });

    const toasts = screen.getAllByRole("alertdialog");
    const hidden = toasts.find((t) => t.getAttribute("data-hidden") === "true");
    const visible = toasts.find((t) => !t.hasAttribute("data-hidden"));

    expect(hidden).toBeDefined();
    expect(visible).toBeDefined();
    expect(hidden).toHaveTextContent("First");
    expect(visible).toHaveTextContent("Second");
  });

  it("supports custom render children via Toast.Provider function-as-children", () => {
    const queue = new ToastQueue();

    render(
      <Toast.Provider queue={queue}>
        {({toast: toastItem}) => (
          <Toast data-testid="custom-toast" toast={toastItem}>
            <Toast.Content>
              <Toast.Title>Custom layout</Toast.Title>
            </Toast.Content>
          </Toast>
        )}
      </Toast.Provider>,
    );

    act(() => {
      queue.add({title: "ignored"});
    });

    expect(screen.getByTestId("custom-toast")).toBeInTheDocument();
    expect(screen.getByText("Custom layout")).toBeInTheDocument();
  });

  it("exposes placement BEM modifiers on the region and toast", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider placement="top end" queue={queue} />);

    act(() => {
      queue.add({title: "Top end"});
    });

    expect(screen.getByRole("region").className).toEqual(
      expect.stringContaining("toast-region--top-end"),
    );
    expect(screen.getByRole("alertdialog").className).toEqual(
      expect.stringContaining("toast--top-end"),
    );
  });

  it("supports keyboard close of the frontmost toast", async () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "Keyboard close"});
    });

    await user.tab();
    expect(document.activeElement).toHaveAttribute("role", "alertdialog");

    await user.tab();
    expect(screen.getByRole("button", {name: "Close"})).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(screen.queryByRole("alertdialog")).toBeNull();
  });
});

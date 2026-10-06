import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {Toast, ToastQueue} from "@/components/toast";

import "@/styles.css";

const SM_BREAKPOINT = 640;

const renderToastWithAction = () => {
  const queue = new ToastQueue();

  return render(
    <>
      <button
        type="button"
        onClick={() =>
          queue.add(
            {
              actionProps: {children: "Undo"},
              description: "Your draft was saved",
              title: "Saved",
            },
            {timeout: 0},
          )
        }
      >
        Show toast
      </button>
      <Toast.Provider queue={queue} />
    </>,
  );
};

const showToast = async () => {
  await page.getByRole("button", {name: "Show toast"}).click();
  await expect.element(page.getByRole("alertdialog")).toBeInTheDocument();

  return {
    action: page.getByRole("button", {name: "Undo"}).element().getBoundingClientRect(),
    description: page.getByText("Your draft was saved").element().getBoundingClientRect(),
    title: page.getByText("Saved", {exact: true}).element().getBoundingClientRect(),
  };
};

describe("Toast action button (browser)", () => {
  describe("placement", () => {
    it("stacks the action below the description under the sm breakpoint", async () => {
      await page.viewport(SM_BREAKPOINT - 100, 800);
      await renderToastWithAction();

      const {action, description, title} = await showToast();

      expect(action.top).toBeGreaterThanOrEqual(description.bottom);
      // The wrapped action is indented past the indicator so it lines up with the title.
      expect(action.left).toBeCloseTo(title.left, 0);
    });

    // Regression: the action used to switch position at 768px while every other
    // mobile toast style switched at the sm breakpoint, so between the two it
    // rendered stacked but with its stacked top margin stripped by `sm:mt-0`.
    it("keeps the action inline between the sm breakpoint and 768px", async () => {
      await page.viewport(700, 800);
      await renderToastWithAction();

      const {action, description} = await showToast();

      expect(action.left).toBeGreaterThanOrEqual(description.right);
      expect(action.top).toBeLessThan(description.bottom);
    });

    it("keeps the action inline above 768px", async () => {
      await page.viewport(1024, 800);
      await renderToastWithAction();

      const {action, description} = await showToast();

      expect(action.left).toBeGreaterThanOrEqual(description.right);
      expect(action.top).toBeLessThan(description.bottom);
    });
  });
});

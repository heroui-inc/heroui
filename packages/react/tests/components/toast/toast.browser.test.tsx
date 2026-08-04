import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {Toast, ToastQueue} from "@/components/toast";

const renderToastBrowser = () => {
  const queue = new ToastQueue();

  return render(
    <>
      <button
        type="button"
        onClick={() => queue.add({description: "Done", title: "Saved"}, {timeout: 0})}
      >
        Show toast
      </button>
      <Toast.Provider queue={queue} />
    </>,
  );
};

describe("Toast (browser)", () => {
  it("shows a toast in the region and dismisses it via Close", async () => {
    await renderToastBrowser();

    await page.getByRole("button", {name: "Show toast"}).click();

    const toast = page.getByRole("alertdialog");

    await expect.element(toast).toBeInTheDocument();
    await expect.element(page.getByRole("region")).toBeInTheDocument();
    await expect.element(page.getByText("Saved")).toBeInTheDocument();

    await page.getByRole("button", {name: "Close"}).click();

    await expect.element(toast).not.toBeInTheDocument();
  });
});

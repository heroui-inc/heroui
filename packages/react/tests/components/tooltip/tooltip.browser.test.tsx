import {page, userEvent} from "vitest/browser";
import {render} from "vitest-browser-react";

import {Button} from "@/components/button";
import {Tooltip} from "@/components/tooltip";

describe("Tooltip (browser)", () => {
  it("shows content when open and dismisses with Escape", async () => {
    await render(
      <Tooltip defaultOpen delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content>Hover tip</Tooltip.Content>
      </Tooltip>,
    );

    const tooltip = page.getByRole("tooltip");

    await expect.element(tooltip).toBeInTheDocument();
    await expect.element(tooltip).toHaveTextContent("Hover tip");

    await userEvent.keyboard("{Escape}");

    await expect.element(tooltip).not.toBeInTheDocument();
  });
});

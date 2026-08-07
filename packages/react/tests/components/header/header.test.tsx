import {render, screen} from "@heroui/testing/helpers";

import {Header} from "@/components/header";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";

// Header needs a collection ancestor (ListBox.Section).
const renderHeader = (props: {"data-testid"?: string} = {}) =>
  render(
    <ListBox aria-label="File actions">
      <ListBox.Section>
        <Header {...props}>Actions</Header>
        <ListBox.Item id="new-file" textValue="New file">
          <Label>New file</Label>
        </ListBox.Item>
      </ListBox.Section>
    </ListBox>,
  );

describe("Header", () => {
  it("renders the header content within a section", () => {
    renderHeader();

    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    renderHeader();
    const header = screen.getByText("Actions");

    expect(header).toHaveAttribute("data-slot", "header");
    expect(header.className).toEqual(expect.stringContaining("header"));
  });

  it("supports data attribute passthrough", () => {
    renderHeader({"data-testid": "section-header"});

    expect(screen.getByTestId("section-header")).toBeInTheDocument();
  });
});

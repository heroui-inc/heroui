import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Pagination} from "@/components/pagination";

const renderPagination = () =>
  render(
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link isActive>1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>,
  );

describe("Pagination", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes a labelled navigation role with data-slot and BEM block", () => {
    renderPagination();

    const nav = screen.getByRole("navigation", {name: "pagination"});

    expect(nav).toHaveAttribute("data-slot", "pagination");
    expect(nav.className).toEqual(expect.stringContaining("pagination"));
  });

  it("renders a list of items with data-slot", () => {
    renderPagination();

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(document.querySelectorAll('[data-slot="pagination-item"]')).toHaveLength(5);
  });

  it("exposes default md size BEM modifier", () => {
    renderPagination();

    expect(screen.getByRole("navigation").className).toEqual(
      expect.stringContaining("pagination--md"),
    );
  });

  it.each(["sm", "lg"] as const)("maps size=%s to the matching BEM modifier", (size) => {
    render(
      <Pagination size={size}>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Link isActive>1</Pagination.Link>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>,
    );

    expect(screen.getByRole("navigation").className).toEqual(
      expect.stringContaining(`pagination--${size}`),
    );
  });

  it("exposes aria-current and data-active on the active link", () => {
    renderPagination();

    const active = screen.getByRole("button", {name: "1"});

    expect(active).toHaveAttribute("aria-current", "page");
    expect(active).toHaveAttribute("data-active", "true");
    expect(screen.getByRole("button", {name: "2"})).not.toHaveAttribute("aria-current");
  });

  it("renders an aria-hidden ellipsis", () => {
    renderPagination();

    const ellipsis = document.querySelector('[data-slot="pagination-ellipsis"]');

    expect(ellipsis).toHaveAttribute("aria-hidden", "true");
    expect(ellipsis).toHaveTextContent("…");
  });

  it("calls onPress on Previous/Next/Link buttons", async () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    const onSelect = vi.fn();

    render(
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous onPress={onPrevious}>Previous</Pagination.Previous>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link onPress={onSelect}>2</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next onPress={onNext}>Next</Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>,
    );

    await user.click(screen.getByRole("button", {name: "Previous"}));
    await user.click(screen.getByRole("button", {name: "2"}));
    await user.click(screen.getByRole("button", {name: "Next"}));

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("supports disabled Previous/Next without interaction", async () => {
    const onPress = vi.fn();

    render(
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous isDisabled onPress={onPress}>
              Previous
            </Pagination.Previous>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>,
    );

    const previous = screen.getByRole("button", {name: "Previous"});

    expect(previous).toBeDisabled();

    await user.click(previous);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("renders an optional Summary with data-slot", () => {
    render(
      <Pagination>
        <Pagination.Summary>1 to 5 of 10 invoices</Pagination.Summary>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Link isActive>1</Pagination.Link>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>,
    );

    const summary = document.querySelector('[data-slot="pagination-summary"]');

    expect(summary).not.toBeNull();
    expect(summary).toHaveTextContent("1 to 5 of 10 invoices");
  });

  it("supports custom Previous/Next icons", () => {
    render(
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous>
              <Pagination.PreviousIcon>
                <span data-testid="custom-prev-icon" />
              </Pagination.PreviousIcon>
              Back
            </Pagination.Previous>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>,
    );

    expect(screen.getByTestId("custom-prev-icon")).toBeInTheDocument();
  });
});

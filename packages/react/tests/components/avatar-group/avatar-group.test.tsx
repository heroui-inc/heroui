import {render, screen} from "@heroui/testing/helpers";

import {Avatar} from "@/components/avatar";
import {AvatarGroup} from "@/components/avatar-group";

describe("AvatarGroup", () => {
  it("exposes data-slot and BEM block", () => {
    render(
      <AvatarGroup>
        <Avatar>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
      </AvatarGroup>,
    );

    const group = document.querySelector('[data-slot="avatar-group"]');

    expect(group).not.toBeNull();
    expect(group?.className).toEqual(expect.stringContaining("avatar-group"));
    expect(group?.className).toEqual(expect.stringContaining("avatar-group--clip"));
  });

  it('applies overlap="ring" BEM modifier', () => {
    render(
      <AvatarGroup overlap="ring">
        <Avatar>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
      </AvatarGroup>,
    );

    const group = document.querySelector('[data-slot="avatar-group"]');

    expect(group?.className).toEqual(expect.stringContaining("avatar-group--ring"));
    expect(group?.className).not.toEqual(expect.stringContaining("avatar-group--clip"));
  });

  it("without max, renders all avatars and no auto count", () => {
    render(
      <AvatarGroup>
        <Avatar>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>C</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>D</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>E</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>F</Avatar.Fallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("F")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="avatar-group-count"]')).toBeNull();
  });

  it("max truncates extra avatars and auto-appends +N count", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>C</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>D</Avatar.Fallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.queryByText("C")).not.toBeInTheDocument();
    expect(screen.queryByText("D")).not.toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="avatar-group-count"]')).not.toBeNull();
  });

  it("renders an explicit Count child with no max (server-total pattern)", () => {
    render(
      <AvatarGroup size="sm">
        <Avatar>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>C</Avatar.Fallback>
        </Avatar>
        <AvatarGroup.Count>+9</AvatarGroup.Count>
      </AvatarGroup>,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("+9")).toBeInTheDocument();
    expect(document.querySelectorAll('[data-slot="avatar-group-count"]')).toHaveLength(1);
  });

  it("explicit Count suppresses auto count when max is also set", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>C</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>D</Avatar.Fallback>
        </Avatar>
        <AvatarGroup.Count>+99</AvatarGroup.Count>
      </AvatarGroup>,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.queryByText("C")).not.toBeInTheDocument();
    expect(screen.queryByText("D")).not.toBeInTheDocument();
    expect(screen.getByText("+99")).toBeInTheDocument();
    expect(screen.queryByText("+2")).not.toBeInTheDocument();
    expect(document.querySelectorAll('[data-slot="avatar-group-count"]')).toHaveLength(1);
  });

  it("exposes isGrid BEM modifier", () => {
    render(
      <AvatarGroup isGrid>
        <Avatar>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
      </AvatarGroup>,
    );

    const group = document.querySelector('[data-slot="avatar-group"]');

    expect(group?.className).toEqual(expect.stringContaining("avatar-group--grid"));
    // overlap class may still be present; CSS gates crescent with :not(--grid)
    expect(group?.className).toEqual(expect.stringContaining("avatar-group--clip"));
  });

  it("passes size via context to child Avatars", () => {
    render(
      <AvatarGroup size="sm">
        <Avatar data-testid="child-avatar">
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(screen.getByTestId("child-avatar").className).toEqual(
      expect.stringContaining("avatar--sm"),
    );
  });

  it("passes color via context to child Avatar fallbacks", () => {
    render(
      <AvatarGroup color="accent">
        <Avatar>
          <Avatar.Fallback data-testid="child-fallback">A</Avatar.Fallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(screen.getByTestId("child-fallback").className).toEqual(
      expect.stringContaining("avatar__fallback--accent"),
    );
  });

  it('group variant="soft" applies avatar--soft on child', () => {
    render(
      <AvatarGroup variant="soft">
        <Avatar data-testid="child-avatar">
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(screen.getByTestId("child-avatar").className).toEqual(
      expect.stringContaining("avatar--soft"),
    );
  });
});

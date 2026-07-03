import {Avatar, Chip, Table} from "@heroui/react";

const rootClass =
  "gradient-border relative w-full max-w-2xl overflow-hidden rounded-2xl bg-linear-to-b from-neutral-50/95 to-white p-1 shadow-sm [--gradient-border-width:1px] [--gradient-border:linear-gradient(315deg,#e5e5e5_0%,#fafafa_50%,#c4c4c4_100%)] dark:from-neutral-900/95 dark:to-neutral-950 dark:[--gradient-border:linear-gradient(315deg,#404040_0%,#262626_50%,#525252_100%)]";

const headerClass =
  "border-b border-separator/40 bg-linear-to-r from-neutral-100/95 via-neutral-50/90 to-neutral-100/95 dark:from-neutral-800/95 dark:via-neutral-900/90 dark:to-neutral-800/95";

const headerCell =
  "border-b-0 bg-transparent py-3 text-xs font-semibold tracking-wide text-muted uppercase first:rounded-tl-xl first:pl-5 last:rounded-tr-xl last:pr-5";

const rowClass =
  "border-b border-separator/30 transition-colors last:border-b-0 hover:[&_td]:bg-muted/30 even:[&_td]:bg-muted/15 dark:hover:[&_td]:bg-muted/20 dark:even:[&_td]:bg-muted/10";

const cellClass = "border-b-0! bg-transparent py-3.5 text-muted first:pl-5 last:pr-5";

const nameCell = "border-b-0! bg-transparent py-3.5 first:pl-5 last:pr-5";

const lastRowClass = `${rowClass} [&>td:first-child]:rounded-bl-xl [&>td:last-child]:rounded-br-xl`;

const members = [
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    name: "Kate Moore",
    role: "CEO",
    status: "Active" as const,
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "John Smith",
    role: "CTO",
    status: "Active" as const,
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "Sara Johnson",
    role: "CMO",
    status: "On Leave" as const,
  },
] as const;

const statusColorMap = {
  Active: "success",
  "On Leave": "warning",
} as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function CustomStyles() {
  return (
    <Table className={rootClass} variant="primary">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Team members"
          className="min-w-[600px] overflow-hidden rounded-xl bg-surface"
        >
          <Table.Header className={headerClass}>
            <Table.Column isRowHeader className={headerCell}>
              Name
            </Table.Column>
            <Table.Column className={headerCell}>Role</Table.Column>
            <Table.Column className={headerCell}>Status</Table.Column>
          </Table.Header>
          <Table.Body>
            {members.map((member, index) => (
              <Table.Row
                key={member.name}
                className={index === members.length - 1 ? lastRowClass : rowClass}
              >
                <Table.Cell className={nameCell}>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image alt="" src={member.image} />
                      <Avatar.Fallback>{getInitials(member.name)}</Avatar.Fallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{member.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className={cellClass}>{member.role}</Table.Cell>
                <Table.Cell className={cellClass}>
                  <Chip color={statusColorMap[member.status]} size="sm" variant="soft">
                    {member.status}
                  </Chip>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

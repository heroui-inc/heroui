import {Card, Link} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Default() {
  return (
    <Card className="w-[400px]">
      <Icon
        aria-label="Dollar sign icon"
        className="text-primary size-6"
        icon="gravity-ui:circle-dollar"
        role="img"
      />
      <Card.Header>
        <Card.Title>Become an Acme Creator!</Card.Title>
        <Card.Description>
          Visit the Acme Creator Hub to sign up today and start earning credits from your fans and
          followers.
        </Card.Description>
      </Card.Header>
      <Card.Footer>
        <Link
          aria-label="Go to Acme Creator Hub (opens in new tab)"
          href="https://heroui.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Creator Hub
          <Link.Icon aria-hidden="true" />
        </Link>
      </Card.Footer>
    </Card>
  );
}

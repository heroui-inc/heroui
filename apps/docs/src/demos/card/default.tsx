import {Card, Link} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Default() {
  return (
    <Card.Root className="w-[400px]">
      <Icon
        aria-label="Dollar sign icon"
        className="text-primary size-6"
        icon="gravity-ui:circle-dollar"
        role="img"
      />
      <Card.Header>
        <Card.Title>PAYMENT</Card.Title>
        <Card.Description>You can now withdraw on crypto.</Card.Description>
      </Card.Header>
      <Card.Content id="payment-content">
        <p>Add your wallet in settings to withdraw</p>
      </Card.Content>
      <Card.Footer>
        <Link.Root
          aria-label="Go to settings (opens in new tab)"
          href="https://heroui.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to settings
          <Link.Icon aria-hidden="true" />
        </Link.Root>
      </Card.Footer>
    </Card.Root>
  );
}

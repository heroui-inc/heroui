import {Check, Star} from "@gravity-ui/icons";
import {Button, Card} from "@heroui/react";

const PRO_FEATURES = [
  "Unlimited projects and collaborators",
  "Priority support with 24h response",
  "Advanced analytics and exports",
] as const;

export function CustomStyles() {
  return (
    <Card className="relative w-full max-w-md overflow-hidden border border-accent/20 bg-linear-to-br from-accent/12 via-surface to-surface-secondary shadow-lg shadow-accent/10 dark:border-accent/30 dark:from-accent/20 dark:via-surface dark:to-accent/8 dark:shadow-accent/5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-accent/20 blur-3xl dark:bg-accent/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -left-8 size-28 rounded-full bg-accent/10 blur-2xl dark:bg-accent/20"
      />

      <Card.Header className="relative gap-3">
        <span className="w-fit rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium tracking-wide text-accent dark:bg-accent/25 dark:text-accent-soft-foreground">
          Recommended
        </span>
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent dark:bg-accent/20 dark:text-accent-soft-foreground">
            <Star aria-hidden="true" className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <Card.Title>Upgrade to Pro</Card.Title>
            <Card.Description>
              Unlock team workflows and insights built for growing products.
            </Card.Description>
          </div>
        </div>
      </Card.Header>

      <Card.Content className="relative">
        <ul className="flex flex-col gap-2">
          {PRO_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-muted">
              <Check aria-hidden="true" className="size-4 shrink-0 text-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </Card.Content>

      <Card.Footer className="relative flex-col gap-2 sm:flex-row">
        <Button className="w-full shadow-md shadow-accent/20">Upgrade now</Button>
        <Button className="w-full" variant="secondary">
          Compare plans
        </Button>
      </Card.Footer>
    </Card>
  );
}

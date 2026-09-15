import type {ReactNode} from "react";

import {Avatar, AvatarGroup} from "@heroui/react";

const STRIPE_STYLES = `
@keyframes ag-stripes {
  to { background-position: 24px 24px; }
}

.ag-stripes {
  background-color: color-mix(in oklab, var(--danger) 6%, var(--surface));
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0 10px,
    color-mix(in oklab, var(--danger) 12%, transparent) 10px 11px,
    transparent 11px 21px,
    color-mix(in oklab, var(--danger) 28%, transparent) 21px 22px
  );
  background-size: 24px 24px;
  animation: ag-stripes 2.8s linear infinite;
}
`;

function StripeBackdrop({children}: {children: ReactNode}) {
  return (
    <div className="relative inline-flex rounded-xl p-6">
      <div aria-hidden className="ag-stripes pointer-events-none absolute inset-0 rounded-xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function DemoGroup({overlap}: {overlap: "clip" | "ring"}) {
  return (
    <AvatarGroup overlap={overlap} size="lg">
      <Avatar>
        <Avatar.Image
          alt="John"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          alt="Emily"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
        />
        <Avatar.Fallback>EC</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <AvatarGroup.Count>+2</AvatarGroup.Count>
    </AvatarGroup>
  );
}

export function Overlap() {
  return (
    <div className="flex flex-col items-start gap-6">
      <style>{STRIPE_STYLES}</style>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">clip</p>
        <StripeBackdrop>
          <DemoGroup overlap="clip" />
        </StripeBackdrop>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">ring</p>
        <StripeBackdrop>
          <DemoGroup overlap="ring" />
        </StripeBackdrop>
      </div>
    </div>
  );
}

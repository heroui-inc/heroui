"use client";

import {CardStack} from "./card-stack";
import {DarkMembershipCard} from "./footer-cta";
import {
  BlueMembershipCard,
  OrangeMembershipCard,
  PurpleMembershipCard,
  TealMembershipCard,
} from "./membership-cards";

export default function CtaSection() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-20">
      <p className="text-center text-base leading-[normal] font-medium text-accent">Join us</p>
      <div className="font-heading mt-2 text-center text-5xl leading-[normal] tracking-[-0.72px] whitespace-nowrap text-foreground">
        <p className="mb-0">Claim your hero license</p>
        <p className="text-foreground/60">before it&apos;s late</p>
      </div>

      <CardStack>
        <DarkMembershipCard />
        <BlueMembershipCard />
        <OrangeMembershipCard />
        <TealMembershipCard />
        <PurpleMembershipCard />
      </CardStack>
    </section>
  );
}

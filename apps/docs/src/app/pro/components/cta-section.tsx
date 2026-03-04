import {DarkMembershipCard} from "./footer-cta";
import {BlueMembershipCard, OrangeMembershipCard} from "./membership-cards";

export default function CtaSection() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-20">
      <p className="text-center text-base leading-[normal] font-medium text-accent">Join us</p>
      <div className="font-heading mt-2 text-center text-5xl leading-[normal] tracking-[-0.72px] whitespace-nowrap text-foreground">
        <p className="mb-0">Claim your hero license</p>
        <p className="text-foreground/60">before it&apos;s late</p>
      </div>

      {/* Stacked membership cards */}
      <div className="relative mt-10 h-[480px] w-[400px]">
        <div className="absolute top-1/2 left-1/2 z-0 -translate-x-[65%] -translate-y-1/2 -rotate-2">
          <BlueMembershipCard />
        </div>
        <div className="absolute top-1/2 left-1/2 z-0 -translate-x-[35%] -translate-y-1/2 rotate-[3.78deg]">
          <OrangeMembershipCard />
        </div>
        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <DarkMembershipCard />
        </div>
      </div>
    </section>
  );
}

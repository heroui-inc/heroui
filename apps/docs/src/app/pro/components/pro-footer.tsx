import {Countdown} from "./countdown";
import DottedHeroUILogo from "./dotted-heroui-logo";
import {ClaimButton} from "./footer-cta";

export default function ProFooter() {
  return (
    <>
      <footer className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6">
        <p className="text-center text-xs leading-[1.34] font-normal text-muted">
          Junior claimed 24 mins ago
        </p>
        <ClaimButton />
        <p className="text-center text-xs leading-[1.34] font-medium text-muted">
          <Countdown />
        </p>
        <p className="text-center text-xs leading-[1.34] font-normal text-muted">
          &copy; 2026 NextUI Inc. All rights reserved.
        </p>
      </footer>

      {/* Dotted logo - full width, clipped at bottom */}
      <div className="mx-auto mt-4 max-h-[200px] w-full max-w-5xl overflow-hidden">
        <DottedHeroUILogo />
      </div>
    </>
  );
}

import {SocialLinks} from "@/components/social-links";

export function Footer() {
  return (
    <footer className="text-muted mt-auto flex w-full flex-row flex-wrap items-center justify-center gap-2 py-3">
      <p className="text-sm">&copy; {new Date().getFullYear()} NextUI Inc. All rights reserved.</p>
      <SocialLinks />
    </footer>
  );
}

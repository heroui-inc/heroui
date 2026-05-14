import {SocialLinks} from "@/components/social-links";

export function Footer() {
  return (
    <footer className="mt-auto flex w-full flex-row flex-wrap items-center justify-center gap-2 py-3 text-muted">
      <p className="text-sm">&copy; {new Date().getFullYear()} NextUI Inc. 保留所有权利</p>
      <SocialLinks />
    </footer>
  );
}

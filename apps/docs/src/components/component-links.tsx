import type {ComponentLinksType} from "@/utils/extract-links";

import {AdobeIcon, GithubIcon, RadixUIIcon, StorybookIcon} from "@/icons/dev";
import {generateComponentLinks} from "@/utils/extract-links";

export interface ComponentLinksProps {
  links?: ComponentLinksType;
}

const ButtonLink = ({
  children,
  href,
  startContent,
  ...props
}: React.HTMLProps<HTMLAnchorElement> & {
  startContent?: React.ReactNode;
}) => {
  return (
    <a
      className="button button--tertiary button--sm text-muted"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {startContent}
      {children}
    </a>
  );
};

export const ComponentLinks = ({links}: ComponentLinksProps) => {
  const componentLinks = generateComponentLinks(links || null);

  if (!componentLinks) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-wrap gap-3">
      {componentLinks.storybook ? (
        <ButtonLink
          href={`${componentLinks.storybook}--default`}
          startContent={<StorybookIcon className="text-lg text-[#ff4785]" />}
        >
          Storybook
        </ButtonLink>
      ) : null}
      {componentLinks.rac ? (
        <ButtonLink
          href={componentLinks.rac}
          startContent={<AdobeIcon className="text-lg text-[#E1251B]" />}
        >
          React Aria
        </ButtonLink>
      ) : null}
      {componentLinks.radix ? (
        <ButtonLink href={componentLinks.radix} startContent={<RadixUIIcon className="text-lg" />}>
          Radix UI
        </ButtonLink>
      ) : null}
      {componentLinks.source ? (
        <ButtonLink href={componentLinks.source} startContent={<GithubIcon size={20} />}>
          Source
        </ButtonLink>
      ) : null}
      {componentLinks.styles ? (
        <ButtonLink href={componentLinks.styles} startContent={<GithubIcon size={20} />}>
          Styles source
        </ButtonLink>
      ) : null}
    </div>
  );
};

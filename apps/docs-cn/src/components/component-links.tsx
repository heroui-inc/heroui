import type {ComponentLinksType} from "@/utils/extract-links";

import {
  FigmaIcon,
  GithubIcon,
  RadixUIIcon,
  ReactAriaIcon,
  StorybookIcon,
  TailwindIcon,
} from "@/icons/dev";
import {generateComponentLinks} from "@/utils/extract-links";
import {docsButtonVariants} from "@/utils/variants";

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
      className={docsButtonVariants()}
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
    <div className="mb-4 flex flex-wrap gap-2">
      {/* Only the node-id is needed */}
      {componentLinks.figma ? (
        <ButtonLink href={componentLinks.figma} startContent={<FigmaIcon className="text-lg" />}>
          Figma
        </ButtonLink>
      ) : null}
      {componentLinks.storybook ? (
        <ButtonLink
          href={`${componentLinks.storybook}--docs`}
          startContent={<StorybookIcon className="text-lg text-[#ff4785]" />}
        >
          Storybook
        </ButtonLink>
      ) : null}
      {componentLinks.rac ? (
        <ButtonLink
          href={componentLinks.rac}
          startContent={<ReactAriaIcon className="text-lg text-[#6733FF]" />}
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
      {componentLinks.source_native ? (
        <ButtonLink href={componentLinks.source_native} startContent={<GithubIcon size={20} />}>
          Source
        </ButtonLink>
      ) : null}
      {componentLinks.styles ? (
        <ButtonLink href={componentLinks.styles} startContent={<GithubIcon size={20} />}>
          Styles source
        </ButtonLink>
      ) : null}
      {componentLinks.styles_native ? (
        <ButtonLink href={componentLinks.styles_native} startContent={<GithubIcon size={20} />}>
          Styles source
        </ButtonLink>
      ) : null}
      {componentLinks.themes ? (
        <ButtonLink href={componentLinks.themes} startContent={<GithubIcon size={20} />}>
          Theme source
        </ButtonLink>
      ) : null}
      {componentLinks.tailwind ? (
        <ButtonLink
          href={componentLinks.tailwind}
          startContent={<TailwindIcon className="text-lg text-[#38bdf8]" />}
        >
          Tailwind CSS
        </ButtonLink>
      ) : null}
    </div>
  );
};

import type {ImageResponseOptions} from "next/dist/compiled/@vercel/og/types";
import type {ReactElement, ReactNode} from "react";

import {promises} from "fs";
import path from "path";

import {notFound} from "next/navigation";
import {ImageResponse} from "next/og";

import {HeroUILogo} from "@/components/heroui-logo";
import {source} from "@/lib/source";

interface GenerateProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  site?: ReactNode;
}

function generateOGImage(options: GenerateProps & ImageResponseOptions): ImageResponse {
  const {description, icon, site, title, ...rest} = options;

  return new ImageResponse(generate({description, icon, site, title}), {
    height: 630,
    width: 1200,
    ...rest,
  });
}

function generate({...props}: GenerateProps): ReactElement {
  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(350deg, #000 0%, rgba(31, 20, 21, .7) 15%, rgba(41, 26, 27, .6) 30%, rgba(37, 24, 28, .65) 40%, rgba(33, 23, 29, .65) 50%, rgba(30, 21, 30, .65) 60%, #1c151e 70%, #18131b 78%, #15121c 85%, #111019 92%, #101119 100%),
          linear-gradient(350deg, #000 0%, #291a1b 40%, #1c151e 70%, #15121c 85%, #101119 100%)
        `,
        color: "#FAFAFA",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "4rem",
        width: "100%",
      }}
    >
      {/* Title */}
      <p
        style={{
          fontSize: "82px",
          fontWeight: 800,
        }}
      >
        {props.title}
      </p>

      {/* Description */}
      <p
        style={{
          color: "#A1A1A1",
          fontSize: "52px",
        }}
      >
        {props.description}
      </p>

      {/* Logo & Title */}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          marginBottom: "12px",
          marginTop: "auto",
        }}
      >
        {props.icon}
      </div>
    </div>
  );
}

const [interRegular, interBold] = await Promise.all([
  promises.readFile(path.join(process.cwd(), "public/fonts/Inter-Regular.ttf")),
  promises.readFile(path.join(process.cwd(), "public/fonts/Inter-Bold.ttf")),
]);

export const GET = async (_req: Request, {params}: {params: Promise<{slug: string[]}>}) => {
  const {slug} = await params;
  const page = source.getPage(slug.slice(0, -1));

  if (!page) notFound();

  return generateOGImage({
    description: page.data.description,
    fonts: [
      {
        data: interRegular,
        name: "Inter",
        weight: 400,
      },
      {
        data: interBold,
        name: "Inter",
        weight: 600,
      },
    ],
    icon: <HeroUILogo size={58} />,
    title: page.data.title,
  });
};

export const generateStaticParams = (): {slug: string[]}[] => {
  return source.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, "image.png"],
  }));
};

export const revalidate = false;

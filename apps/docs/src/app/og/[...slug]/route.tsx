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
        background: "#F5F5F5",
        color: "#18181B",
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
          color: "#71717A",
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

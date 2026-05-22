"use client";

import type {ScrollShadowVisibility} from "@heroui/react";

import {Card, ScrollShadow} from "@heroui/react";
import {useState} from "react";

const images = [
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg",
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg",
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg",
];

const VISIBILITY_LABELS: Record<ScrollShadowVisibility, string> = {
  auto: "自动",
  both: "两侧",
  bottom: "底部",
  left: "左侧",
  none: "无",
  right: "右侧",
  top: "顶部",
};

export default function VisibilityChange() {
  const [verticalState, setVerticalState] = useState<ScrollShadowVisibility>("none");
  const [horizontalState, setHorizontalState] = useState<ScrollShadowVisibility>("none");

  const getRandomImage = (idx: number) => {
    return images[idx % images.length];
  };

  return (
    <div className="w-full sm:max-w-sm">
      <div className="mb-8 flex flex-col gap-2">
        <div className="rounded bg-default p-4">
          <p className="text-sm font-semibold">垂直阴影状态：{VISIBILITY_LABELS[verticalState]}</p>
        </div>
        <div className="w-full">
          <ScrollShadow
            className="max-h-[240px] p-4"
            orientation="vertical"
            onVisibilityChange={(visibility) => setVerticalState(visibility)}
          >
            <div className="space-y-4">
              {Array.from({length: 10}).map((_, idx) => (
                <p key={`scroll-shadow-lorem-content-${idx}`}>
                  段落 {idx + 1}：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                  risus, sed porttitor quam. Morbi accumsan cursus enim, sed ultricies sapien.
                </p>
              ))}
            </div>
          </ScrollShadow>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="rounded bg-default p-4">
          <p className="text-sm font-semibold">
            水平阴影状态：{VISIBILITY_LABELS[horizontalState]}
          </p>
        </div>
        <div className="w-full">
          <ScrollShadow
            className="p-4"
            orientation="horizontal"
            onVisibilityChange={(visibility) => setHorizontalState(visibility)}
          >
            <div className="flex flex-row gap-4">
              {Array.from({length: 10}).map((_, idx) => (
                <Card
                  key={`scroll-shadow-lorem-cards-${idx}`}
                  className="flex min-w-[200px] flex-row gap-3 p-1"
                  variant="transparent"
                >
                  <img
                    alt="示例卡片"
                    className="aspect-square h-16 w-16 shrink-0 rounded-xl object-cover select-none sm:h-20 sm:w-20"
                    loading="lazy"
                    src={getRandomImage(idx)}
                  />
                  <div className="flex flex-1 flex-col justify-center gap-1">
                    <Card.Title className="text-sm">连接未来</Card.Title>
                    <Card.Description className="text-xs">今天 18:30</Card.Description>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollShadow>
        </div>
      </div>
    </div>
  );
}

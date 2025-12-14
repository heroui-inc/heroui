import {Card, ScrollShadow} from "@heroui/react";

const images = [
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg",
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg",
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg",
];

export default function Orientation() {
  const getRandomImage = (idx: number) => {
    return images[idx % images.length];
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="mb-2 text-sm font-semibold">Vertical</h4>
        <div className="w-full p-0 sm:max-w-sm">
          <ScrollShadow className="max-h-[240px] p-4" orientation="vertical">
            <div className="space-y-4">
              {Array.from({length: 10}).map((_, idx) => (
                <p key={`scroll-shadow-lorem-content-${idx}`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam. Morbi accumsan cursus enim, sed ultricies sapien.
                </p>
              ))}
            </div>
          </ScrollShadow>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold">Horizontal</h4>
        <div className="w-full p-0 sm:max-w-sm">
          <ScrollShadow className="p-4" orientation="horizontal">
            <div className="flex flex-row gap-4">
              {Array.from({length: 10}).map((_, idx) => (
                <Card
                  key={`scroll-shadow-lorem-cards-${idx}`}
                  className="flex min-w-[200px] flex-row gap-3 p-1"
                  variant="transparent"
                >
                  <img
                    alt="Lorem Card"
                    className="aspect-square h-16 w-16 shrink-0 rounded-xl object-cover select-none sm:h-20 sm:w-20"
                    loading="lazy"
                    src={getRandomImage(idx)}
                  />
                  <div className="flex flex-1 flex-col justify-center gap-1">
                    <Card.Title className="text-sm">Bridging the Future</Card.Title>
                    <Card.Description className="text-xs">Today, 6:30 PM</Card.Description>
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

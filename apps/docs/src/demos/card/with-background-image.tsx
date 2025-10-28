import {Button, Card} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithBackgroundImage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
      <Card.Root className="aspect-[280/337] w-full max-w-[280px]">
        {/* Background image */}
        <img
          alt="Happy pet"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/dog.png"
        />

        {/* Top gradient blur overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-[76px]"
        >
          <div
            className="absolute inset-0 h-[-200%] backdrop-blur-sm"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent)",
              maskImage: "linear-gradient(to bottom, black 80%, transparent)",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          />
        </div>

        {/* Header */}
        <Card.Header className="z-10 text-white">
          <Card.Title className="text-xs font-medium tracking-wide text-white/80">
            PET HEALTH
          </Card.Title>
          <Card.Description className="text-lg font-medium leading-6 text-white">
            Your pet deserve the best
          </Card.Description>
        </Card.Header>

        {/* Bottom gradient blur overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[64px]"
        >
          <div
            className="absolute inset-0 h-[200%] backdrop-blur-sm"
            style={{
              WebkitMaskImage: "linear-gradient(to top, black 80%, transparent)",
              maskImage: "linear-gradient(to top, black 80%, transparent)",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          />
        </div>

        {/* Footer */}
        <Card.Footer className="z-10 mt-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white">Available soon</div>
            <div className="text-xs text-white/60">Get notified</div>
          </div>
          <Button size="sm" variant="tertiary">
            Notify me
          </Button>
        </Card.Footer>
      </Card.Root>

      <Card.Root className="aspect-[65/56] w-full md:w-[390px]">
        {/* Background image */}
        <img
          alt="Beautiful aerial view of Buenos Aires cityscape"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/mountain.png"
        />

        {/* Bottom gradient blur overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[64px]"
        >
          <div
            className="absolute inset-0 h-[200%] backdrop-blur-sm"
            style={{
              WebkitMaskImage: "linear-gradient(to top, black 80%, transparent)",
              maskImage: "linear-gradient(to top, black 80%, transparent)",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          />
        </div>

        {/* Footer */}
        <Card.Footer className="z-10 mt-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white">Buenos Aires</div>
            <div className="text-xs text-white/60">Argentina</div>
          </div>
          <Button aria-label="View Buenos Aires on map" size="sm" variant="tertiary">
            <Icon aria-hidden="true" icon="gravity-ui:map-pin" />
            Map
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}

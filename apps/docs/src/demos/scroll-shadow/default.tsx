import {Card, ScrollShadow} from "@heroui/react";

export default function Default() {
  return (
    <Card className="w-full p-0 sm:max-w-sm">
      <ScrollShadow className="max-h-[240px] p-4">
        <div className="space-y-4">
          {Array.from({length: 10}).map((_, idx) => (
            <p key={`scroll-shadow-lorem-content-${idx}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
              risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
              Morbi accumsan cursus enim, sed ultricies sapien.
            </p>
          ))}
        </div>
      </ScrollShadow>
    </Card>
  );
}

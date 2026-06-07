import {Button, Card, ScrollShadow} from "@heroui/react";

export default function WithCard() {
  return (
    <Card className="max-w-[400px]">
      <Card.Header>
        <Card.Title>Terms and Conditions</Card.Title>
        <Card.Description>Please review before proceeding</Card.Description>
      </Card.Header>
      <Card.Content className="p-0">
        <ScrollShadow className="h-[300px] px-4" size={80}>
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
      </Card.Content>
      <Card.Footer className="mt-4 flex flex-row gap-2">
        <Button className="w-full" variant="secondary">
          Cancel
        </Button>
        <Button className="w-full">Accept</Button>
      </Card.Footer>
    </Card>
  );
}

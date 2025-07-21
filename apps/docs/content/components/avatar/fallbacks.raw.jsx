import {Avatar} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar src="https://images.unsplash.com/broken" />
      <Avatar name="Jane" src="https://images.unsplash.com/broken" />
      <Avatar name="Joe" src="https://images.unsplash.com/broken" />
    </div>
  );
}

import {Input} from "@vezham/react";

export default function App() {
  return (
    <Input
      className="max-w-xs"
      defaultValue="junior@vezham.com"
      description="We'll never share your email with anyone else."
      label="Email"
      type="email"
    />
  );
}

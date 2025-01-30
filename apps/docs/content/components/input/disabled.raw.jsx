import {Input} from "@vezham/react";

export default function App() {
  return (
    <Input
      isDisabled
      className="max-w-xs"
      defaultValue="junior@vezham.com"
      label="Email"
      type="email"
    />
  );
}

import {Chip} from "@vezham/react";

export default function App() {
  return (
    <div className="flex gap-4">
      {/* eslint-disable no-console */}
      <Chip onClose={() => console.log("close")}>Chip</Chip>
      {/* eslint-disable no-console */}
      <Chip variant="bordered" onClose={() => console.log("close")}>
        Chip
      </Chip>
    </div>
  );
}

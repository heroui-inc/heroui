import {Link} from "@vezham/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Link isExternal href="https://github.com/vezham/heroui">
        External Link
      </Link>
      <Link isExternal showAnchorIcon href="https://github.com/vezham/heroui">
        External Link Anchor
      </Link>
    </div>
  );
}

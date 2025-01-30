import {Link, Button} from "@vezham/react";

export default function App() {
  return (
    <Button
      showAnchorIcon
      as={Link}
      color="primary"
      href="https://github.com/vezham/heroui"
      variant="solid"
    >
      Button Link
    </Button>
  );
}

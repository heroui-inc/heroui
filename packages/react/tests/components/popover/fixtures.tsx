import {Button} from "@/components/button";
import {Popover} from "@/components/popover";

export type PopoverFixtureProps = {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const PopoverFixture = (props: PopoverFixtureProps = {}) => (
  <Popover defaultOpen={props.defaultOpen} isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
    <Button>Open popover</Button>
    <Popover.Content>
      <Popover.Dialog>
        <Popover.Heading>Popover heading</Popover.Heading>
        <p>This is the popover content</p>
        <Button>Inside action</Button>
      </Popover.Dialog>
    </Popover.Content>
  </Popover>
);

import {Popover, PopoverTrigger, PopoverContent, Button} from "@vezham/react";

export default function App() {
  return (
    <Popover showArrow offset={20} placement="bottom">
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

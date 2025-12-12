import {Kbd} from "@heroui/react";

export function NavigationKeys() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted">Arrow Keys:</span>
        <div className="flex items-center gap-2">
          <Kbd>
            <Kbd.Abbr keyValue="up" />
          </Kbd>
          <Kbd>
            <Kbd.Abbr keyValue="down" />
          </Kbd>
          <Kbd>
            <Kbd.Abbr keyValue="left" />
          </Kbd>
          <Kbd>
            <Kbd.Abbr keyValue="right" />
          </Kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted">Page Navigation:</span>
        <div className="flex items-center gap-2">
          <Kbd>
            <Kbd.Abbr keyValue="pageup" />
          </Kbd>
          <Kbd>
            <Kbd.Abbr keyValue="pagedown" />
          </Kbd>
          <Kbd>
            <Kbd.Abbr keyValue="home" />
          </Kbd>
          <Kbd>
            <Kbd.Abbr keyValue="end" />
          </Kbd>
        </div>
      </div>
    </div>
  );
}

import {Separator} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <div className="max-w-md">
      <div className="space-y-1">
        <h4 className="text-medium font-medium">HeroUI v3 Components</h4>
        <p className="text-small text-default-400">Beautiful, fast and modern React UI library.</p>
      </div>
      <Separator className="my-4" render={(props) => <div {...props} data-custom="foo" />} />
      <div className="text-small flex h-5 items-center space-x-4">
        <div>Blog</div>
        <Separator
          orientation="vertical"
          render={(props) => <div {...props} data-custom="foo" />}
        />
        <div>Docs</div>
        <Separator
          orientation="vertical"
          render={(props) => <div {...props} data-custom="foo" />}
        />
        <div>Source</div>
      </div>
    </div>
  );
}

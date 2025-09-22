"use client";

import {Card, Link} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-8">
      {/* Item variant */}
      <Card className="w-full max-w-[200px]" variant="item">
        <Card.Image
          alt="Product"
          className="aspect-square"
          src="https://assets.lummi.ai/assets/QmVGaqmCEBtAwTYMYUtn2ocdJcoSjtGbLydnVCGJpbUdHX"
        />
        <Card.Details>
          <Card.Footer className="inline-flex items-center justify-between px-2 py-2 pb-1 text-sm">
            <span>Cars</span>
            <span className="text-muted">18 pictures</span>
          </Card.Footer>
        </Card.Details>
      </Card>

      <Card className="w-full items-stretch" variant="side">
        <Card.Image
          alt="Product"
          className="aspect-square w-[136px]"
          src="https://assets.lummi.ai/assets/QmVGaqmCEBtAwTYMYUtn2ocdJcoSjtGbLydnVCGJpbUdHX"
        />
        <Card.Details className="gap-3">
          <Card.Header className="gap-1">
            <Card.Title>Become an Acme Creator!</Card.Title>
            <Card.Description>
              Visit heroui.com to sign up today and start earning credits from your fans and
              followers.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="mt-auto">
            <Link href="https://heroui.com" target="_blank">
              Call to action
              <Link.Icon />
            </Link>
          </Card.Footer>
        </Card.Details>
      </Card>
    </div>
  );
}

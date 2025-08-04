/* eslint-disable no-console */
"use client";

import {Button, Spinner} from "@heroui/react";
import {Icon} from "@iconify/react";
import React, {useState} from "react";

export function ButtonBasic() {
  return <Button onPress={() => console.log("Button pressed")}>Click me</Button>;
}

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  );
}

export function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <Icon icon="gravity-ui:globe" />
        Search
      </Button>
      <Button variant="secondary">
        <Icon icon="gravity-ui:plus" />
        Add Member
      </Button>
      <Button variant="tertiary">
        <Icon icon="gravity-ui:envelope" />
        Email
      </Button>
      <Button variant="danger">
        <Icon icon="gravity-ui:trash-bin" />
        Delete
      </Button>
    </div>
  );
}

export function ButtonIconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly variant="tertiary">
        <Icon icon="gravity-ui:ellipsis" />
      </Button>
      <Button isIconOnly variant="secondary">
        <Icon icon="gravity-ui:gear" />
      </Button>
      <Button isIconOnly variant="danger">
        <Icon icon="gravity-ui:trash-bin" />
      </Button>
    </div>
  );
}

export function ButtonLoading() {
  const [isLoading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button isPending={isLoading} onPress={handlePress}>
      {({isPending}) => (
        <>
          {isPending ? <Spinner /> : <Icon icon="gravity-ui:paperclip" />}
          {isPending ? "Uploading..." : "Upload File"}
        </>
      )}
    </Button>
  );
}

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function ButtonDisabled() {
  return (
    <div className="flex gap-3">
      <Button isDisabled>Disabled</Button>
      <Button isDisabled variant="secondary">
        Disabled Secondary
      </Button>
    </div>
  );
}

export function ButtonSocial() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Button className="w-full" variant="tertiary">
        <Icon icon="devicon:google" />
        Sign in with Google
      </Button>
      <Button className="w-full" variant="tertiary">
        <Icon icon="mdi:github" />
        Sign in with GitHub
      </Button>
      <Button className="w-full" variant="tertiary">
        <Icon icon="ion:logo-apple" />
        Sign in with Apple
      </Button>
    </div>
  );
}

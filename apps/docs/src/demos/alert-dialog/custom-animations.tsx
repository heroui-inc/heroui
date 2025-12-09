"use client";

import {AlertDialog, Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomAnimations() {
  const animations = [
    {
      classNames: [
        "data-[entering]:animate-in",
        "data-[entering]:zoom-in-95",
        "data-[entering]:fade-in-0",
        "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
        "data-[exiting]:animate-out",
        "data-[exiting]:zoom-out-95",
        "data-[exiting]:fade-out-0",
        "data-[exiting]:ease-out-quart",
      ].join(" "),
      description: "Smooth scale animation with elastic spring-like easing",
      icon: "gravity-ui:sparkles",
      name: "Smooth Scale",
    },
    {
      classNames: [
        "data-[entering]:animate-in",
        "data-[entering]:slide-in-from-bottom-4",
        "data-[entering]:fade-in-0",
        "data-[entering]:ease-out-fluid",
        "data-[exiting]:animate-out",
        "data-[exiting]:slide-out-to-bottom-2",
        "data-[exiting]:fade-out-0",
        "data-[exiting]:ease-in-quad",
      ].join(" "),
      description: "Gentle upward slide with seamless fade transition",
      icon: "gravity-ui:arrow-up-from-line",
      name: "Slide Up",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {animations.map(({classNames, description, icon, name}) => (
        <AlertDialog key={name}>
          <Button variant="secondary">{name}</Button>
          <AlertDialog.Container
            backdropClassName="data-[exiting]:duration-250"
            className={`data-[entering]:duration-300 data-[exiting]:duration-200 ${classNames}`}
          >
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="accent">
                      <Icon className="size-5" icon={icon} />
                    </AlertDialog.Icon>
                    <AlertDialog.Heading>{name} Animation</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p className="mt-1">
                      {description}. Customize entrance and exit animations using Tailwind's
                      animation utilities. Combine <code>data-[entering]</code> and{" "}
                      <code>data-[exiting]</code> states with custom timings and easing functions
                      for polished transitions.
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button variant="tertiary" onPress={close}>
                      Close
                    </Button>
                    <Button onPress={close}>Try Again</Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      ))}
    </div>
  );
}

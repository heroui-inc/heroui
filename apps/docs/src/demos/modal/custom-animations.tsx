"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";
import clsx from "clsx";

export function CustomAnimations() {
  const animations = {
    Blur_Slide: [
      "data-[entering]:blur-in-8",
      "data-[entering]:slide-in-from-bottom-8",
      "data-[entering]:fade-in-0",
      "data-[exiting]:blur-out-8",
      "data-[exiting]:slide-out-to-bottom-8",
      "data-[exiting]:fade-out-0",
      "",
    ].join(" "),
    Bounce: [
      "data-[entering]:zoom-in-50",
      "data-[entering]:fade-in-0",
      "data-[entering]:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]",
      "data-[exiting]:zoom-out-95",
      "data-[exiting]:fade-out-0",
    ].join(" "),
    RotateZoom: [
      "data-[entering]:zoom-in-75",
      "data-[entering]:spin-in-45",
      "data-[entering]:fade-in-0",
      "data-[exiting]:zoom-out-95",
      "data-[exiting]:spin-out-12",
      "data-[exiting]:fade-out-0",
    ].join(" "),
    Spring: [
      "data-[entering]:zoom-in-90",
      "data-[entering]:ease-spring",
      "data-[exiting]:zoom-out-95",
      "data-[exiting]:ease-out-quart",
    ].join(" "),
  };

  return (
    <div className="flex flex-wrap gap-4">
      {Object.entries(animations).map(([name, classNames]) => (
        <Modal key={name}>
          <Button>{name.replace("_", " ")}</Button>
          <Modal.Backdrop className="data-[exiting]:duration-200">
            <Modal.Container
              className={clsx(
                "data-[entering]:duration-[350ms]",
                "data-[exiting]:duration-200",
                classNames,
              )}
            >
              <Modal.Dialog className="sm:max-w-[360px]">
                {({close}) => (
                  <>
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <div className="bg-default ring-muted/25 flex size-10 items-center justify-center rounded-full ring-1">
                        <Icon className="size-5" icon="gravity-ui:rocket" />
                      </div>
                      <h2 className="text-foreground text-lg font-semibold leading-6">
                        {name.replace("_", " ")} Animation
                      </h2>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        Customize your modal's entrance and exit animations using Tailwind's
                        animation utilities. This example demonstrates the{" "}
                        {name.replace("_", " ").toLowerCase()} animation style.
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="w-full" onPress={close}>
                        Continue
                      </Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
}

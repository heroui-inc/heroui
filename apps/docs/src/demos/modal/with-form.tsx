"use client";

import {Button, Input, Label, Modal, TextField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithForm() {
  return (
    <Modal.Root>
      <Button>Open Contact Form</Button>
      <Modal.Overlay>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
                <Icon className="size-5" icon="gravity-ui:envelope" />
              </div>
              <h2 className="text-foreground text-lg font-semibold leading-6">Contact Us</h2>
              <p className="text-muted text-sm leading-5">
                Fill out the form below. On mobile, the modal will adapt when the keyboard appears.
              </p>
            </Modal.Header>
            <Modal.Body>
              <form className="flex flex-col gap-4">
                <TextField className="w-full" name="name" type="text">
                  <Label>Name</Label>
                  <Input placeholder="Enter your name" />
                </TextField>

                <TextField className="w-full" name="email" type="email">
                  <Label>Email</Label>
                  <Input placeholder="Enter your email" />
                </TextField>

                <TextField className="w-full" name="phone" type="tel">
                  <Label>Phone</Label>
                  <Input placeholder="Enter your phone number" />
                </TextField>

                <TextField className="w-full" name="company">
                  <Label>Company</Label>
                  <Input placeholder="Enter your company name" />
                </TextField>

                <TextField className="w-full" name="message">
                  <Label>Message</Label>
                  <Input placeholder="Enter your message" />
                </TextField>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Modal.CloseTrigger asChild>
                <Button variant="secondary">Cancel</Button>
              </Modal.CloseTrigger>
              <Button>Send Message</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Overlay>
    </Modal.Root>
  );
}

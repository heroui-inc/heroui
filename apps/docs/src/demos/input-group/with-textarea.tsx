"use client";

import {Envelope} from "@gravity-ui/icons";
import {Description, FieldError, InputGroup, Label, TextField} from "@heroui/react";
import {useState} from "react";

export function WithTextArea() {
  const [feedback, setFeedback] = useState("");

  return (
    <TextField
      fullWidth
      className="flex w-xs flex-col sm:w-sm"
      isInvalid={feedback.length > 500}
      name="feedback"
      onChange={setFeedback}
    >
      <Label>Your Feedback</Label>
      <InputGroup fullWidth>
        <InputGroup.Prefix>
          <Envelope className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.TextArea
          className="resize-none"
          placeholder="Share your thoughts, suggestions, or issues..."
          rows={5}
          value={feedback}
        />
      </InputGroup>
      <Description className="flex w-full items-center justify-between px-1">
        <span>Maximum 500 characters.</span>
        <span className="ml-auto">{feedback.length}/500</span>
      </Description>
      <FieldError>Feedback must be less than 500 characters</FieldError>
    </TextField>
  );
}

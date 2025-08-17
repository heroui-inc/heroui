"use client";

import {Button, Spinner} from "@heroui/react";
import {Icon} from "@iconify/react";
import React, {useState} from "react";

export function LoadingState() {
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

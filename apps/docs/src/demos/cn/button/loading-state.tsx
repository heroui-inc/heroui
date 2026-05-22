"use client";

import {Paperclip} from "@gravity-ui/icons";
import {Button, Spinner} from "@heroui/react";
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
          {isPending ? <Spinner color="current" size="sm" /> : <Paperclip />}
          {isPending ? "上传中…" : "上传文件"}
        </>
      )}
    </Button>
  );
}

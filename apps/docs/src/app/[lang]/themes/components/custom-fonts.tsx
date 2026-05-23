"use client";

import {ArrowLeft, Globe} from "@gravity-ui/icons";
import {Button, Description, FieldError, InputGroup, Label, Link, TextField} from "@heroui/react";
import {useMemo, useState} from "react";

import {useDictionary} from "@/hooks/use-dictionary";

import {useCustomFonts, useVariableSetter} from "../hooks";
import {extractFontFamilyFromUrl, isValidFontCdnUrl} from "../utils/font-utils";

interface CustomFontsProps {
  goToSuggested: () => void;
}

export function CustomFonts({goToSuggested}: CustomFontsProps) {
  const [cdnUrl, setCdnUrl] = useState("");
  const [hasBlurred, setHasBlurred] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const {addCustomFont} = useCustomFonts();
  const {setVariable} = useVariableSetter();
  const dict = useDictionary().themeBuilder.customFonts;

  const validationError = useMemo<string | null>(() => {
    if (!cdnUrl.trim()) return null;

    try {
      const parsedUrl = new URL(cdnUrl);

      if (parsedUrl.protocol !== "https:") return dict.errorHttps;
      if (!isValidFontCdnUrl(cdnUrl)) return dict.errorSupportedCdn;

      return null;
    } catch {
      return dict.errorInvalidUrl;
    }
  }, [cdnUrl, dict]);
  const showValidationError = hasBlurred && validationError !== null;
  const showError = showValidationError || importError !== null;
  const errorMessage = importError ?? validationError;

  const handleImport = () => {
    if (validationError) return;

    setIsImporting(true);
    setImportError(null);

    // Validate that we can extract a font family from the URL
    const fontFamily = extractFontFamilyFromUrl(cdnUrl);

    if (!fontFamily) {
      setImportError(dict.errorCannotDetect);
      setIsImporting(false);

      return;
    }

    // Add to localStorage for the font picker list
    const result = addCustomFont(cdnUrl);

    if ("error" in result) {
      const message =
        result.error === "already-imported"
          ? dict.errorAlreadyImported.replace("{name}", result.label)
          : dict.errorCannotDetectFull;

      setImportError(message);
      setIsImporting(false);
    } else {
      // Store the URL directly in the query params (makes it shareable!)
      setVariable("fontFamily", cdnUrl);
      setCdnUrl("");
      setHasBlurred(false);
      setIsImporting(false);
      goToSuggested();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Link className="flex items-center gap-1 no-underline" onPress={goToSuggested}>
          <ArrowLeft className="size-4" />
          {dict.back}
        </Link>
      </div>
      <TextField
        isInvalid={showError}
        value={cdnUrl}
        onChange={(value) => {
          setCdnUrl(value);
          setImportError(null);
        }}
      >
        <Label>{dict.fontUrl}</Label>
        <InputGroup variant="secondary">
          <InputGroup.Prefix>
            <Globe className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input placeholder={dict.placeholder} onBlur={() => setHasBlurred(true)} />
        </InputGroup>
        <Description>{dict.description}</Description>
        {showError ? <FieldError>{errorMessage}</FieldError> : null}
      </TextField>
      <Button
        className="w-full"
        isDisabled={!cdnUrl.trim() || validationError !== null || isImporting}
        size="sm"
        variant="secondary"
        onPress={handleImport}
      >
        {isImporting ? dict.importing : dict.importFont}
      </Button>
    </div>
  );
}

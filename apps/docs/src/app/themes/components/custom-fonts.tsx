"use client";

import {ArrowLeft, Globe} from "@gravity-ui/icons";
import {Button, FieldError, InputGroup, Label, Link, TextField} from "@heroui/react";
import {useState} from "react";

import {useCustomFonts, useVariableSetter} from "../hooks";
import {extractFontFamilyFromUrl, isValidFontCdnUrl} from "../utils/font-utils";

/**
 * Validates if a URL is from an allowed font CDN host.
 * Returns null if valid, or an error message if invalid.
 * Supports both CSS stylesheet URLs and font file URLs (.woff2, etc.)
 */
function validateFontCdnUrl(url: string): string | null {
  if (!url.trim()) {
    return null; // Empty is not an error (just not filled yet)
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "https:") {
      return "URL must use https protocol";
    }

    if (!isValidFontCdnUrl(url)) {
      return "URL must be from a supported CDN (Google Fonts, Fontsource, Bunny Fonts, etc.)";
    }

    return null;
  } catch {
    return "Please enter a valid URL";
  }
}

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

  const validationError = validateFontCdnUrl(cdnUrl);
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
      setImportError("Could not detect font family from URL. Please check the URL format.");
      setIsImporting(false);

      return;
    }

    // Add to localStorage for the font picker list
    const result = addCustomFont(cdnUrl);

    if ("error" in result) {
      setImportError(result.error);
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
        <Button size="sm" variant="ghost" onPress={goToSuggested}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Link href="https://fontsource.org" target="_blank">
            Fontsource
            <Link.Icon />
          </Link>
        </div>
      </div>
      <TextField
        isInvalid={showError}
        value={cdnUrl}
        onChange={(value) => {
          setCdnUrl(value);
          setImportError(null);
        }}
      >
        <Label>Font URL</Label>
        <InputGroup variant="secondary">
          <InputGroup.Prefix>
            <Globe className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input placeholder="Paste font URL..." onBlur={() => setHasBlurred(true)} />
        </InputGroup>
        {showError ? <FieldError>{errorMessage}</FieldError> : null}
      </TextField>
      <Button
        className="w-full"
        isDisabled={!cdnUrl.trim() || validationError !== null || isImporting}
        size="sm"
        variant="secondary"
        onPress={handleImport}
      >
        {isImporting ? "Importing..." : "Import font"}
      </Button>
    </div>
  );
}

import type {NumberParser} from "@internationalized/number";
import type {NumberFieldState} from "@react-stately/numberfield";

import {useCallback, useMemo, useRef} from "react";

export interface UseRealTimeInputFormattingProps {
  isRealTimeFormat: boolean;
  numberParser: NumberParser;
  numberFormatter: Intl.NumberFormat;
  state: NumberFieldState;
  domRef: React.RefObject<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function useRealTimeInputFormatting(props: UseRealTimeInputFormattingProps) {
  const {isRealTimeFormat, numberParser, numberFormatter, state, domRef, onChange} = props;
  const isComposingRef = useRef(false);

  const shouldFormat = useMemo(() => {
    return Boolean(isRealTimeFormat);
  }, [isRealTimeFormat]);

  const handleCompositionStart = useCallback(() => {
    isComposingRef.current = true;
  }, []);

  const restoreCursorPosition = useCallback(
    (input: HTMLInputElement, formattedValue: string, digitCount: number) => {
      setTimeout(() => {
        if (!input) return;
        let currentDigitCount = 0;
        let newCursorPos = 0;

        for (let i = 0; i < formattedValue.length; i++) {
          if (/\d/.test(formattedValue[i])) currentDigitCount++;
          if (currentDigitCount >= digitCount) {
            newCursorPos = i + 1;
            break;
          }
        }
        input.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [],
  );

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (isComposingRef.current || !shouldFormat) return;

      const input = e.currentTarget;
      const value = input.value;

      if (!numberParser.isValidPartialNumber(value)) return;

      const parsedValue = numberParser.parse(value);

      if (isNaN(parsedValue)) return;

      const formattedValue = numberFormatter.format(parsedValue);

      if (value === formattedValue || !state.validate(formattedValue)) return;

      let digitCount = 0;

      for (let i = 0; i < (input.selectionStart ?? 0); i++) {
        if (/\d/.test(value[i])) digitCount++;
      }

      state.setInputValue(formattedValue);
      state.setNumberValue(parsedValue);

      restoreCursorPosition(input, formattedValue, digitCount);

      if (onChange) {
        onChange({
          target: {value: formattedValue},
          currentTarget: {value: formattedValue},
        } as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [shouldFormat, numberParser, numberFormatter, state, onChange, restoreCursorPosition],
  );

  const handleCompositionEnd = useCallback(
    (e: React.CompositionEvent<HTMLInputElement>) => {
      isComposingRef.current = false;
      handleInput(e as unknown as React.FormEvent<HTMLInputElement>);
    },
    [handleInput],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const clipboardData = e.clipboardData.getData("text/plain");

      if (!clipboardData) return;

      const input = domRef.current;

      if (!input) return;

      const {value, selectionStart, selectionEnd} = input;
      const nextValue =
        value.slice(0, selectionStart ?? 0) + clipboardData + value.slice(selectionEnd ?? 0);

      if (!numberParser.isValidPartialNumber(nextValue)) return;
      const parsedValue = numberParser.parse(nextValue);

      if (isNaN(parsedValue)) return;

      const formattedValue = numberFormatter.format(parsedValue);

      if (!state.validate(formattedValue)) return;

      state.setInputValue(formattedValue);
      state.setNumberValue(parsedValue);

      const digitCount =
        (value.slice(0, selectionStart ?? 0).match(/\d/g) || []).length +
        (clipboardData.match(/\d/g) || []).length;

      restoreCursorPosition(input, formattedValue, digitCount);

      if (onChange) {
        onChange({
          target: {value: formattedValue},
          currentTarget: {value: formattedValue},
        } as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [numberParser, numberFormatter, state, domRef, onChange, restoreCursorPosition],
  );

  const handleCut = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      const input = domRef.current;

      if (!input) return;

      const {value, selectionStart, selectionEnd} = input;

      if (selectionStart === selectionEnd) return;

      const cutText = value.slice(selectionStart ?? 0, selectionEnd ?? 0);

      e.clipboardData.setData("text/plain", cutText);

      const nextValue = value.slice(0, selectionStart ?? 0) + value.slice(selectionEnd ?? 0);

      if (!numberParser.isValidPartialNumber(nextValue)) return;
      const parsedValue = numberParser.parse(nextValue);

      if (isNaN(parsedValue)) {
        state.setInputValue("");
        state.setNumberValue(NaN);

        return;
      }

      const formattedValue = numberFormatter.format(parsedValue);

      if (!state.validate(formattedValue)) return;

      state.setInputValue(formattedValue);
      state.setNumberValue(parsedValue);

      const digitCount = (value.slice(0, selectionStart ?? 0).match(/\d/g) || []).length;

      restoreCursorPosition(input, formattedValue, digitCount);

      if (onChange) {
        onChange({
          target: {value: formattedValue},
          currentTarget: {value: formattedValue},
        } as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [numberParser, numberFormatter, state, domRef, onChange, restoreCursorPosition],
  );

  const handleBeforeInput = useCallback(
    (e: React.FormEvent<HTMLInputElement> & {data: string | null}) => {
      if (isComposingRef.current || (e.nativeEvent as any).isComposing) return;
      if (!e.data) return;

      const input = domRef.current;

      if (!input) return;

      const {value, selectionStart, selectionEnd} = input;
      const nextValue =
        value.slice(0, selectionStart ?? 0) + e.data + value.slice(selectionEnd ?? 0);

      if (!numberParser.isValidPartialNumber(nextValue)) {
        e.preventDefault();

        return;
      }

      const parsedValue = numberParser.parse(nextValue);

      if (isNaN(parsedValue)) {
        e.preventDefault();

        return;
      }

      e.preventDefault();

      const formattedValue = numberFormatter.format(parsedValue);

      if (!state.validate(formattedValue)) return;

      // Calculate the position of the cursor after formatting
      // We count how many digits are before the cursor position in the unformatted value + the new digit
      const digitCount =
        (value.slice(0, selectionStart ?? 0).match(/\d/g) || []).length +
        (e.data.match(/\d/g) || []).length;

      state.setInputValue(formattedValue);
      state.setNumberValue(parsedValue);

      restoreCursorPosition(input, formattedValue, digitCount);

      if (onChange) {
        onChange({
          target: {value: formattedValue},
          currentTarget: {value: formattedValue},
        } as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [numberParser, numberFormatter, state, domRef, onChange, restoreCursorPosition],
  );

  return {
    shouldFormat,
    handleCompositionStart,
    handleCompositionEnd,
    handleInput,
    handlePaste,
    handleCut,
    handleBeforeInput,
  };
}

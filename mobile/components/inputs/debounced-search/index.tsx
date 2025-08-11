import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import TextfieldFree from "../textfield-free";

interface DebouncedTextfieldSearchProps {
  delayMs?: number;
  onChangeText: (newValue: string) => void;
  placeholder?: string;
}

export default function DebouncedTextfieldSearch({
  onChangeText,
  placeholder,
  delayMs = 500,
  ...props
}: DebouncedTextfieldSearchProps) {
  const [valueInput, setValueInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounceValue(
    valueInput,
    delayMs
  );

  useEffect(() => {
    onChangeText(debouncedValue);
  }, [debouncedValue]);

  return (
    <TextfieldFree
      {...props}
      placeholder={placeholder}
      value={valueInput}
      onChangeText={(text) => {
        setValueInput(text);
        setDebouncedValue(text);
      }}
    />
  );
}

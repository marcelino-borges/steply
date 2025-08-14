import React from "react";
import { TextInput } from "react-native";
import TextfieldFree, {
  TextfieldFreeProps,
} from "@/components/inputs/textfield-free";

export interface TextAreaProps
  extends Omit<TextfieldFreeProps, "multiline" | "type"> {
  rows?: number;
}

const TextArea = React.forwardRef<TextInput, TextAreaProps>(
  ({ rows = 3, numberOfLines, ...props }, ref) => {
    return (
      <TextfieldFree
        {...props}
        ref={ref}
        multiline={true}
        numberOfLines={numberOfLines || rows}
      />
    );
  }
);

export default TextArea;

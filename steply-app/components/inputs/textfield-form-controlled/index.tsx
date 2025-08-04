import React from "react";
import { Control, Controller } from "react-hook-form";

import TextfieldFree, { TextfieldFreeProps } from "../textfield-free";

interface TextfieldFormControlledProps
  extends Omit<TextfieldFreeProps, "value" | "onChangeText"> {
  control: Control<any, any, any>;
  name: string;
}

const TextfieldFormControlled: React.FC<TextfieldFormControlledProps> = ({
  control,
  name,
  error,
  ...props
}) => {
  return (
    <Controller
      control={control}
      rules={{
        required: props.required,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextfieldFree
          {...props}
          error={error}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
      )}
      name={name}
    />
  );
};

export default TextfieldFormControlled;

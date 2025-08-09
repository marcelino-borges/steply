import React, { useState, useRef, useEffect, FC, ReactNode } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { PropsWithFullwidth } from "@/types/abstractions/fullwidth";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { Mask } from "@react-input/mask";
import { tagsfieldStyles } from "./styles";
import ChallengeTag from "@/components/challenge-tag";

export interface TagsFieldProps
  extends Omit<TextInputProps, "secureTextEntry" | "value" | "onChangeText">,
    PropsWithFullwidth {
  required?: boolean;
  disabled?: boolean;
  error?: string;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagsField = React.forwardRef<TextInput, TagsFieldProps>(
  (
    {
      required,
      disabled = false,
      placeholder,
      fullWidth,
      error,
      onFocus,
      onBlur,
      style,
      tags,
      onAddTag,
      onRemoveTag,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");
    const animatedValue = useRef(new Animated.Value(0)).current;
    const hasValue = value && value.length;
    const shouldShrinkPlaceholder = hasValue || isFocused;

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: shouldShrinkPlaceholder ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [shouldShrinkPlaceholder]);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      // Add tag on blur if there's text
      if (value.trim()) {
        onAddTag(value.trim());
        setValue("");
      }
      onBlur?.(e);
    };

    const handleSubmitEditing = () => {
      // Add tag on Enter key press
      if (value.trim()) {
        onAddTag(value.trim());
        setValue("");
      }
    };

    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(SPACING.md - SPACING["1/4"])],
    });

    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.75],
    });

    return (
      <View style={tagsfieldStyles.root}>
        <View
          style={[tagsfieldStyles.container, fullWidth && { width: "100%" }]}
        >
          <TextInput
            {...props}
            ref={ref}
            value={value}
            style={[
              tagsfieldStyles.input,
              fullWidth && { width: "100%" },
              !!error?.length && tagsfieldStyles.errorBorder,
              disabled && {
                color: COLORS.muted,
              },
              isFocused && { borderColor: COLORS.primary },
              style,
            ]}
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleSubmitEditing}
            returnKeyType="done"
            onChangeText={(text: string) => {
              // Check if user typed a comma
              if (text.includes(",")) {
                // Get the text before the comma
                const tagText = text.replace(",", "").trim();

                // Add the tag if it's not empty
                if (tagText) {
                  onAddTag(tagText);
                  // Clear the input
                  setValue("");
                } else {
                  // If there's no text before comma, just remove the comma
                  setValue("");
                }
              } else {
                setValue(text);
              }
            }}
          />
          <Animated.View
            style={[
              tagsfieldStyles.placeholderBase,
              {
                transform: [{ translateY }, { scale }],
              },
            ]}
          >
            <Typography
              color={!disabled ? COLORS.gray : COLORS.mutedForeground}
              size={shouldShrinkPlaceholder ? "xs" : "base"}
            >
              {placeholder}
            </Typography>
            {required && (
              <Typography
                color={!disabled ? COLORS.error : COLORS.mutedForeground}
                size={shouldShrinkPlaceholder ? "xs" : "sm"}
              >
                *
              </Typography>
            )}
          </Animated.View>

          {!!error?.length && (
            <Text style={tagsfieldStyles.errorFont}>{error}</Text>
          )}
        </View>
        {!!tags?.length && (
          <View style={tagsfieldStyles.tagsContainer}>
            {tags.map((tag, index) => (
              <ChallengeTag
                key={index}
                name={tag}
                onRemove={() => onRemoveTag(tag)}
              />
            ))}
          </View>
        )}
      </View>
    );
  }
);

export default TagsField;

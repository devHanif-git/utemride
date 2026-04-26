import React from "react";
import { View, Text, TextInput, Pressable, type TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

/**
 * Styled text input with optional label, error message, and right icon.
 * Uses UTeM Ride accent background for a soft, branded feel.
 */
export default function InputField({
  label,
  error,
  className,
  rightIcon,
  onRightIconPress,
  ...rest
}: InputFieldProps) {
  return (
    <View className={`w-full ${className ?? ""}`}>
      {label && (
        <Text className="text-sm font-poppins-medium text-gray-700 mb-2">
          {label}
        </Text>
      )}
      <View className="relative">
        <TextInput
          className={`
            w-full px-4 py-4 rounded-xl text-base font-poppins
            bg-accent border
            ${error ? "border-red-400" : "border-accent-dark"}
            text-primary placeholder:text-gray-400
            ${rightIcon ? "pr-12" : ""}
          `}
          placeholderTextColor="#9CA3AF"
          {...rest}
        />
        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            className="absolute right-0 top-0 bottom-0 justify-center px-4"
            hitSlop={8}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
      {error && (
        <Text className="text-xs font-poppins text-red-500 mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}

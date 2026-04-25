import React from "react";
import { View, Text, TextInput, type TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

/**
 * Styled text input with optional label and error message.
 * Uses UTeM Ride accent background for a soft, branded feel.
 */
export default function InputField({
  label,
  error,
  className,
  ...rest
}: InputFieldProps) {
  return (
    <View className={`w-full ${className ?? ""}`}>
      {label && (
        <Text className="text-sm font-poppins-medium text-gray-700 mb-2">
          {label}
        </Text>
      )}
      <TextInput
        className={`
          w-full px-4 py-4 rounded-xl text-base font-poppins
          bg-accent border
          ${error ? "border-red-400" : "border-accent-dark"}
          text-primary placeholder:text-gray-400
        `}
        placeholderTextColor="#9CA3AF"
        {...rest}
      />
      {error && (
        <Text className="text-xs font-poppins text-red-500 mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}

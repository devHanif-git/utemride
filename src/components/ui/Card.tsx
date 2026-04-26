import React from "react";
import { View, ViewProps } from "react-native";

export function Card({ children, style, className, ...props }: ViewProps) {
  return (
    <View
      className={`bg-background rounded-card p-4 shadow-sm elevation-2 ${className || ""}`}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

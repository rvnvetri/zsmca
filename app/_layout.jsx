// app/_layout.jsx
import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  // Wrap everything inside AuthProvider
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}

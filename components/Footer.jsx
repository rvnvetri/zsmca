import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 My App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 12, color: "#555" },
});

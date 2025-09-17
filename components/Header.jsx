import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "./AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>V App</Text>
      {user && <Text style={styles.user}>{user.initials}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: { color: "white", fontSize: 18, fontWeight: "600" },
  user: { color: "white", fontSize: 16, fontWeight: "700" },
});

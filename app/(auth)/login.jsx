// app/(auth)/login.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login, hydrating, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);

  // ✅ Navigate only after hydration
  useEffect(() => {
    if (!hydrating && user) {
      router.replace("/home");
    }
  }, [hydrating, user]);

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "All fields required.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Validation", "Invalid email.");
      return;
    }

    try {
      setBusy(true);
      await login(email, password, remember);
      router.replace("/home");
    } catch (err) {
      console.log(err);
      Alert.alert("Login failed", "Invalid credentials or server error.");
    } finally {
      setBusy(false);
    }
  };

  if (hydrating) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {/* ✅ Header with Logo */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.png")} // put your logo in assets/logo.png
          style={styles.logo}
        />
        <Text style={styles.headerText}>MyApp</Text>
      </View>

      {/* ✅ Login Form */}
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <View style={styles.rememberRow}>
          <Checkbox value={remember} onValueChange={setRemember} />
          <Text style={{ marginLeft: 8 }}>Remember me</Text>
        </View>

        {busy ? (
          <ActivityIndicator />
        ) : (
          <Button title="Login" onPress={onSubmit} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#2563eb", // nice blue
  },
  logo: { width: 80, height: 80, marginBottom: 10, borderRadius: 40 },
  headerText: { fontSize: 22, fontWeight: "bold", color: "white" },
  form: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, fontWeight: "bold", textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "white",
  },
  rememberRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
});

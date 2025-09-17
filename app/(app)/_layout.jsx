// app/(app)/_layout.jsx
import React from "react";
import { Drawer } from "expo-router/drawer";
import { useAuth } from "../../context/AuthContext";
import { Redirect } from "expo-router";
import CustomDrawerContent from "../../components/CustomDrawerContent";

export default function AppLayout() {
  const { user, hydrating } = useAuth();

  if (hydrating) return null; // wait until auth loads
  if (!user) return <Redirect href="/login" />; // redirect if not logged in

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="register" options={{ title: "Register" }} />
      <Drawer.Screen name="aboutus" options={{ title: "About Us" }} />
    </Drawer>
  );
}

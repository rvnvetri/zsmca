// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api, setAuthToken } from "../utils/api";

const AuthContext = createContext();

const USER_KEY = "auth_user";
const TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // e.g., { email, name, initials }
  const [token, setTokenState] = useState(null);
  const [hydrating, setHydrating] = useState(true);

  // Load saved credentials from SecureStore on startup
  useEffect(() => {
    (async () => {
      try {
        const [savedUser, savedToken] = await Promise.all([
          SecureStore.getItemAsync(USER_KEY),
          SecureStore.getItemAsync(TOKEN_KEY),
        ]);
        if (savedUser && savedToken) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setTokenState(savedToken);
          setAuthToken(savedToken);
        }
      } finally {
        setHydrating(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    // 👇 Call your .NET endpoint. Adjust path/body to match your API.
    // Expected response: { token: "jwt...", user: { email, name? } }
    //const res = await api.post("/api/auth/login", { email, password });
    const res = await api.post("/auth/login",{Username:email,password:password,Role:"Student"});              
    alert(JSON.stringify(res));  
    const tokenValue = res.data?.token;
    // Build user object; adapt to your API's user shape:
    const name = res.data?.user?.name || email;
    const initials =
      (name || email)
        .split(/\s|@/)[0]
        ?.substring(0, 1)
        .toUpperCase() || "U";

    const userObj = { email, name, initials };

    // Save in memory
    setUser(userObj);
    setTokenState(tokenValue);
    setAuthToken(tokenValue);

    // Persist securely
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userObj));
    await SecureStore.setItemAsync(TOKEN_KEY, tokenValue);

    return true;
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(USER_KEY);
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } finally {
      setUser(null);
      setTokenState(null);
      setAuthToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, hydrating, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

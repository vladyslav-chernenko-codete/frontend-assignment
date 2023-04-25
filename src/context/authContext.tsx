import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }
  };

  const handleLogin = () => {
    const newToken = uuidv4();
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checkAuth, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

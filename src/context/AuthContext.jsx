import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("admin_token") || null
  );

  const isAdmin = token !== null;

  function login(receivedToken) {
    localStorage.setItem("admin_token", receivedToken);
    setToken(receivedToken);
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
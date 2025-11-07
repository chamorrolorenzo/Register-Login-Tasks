import { createContext, useContext, useEffect, useState } from "react";

const LoginContext = createContext(null);
const LoggedState = "userLoggedIn"; // clave para localStorage

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Al montar: leer sesión persistida
  useEffect(() => {
    const flag = localStorage.getItem(LoggedState);
    setIsLoggedIn(flag === "true");
  }, []);

  // ⬅️ ESTA FUNCIÓN ES LA QUE TE FALTA
  function login() {
    localStorage.setItem(LoggedState, "true");
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem(LoggedState);
    setIsLoggedIn(false);
  }

  // ⬅️ IMPORTANTE: incluir login en el value
  const value = { isLoggedIn, login, logout };
  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export function useLogin() {
  const ctx = useContext(LoginContext);
  if (!ctx) throw new Error("useLogin debe usarse dentro de <LoginProvider>");
  return ctx;
}

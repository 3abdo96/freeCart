import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // localStorage.setItem("token", token);
    // localStorage.setItem("email", email);
    setToken(localStorage.getItem("token"));
    setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <authContext.Provider value={{ token, setToken, email, setEmail }}>
      {children}
    </authContext.Provider>
  );
}

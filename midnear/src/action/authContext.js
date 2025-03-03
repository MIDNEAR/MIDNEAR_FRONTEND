import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("jwtToken"));
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo") || "{}"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("jwtToken"));
      setUserInfo(JSON.parse(localStorage.getItem("userInfo") || "{}"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

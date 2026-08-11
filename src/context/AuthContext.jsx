import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../api/userApi";
import { clearStorage, getStorage, setStorage } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getStorage("token");
    const userData = getStorage("userData");

    if (token && userData) {
      setUser(userData);
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    // localStorage.setItem("token", data.token);
    setStorage("token", data.token);
    setStorage("menuList", data.userDetails.menuPermissions);

    setStorage("userData", data.userDetails);
    setUser(data.userDetails);
    setLoading(false);
    // console.log("JANA@",data);
  };

  const logout = () => {
    // localStorage.removeItem("token");
    clearStorage();
    setUser(null);
    // navigate('/')
  };
  if (status === 401) {
    clearStorage();
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

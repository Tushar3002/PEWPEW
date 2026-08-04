import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/userApi";
import { clearStorage, setStorage } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  // const navigate=useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const user = await getCurrentUser();

        setUser(user.data);
        // console.log("Get Current",user);
      } catch {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  const login = (data) => {
    localStorage.setItem("token", data.token);
    setStorage("menuList", data.userDetails.menuPermissions);

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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (loginInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/login",
        loginInfo
      );
      setUser(response.data.data.username);
      localStorage.setItem("usertoken", response.data.data.token);
    } catch (error) {
      console.log(error.message);
      throw new Error("Error Login In");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("usertoken", "");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

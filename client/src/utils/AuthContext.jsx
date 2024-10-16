// src/utils/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const rootAPI = import.meta.env.VITE_API_URL;
const postEP = rootAPI + "/post";
const authEP = rootAPI + "/auth";
const userEP = rootAPI + "/user";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (loginInfo) => {
    try {
      const response = await axios.post(`${authEP}/login`, loginInfo);
      const { token, username } = response.data.data;
      localStorage.setItem("jwtToken", token);
      setUser(username);
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken"); // Clear the token on logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

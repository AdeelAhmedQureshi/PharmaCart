import React, { createContext, useState, useEffect } from "react";

export const LogInContext = createContext();

export function LogInProvider({ children }) {
  const [isLogIn, setisLogIn] = useState(!!localStorage.getItem("token"));
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("isAdmin")) === true // isAdmin point to boolean here
  );
  const [userAddress, setUserAddress] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userFullName");
    const email = localStorage.getItem("userEmail");
    const admin = JSON.parse(localStorage.getItem("isAdmin"));

    if (name) setUserFullName(name);
    if (email) setUserEmail(email);
    if (admin !== null) setIsAdmin(admin);
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true"); // Save login state to localStorage
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin"); // Remove login state from localStorage
  };
  return (
    <LogInContext.Provider
      value={{
        isLogIn,
        setisLogIn,
        userFullName,
        setUserFullName,
        userEmail,
        setUserEmail,
        isAdmin,
        setIsAdmin,
        setUserAddress,
        userAddress,
        userPhoneNumber,
        setUserPhoneNumber,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </LogInContext.Provider>
  );
}

import React, { createContext, useState, useEffect } from "react";

export const LogInContext = createContext();

export function LogInProvider({ children }) {
  const [isLogIn, setisLogIn] = useState(!!localStorage.getItem("token"));
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("isAdmin")) === true // isAdmin point to boolean here
  );

  useEffect(() => {
    const name = localStorage.getItem("userFullName");
    const email = localStorage.getItem("userEmail");
    const admin = JSON.parse(localStorage.getItem("isAdmin"));

    if (name) setUserFullName(name);
    if (email) setUserEmail(email);
    if (admin !== null) setIsAdmin(admin);
  }, []);

  return (
    <LogInContext.Provider
      value={{
        isLogIn,
        setisLogIn,
        userFullName,
        userEmail,
        setUserEmail,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </LogInContext.Provider>
  );
}

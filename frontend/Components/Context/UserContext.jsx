import React, { createContext, useState, useEffect } from "react";

export const LogInContext = createContext();

export function LogInProvider({ children }) {
  const [isLogIn, setisLogIn] = useState(!!localStorage.getItem("token"));
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userFullName");
    const email = localStorage.getItem("userEmail");
    if (name && email) {
      setUserFullName(name);
      setUserEmail(email);
    }
  }, []);

  return (
    <LogInContext.Provider value={{ isLogIn, setisLogIn, userFullName, userEmail,setUserEmail ,}}>
      {children}
    </LogInContext.Provider>
  );
}

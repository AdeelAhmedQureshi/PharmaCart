import React, { createContext, useState, useEffect } from "react";

export const LogInContext = createContext();

export function LogInProvider({ children }) {
  const [isLogIn, setisLogIn] = useState(!!localStorage.getItem("token"));
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userFullName");
    const email = localStorage.getItem("userEmail");
    const phoneNumber = localStorage.getItem("userPhoneNumber");
    const address = localStorage.getItem("userAddress");
    if (name && email && phoneNumber && address) {
      setUserFullName(name);
      setUserEmail(email);
      setUserPhoneNumber(phoneNumber);
      setUserAddress(address);
    }
  }, []);

  return (
    <LogInContext.Provider
      value={{
        isLogIn,
        setisLogIn,
        userFullName,
        userEmail,
        setUserEmail,
        setUserFullName,
        userPhoneNumber,
        setUserPhoneNumber,
        userAddress,
        setUserAddress,
      }}
    >
      {children}
    </LogInContext.Provider>
  );
}
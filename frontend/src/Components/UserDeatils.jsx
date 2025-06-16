import React from "react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import "./UserDetails.css";
import { LogInContext } from "./Context/UserContext";

export function UserDetails({ setShowUserDetails }) {
  const onClose = () => {
    setShowUserDetails(false);
  };
  const { setisLogIn ,userFullName,userEmail } = React.useContext(LogInContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setisLogIn(false);
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhoneNumber");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("isAdmin")
  };
  //const name=userFullName.charAt(0).toUpperCase() + userFullName.slice(1).toLowerCase();
  return (
    <div className="user-details-backdrop">
      <div className="user-details-sidebar">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="username">{userFullName}</h2>
        <h3 className="user-info"> <strong>{userEmail}</strong></h3>
        <hr style={{ borderTop: "2px solid black"}} />

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

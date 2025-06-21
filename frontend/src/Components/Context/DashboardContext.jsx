// DashboardContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { LogInContext } from "./UserContext";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { isAdmin } = useContext(LogInContext); // ✅ moved inside component
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalEarnings: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || token === "undefined") {
        console.warn("No valid token found. User might be logged out.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        console.warn("Access denied: User is not an admin or token expired.");
        return;
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]); // ✅ dependency added to trigger when `isAdmin` becomes true

  return (
    <DashboardContext.Provider value={{ stats, fetchStats }}>
      {children}
    </DashboardContext.Provider>
  );
};

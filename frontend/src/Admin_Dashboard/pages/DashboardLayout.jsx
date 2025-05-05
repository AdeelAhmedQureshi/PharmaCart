import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Adjust path if needed
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar Section */}
      <aside
        className={`transition-all duration-300 bg-gray-900 text-white shadow-lg z-20
          ${isSidebarOpen ? "w-64" : "w-16"}`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </aside>

      {/* Main Content Section */}
      <main
        className={`flex-1 transition-all duration-300 p-4 md:p-8
          ${isSidebarOpen ? "ml-64" : "ml-16"}`}
      >
        <div className="bg-white rounded-xl shadow-xl p-4 md:p-8 w-full h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

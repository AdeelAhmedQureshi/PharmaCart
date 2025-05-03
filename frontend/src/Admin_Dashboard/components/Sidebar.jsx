import { useState } from "react";
import {
  FaHome,
  FaUser,
  FaBox,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`h-screen bg-[rgb(74,200,235)] text-white transition-all duration-300 shadow-2xl flex flex-col justify-between ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Admin Info */}
        <div className="flex items-center justify-center gap-4 p-3">
          <img
            src="/admin-avatar.png"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
          {isOpen && (
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">PharmaCart</h3>
              <h3 className="text-md font-semibold truncate">Admin</h3>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-8 px-3 mt-8">
          <SidebarItem icon={<FaHome />} text="Dashboard" isOpen={isOpen} />
          <SidebarItem icon={<FaUser />} text="Profile" isOpen={isOpen} />
          <SidebarItem icon={<FaUsers />} text="Customers" isOpen={isOpen} />
          <SidebarItem icon={<FaBox />} text="Products" isOpen={isOpen} />
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mb-6 px-3">
        <button className="flex flex-col items-center justify-center w-full p-3 rounded-lg bg-blue-800 hover:bg-blue-700 transition-all text-sm font-semibold">
          <FaSignOutAlt className="text-xl mb-1" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isOpen }) => {
  return (
    <div className="flex flex-col items-center text-center gap-1 p-3 rounded-lg cursor-pointer transition-all hover:bg-blue-700 text-sm font-semibold">
      <div className="text-xl">{icon}</div>
      {isOpen && <span>{text}</span>}
    </div>
  );
};

export default Sidebar;

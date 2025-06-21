import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaCrown } from "react-icons/fa";

const Profile = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/admin/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch profile: ${errorText}`);
        }

        const data = await response.json();
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching admin profile:", error.message);
      }
    };

    fetchAdminProfile();
  }, []);

  if (!adminData) {
    return (
      <div className="text-center text-lg font-medium text-gray-500 pt-10">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center pt-16 pb-12">
      {/* Admin Name at Top */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        {adminData.fullname}
      </h1>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center relative">
        {/* Avatar */}
        <div className="relative mb-4">
          <FaUserCircle className="text-blue-300 text-[120px] drop-shadow-lg" />
          <span className="absolute bottom-2 right-2 bg-yellow-400 border-2 border-white w-8 h-8 flex items-center justify-center rounded-full shadow">
            <FaCrown className="text-white text-lg" />
          </span>
        </div>

        {/* Name & Role */}
        <h2 className="text-2xl font-bold text-gray-800">
          {adminData.fullname || "N/A"}
        </h2>
        <span className="mt-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center gap-1">
          <FaCrown className="text-yellow-500" />
          {adminData.isAdmin ? "Administrator" : "User"}
        </span>

        {/* Contact Info */}
        <div className="w-full mt-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-600 justify-center">
            <FaEnvelope className="text-blue-500" />
            <span className="font-medium">{adminData.email || "N/A"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

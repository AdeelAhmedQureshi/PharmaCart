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
          const errorText = await response.text(); // for debugging
          throw new Error(`Failed to fetch profile: ${errorText}`);
        }

        const data = await response.json();
        console.log(data);
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching admin profile:", error.message);
      }
    };

    fetchAdminProfile();
  }, []);

  if (!adminData) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <FaUserCircle className="text-8xl text-blue-600" />
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Admin Profile</h2>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaUserCircle className="text-blue-500" />
              <span className="font-medium">Name:</span>{" "}
              {adminData.fullName || "N/A"}
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaEnvelope className="text-green-500" />
              <span className="font-medium">Email:</span>{" "}
              {adminData.email || "N/A"}
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaCrown className="text-yellow-500" />
              <span className="font-medium">Role:</span>{" "}
              {adminData.isAdmin ? "Administrator" : "User"}
            </div>
          </div>

          <div className="pt-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

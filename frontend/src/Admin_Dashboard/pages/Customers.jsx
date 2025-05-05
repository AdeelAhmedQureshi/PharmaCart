import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter((user) =>
    [user.fullname, user.email, user.phoneNumber, user.address]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        All Customers
      </h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search customers by name, email, phone, or address..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name & Email</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">Phone & Address</th>
              <th className="py-3 px-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition-all`}
              >
                {/* # */}
                <td className="py-3 px-4 font-medium text-center">
                  {index + 1}
                </td>

                {/* Name & Email */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-blue-500" />
                    <span>{user.fullname}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <FaEnvelope className="text-green-500" />
                    <span>{user.email}</span>
                  </div>
                </td>

                {/* Gender */}
                <td className="py-3 px-4 capitalize text-center">
                  {user.gender}
                </td>

                {/* Phone & Address */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-gray-500" />
                    <span>{user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <FaMapMarkerAlt className="text-red-400" />
                    <span className="truncate max-w-xs">{user.address}</span>
                  </div>
                </td>

                {/* Joined */}
                <td className="py-3 px-4 text-center">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
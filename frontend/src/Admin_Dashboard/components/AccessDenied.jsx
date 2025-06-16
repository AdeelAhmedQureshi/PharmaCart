import React from "react";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Icon or Illustration */}
      <div className="mb-8">
        <img
          src="/assets/access-denied.png" 
          alt="Access Denied"
          className="w-64"
        />
      </div>

      <h1 className="text-4xl font-extrabold text-red-600 mb-4">
        Access Denied
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        You do not have the necessary permissions to access this page. Admins only!
      </p>

      <button
        onClick={handleBackToHome}
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default AccessDenied;

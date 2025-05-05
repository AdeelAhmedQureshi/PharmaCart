import React from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Adjust the route as per your dashboard route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Illustration */}
        <div className="mb-8">
          <img
            src="/404-illustration.svg" // Replace with your illustration or image path
            alt="Page Not Found"
            className="w-64 mx-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Back to Dashboard Button */}
        <button
          onClick={handleBackToDashboard}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Page404;
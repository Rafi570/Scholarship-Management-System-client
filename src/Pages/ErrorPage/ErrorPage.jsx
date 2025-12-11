import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f8ff] px-6">
      <div className="text-center max-w-md">
        {/* Big Error Code */}
        <h1 className="text-9xl font-extrabold text-[#1e3a8a] mb-4">404</h1>

        {/* Message */}
        <h2 className="text-3xl font-bold text-[#1e3a8a] mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-700 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* Redirect Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

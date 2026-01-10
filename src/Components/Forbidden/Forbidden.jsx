import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();
      useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f8ff] px-6">
      <div className="text-center max-w-md">
        {/* Big Error Code */}
        <h1 className="text-9xl font-extrabold text-[#1e3a8a] mb-4">403</h1>

        {/* Message */}
        <h2 className="text-3xl font-bold text-[#1e3a8a] mb-2">
          Access Forbidden
        </h2>
        <p className="text-gray-700 mb-6">
          Oops! You don’t have permission to access this page.
        </p>

        {/* Redirect Button */}
        <button
          onClick={() => navigate("/auth/login")}
          className="bg-primary text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Forbidden;

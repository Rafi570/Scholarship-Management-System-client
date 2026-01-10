import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
      useEffect(() => {
      const savedTheme = localStorage.getItem("theme") || "light";
      document.querySelector("html").setAttribute("data-theme", savedTheme);
    }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f8ff] dark:bg-gray-950 px-6 transition-colors duration-300">
      <div className="text-center max-w-md">
        {/* Big Error Code with Gradient */}
        <h1 className="text-9xl font-extrabold mb-4 bg-gradient-to-b from-[#1e3a8a] to-blue-500 dark:from-primary dark:to-green-400 bg-clip-text text-transparent">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl font-bold text-[#1e3a8a] dark:text-gray-100 mb-2">
          Page Not Found
        </h2>
        
        <p className="text-gray-700 dark:text-gray-400 mb-8">
          Sorry, the page you are looking for does not exist or has been moved. 
          Check the URL or head back home.
        </p>

        {/* Buttons - Dual Option */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-[#2e9974] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            Go to Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
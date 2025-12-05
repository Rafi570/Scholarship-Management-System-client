import React, { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt...");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3 pb-6">
        <div className="flex w-full flex-col gap-2">
          <p className="text-gray-900 text-3xl font-black leading-tight tracking-[-0.033em]">
            Welcome Back!
          </p>
          <p className="text-gray-500 text-base font-normal leading-normal">
            Log in to your account to continue your scholarship journey.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        {/* TextField: Email */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">
            Email or Username
          </p>
          <input
            className="form-input w-full rounded-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] text-base placeholder:text-gray-500 focus:border-primary outline-none"
            placeholder="Enter your email or username"
            type="text"
          />
        </label>

        {/* TextField: Password */}
        <label className="flex flex-col w-full">
          <div className="flex justify-between items-center pb-2">
            <p className="text-gray-900 text-base font-medium">
              Password
            </p>
            <Link
              className="text-primary text-sm underline hover:text-primary/80"
              to="#"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex w-full items-stretch rounded-lg">
            <input
              className="form-input w-full rounded-l-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] pr-2 text-base placeholder:text-gray-500 focus:border-primary outline-none"
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
            />

            <button
              type="button"
              aria-label="Toggle password visibility"
              className="text-gray-500 border border-gray-200 bg-white px-4 rounded-r-lg border-l-0 hover:bg-gray-50"
              onClick={togglePasswordVisibility}
            >
              <span className="material-symbols-outlined">
                {passwordVisible ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </label>

        {/* Login Button */}
        <button
          type="submit"
          className="flex items-center justify-center p-4 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary/90 h-14 mt-4"
        >
          Log In
        </button>
      </form>

      {/* Registration Link */}
      <p className="text-center text-gray-500 text-sm font-normal pt-4">
        Don't have an account?
        <Link
          className="font-semibold text-primary underline hover:text-primary/80"
          to="/auth/register"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;

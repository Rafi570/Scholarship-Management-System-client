import React, { useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registration attempt...");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3 pb-6">
        <div className="flex w-full flex-col gap-2">
          <p className="text-gray-900 text-3xl font-black leading-tight tracking-[-0.033em]">
            Join Today!
          </p>
          <p className="text-gray-500 text-base font-normal leading-normal">
            Create your account to start your scholarship journey.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">

        {/* TextField: Name */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">Full Name</p>
          <input
            className="form-input w-full rounded-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] text-base placeholder:text-gray-500 focus:border-primary outline-none"
            placeholder="Enter your full name"
            type="text"
            required
          />
        </label>

        {/* TextField: Email */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">Email</p>
          <input
            className="form-input w-full rounded-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] text-base placeholder:text-gray-500 focus:border-primary outline-none"
            placeholder="Enter your email address"
            type="email"
            required
          />
        </label>

        {/* TextField: Photo URL */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">Photo URL</p>
          <input
            className="form-input w-full rounded-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] text-base placeholder:text-gray-500 focus:border-primary outline-none"
            placeholder="Enter your profile photo URL"
            type="text"
            required
          />
        </label>

        {/* TextField: Password */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">Password</p>

          <div className="flex w-full items-stretch rounded-lg">
            <input
              className="form-input w-full rounded-l-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] pr-2 text-base placeholder:text-gray-500 focus:border-primary outline-none"
              placeholder="Create a password"
              type={passwordVisible ? "text" : "password"}
              required
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

        {/* Sign Up Button */}
        <button
          type="submit"
          className="flex items-center justify-center p-4 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary/90 h-14 mt-4"
        >
          Sign Up
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-gray-500 text-sm font-normal pt-4">
        Already have an account?{" "}
        <Link
          className="font-semibold text-primary underline hover:text-primary/80"
          to="/auth/login"
        >
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;

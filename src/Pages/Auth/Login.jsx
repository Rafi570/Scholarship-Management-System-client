import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

/* -------- Demo Credentials -------- */
const DEMO_USERS = {
  moderator: {
    email: "moderator@gmail.com",
    password: "Rafi570@",
  },
  admin: {
    email: "admin@gmail.com",
    password: "Rafi570@",
  },
};

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser, signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* -------- Normal Login -------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await signInUser(email, password);
      toast.success("Login successful!");
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Login failed! Check your credentials.");
    }
  };

  /* -------- Demo Login -------- */
  const handleDemoLogin = async (role) => {
    const { email, password } = DEMO_USERS[role];
    setFormData({ email, password });

    try {
      await signInUser(email, password);
      toast.success(`Demo ${role} login successful!`);
      navigate(location.state || "/");
    } catch {
      toast.error("Demo login failed!");
    }
  };

  /* -------- Google Login -------- */
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();
      const googleUser = result.user;

      const newUser = {
        name: googleUser.displayName,
        email: googleUser.email,
        photoURL: googleUser.photoURL,
        role: "student",
        createdAt: new Date(),
      };

      await axiosSecure.post("/users", newUser);
      toast.success("Welcome back!");
      navigate(location.state || "/");
    } catch {
      toast.error("Google Sign-In failed!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 pb-6">
        <div className="flex w-full flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
            Welcome Back!
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal">
            Log in to your account to continue your scholarship journey.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        {/* Email */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 dark:text-gray-200 text-base font-medium pb-2">
            Email or Username
          </p>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-14 p-[15px] focus:border-primary outline-none transition-colors"
            placeholder="Enter your email"
            type="text"
            required
          />
        </label>

        {/* Password */}
        <label className="flex flex-col w-full">
          <div className="flex justify-between items-center pb-2">
            <p className="text-gray-900 dark:text-gray-200 text-base font-medium">
              Password
            </p>
            <Link
              className="text-primary text-sm underline hover:text-primary/80"
              to="/auth/forgot-pass"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex w-full items-stretch">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-l-lg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-14 p-[15px] focus:border-primary outline-none transition-colors"
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
              required
            />
            <button
              type="button"
              className="text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 rounded-r-lg border-l-0 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={togglePasswordVisibility}
            >
              <span className="material-symbols-outlined text-xl">
                {passwordVisible ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </label>

        {/* Login Button */}
        <button
          type="submit"
          className="flex items-center justify-center p-4 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary/90 h-14 mt-4 transition-all"
        >
          Log In
        </button>
      </form>

      {/* ✅ Demo Buttons (same design style) */}
      {/* Demo Buttons */}
      <div className="flex gap-3 mt-4">
        {/* Demo Moderator - Blue */}
        <button
          type="button"
          onClick={() => handleDemoLogin("moderator")}
          className="flex items-center justify-center w-full h-14 rounded-lg 
               border border-blue-500 text-blue-600 dark:text-blue-400 
               bg-white dark:bg-gray-800 font-medium
               hover:bg-blue-50 dark:hover:bg-gray-700 transition-all"
        >
          Demo Moderator
        </button>

        {/* Demo Admin - Red */}
        <button
          type="button"
          onClick={() => handleDemoLogin("admin")}
          className="flex items-center justify-center w-full h-14 rounded-lg 
               border border-red-500 text-red-600 dark:text-red-400 
               bg-white dark:bg-gray-800 font-medium
               hover:bg-red-50 dark:hover:bg-gray-700 transition-all"
        >
          Demo Admin
        </button>
      </div>

      {/* OR */}
      <div className="flex items-center gap-3 pt-4">
        <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">OR</p>
        <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-14 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium mt-4 transition-all"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-6 h-6"
        />
        Continue with Google
      </button>

      {/* Register */}
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm font-normal pt-4">
        Don't have an account?{" "}
        <Link
          className="font-semibold text-primary underline"
          to="/auth/register"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;

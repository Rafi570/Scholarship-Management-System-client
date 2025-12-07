import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signInUser, signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill all fields!");
      return;
    }
    try {
      await signInUser(email, password);
      toast.success("Login successful!");
      setFormData({ email: "", password: "" });
      navigate(location.state || "/"); // Redirect after login
    } catch (error) {
      console.error(error);
      toast.error("Login failed! Check your credentials.");
    }
  };

  // Google Sign-In
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

      // Save Google user to DB
      const response = await axiosSecure.post("/users", newUser);
      if (response.data.message === "user exists") {
        toast.success("Welcome back!");
      } else {
        toast.success("Login successful via Google!");
      }

      navigate(location.state || "/");
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-In failed!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-right" reverseOrder={false} />

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

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        {/* Email */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">
            Email or Username
          </p>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input w-full rounded-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] text-base placeholder:text-gray-500 focus:border-primary outline-none"
            placeholder="Enter your email or username"
            type="text"
            required
          />
        </label>

        {/* Password */}
        <label className="flex flex-col w-full">
          <div className="flex justify-between items-center pb-2">
            <p className="text-gray-900 text-base font-medium">Password</p>
            <Link
              className="text-primary text-sm underline hover:text-primary/80"
              to="/auth/forgot-pass"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex w-full items-stretch rounded-lg">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input w-full rounded-l-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] pr-2 text-base placeholder:text-gray-500 focus:border-primary outline-none"
              placeholder="Enter your password"
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

        {/* Login Button */}
        <button
          type="submit"
          className="flex items-center justify-center p-4 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary/90 h-14 mt-4"
        >
          Log In
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 pt-4">
        <div className="h-px w-full bg-gray-300"></div>
        <p className="text-gray-500 text-sm">OR</p>
        <div className="h-px w-full bg-gray-300"></div>
      </div>

      {/* Google Sign In */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white h-14 hover:bg-gray-50 text-gray-700 font-medium mt-4"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-6 h-6"
        />
        Continue with Google
      </button>

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

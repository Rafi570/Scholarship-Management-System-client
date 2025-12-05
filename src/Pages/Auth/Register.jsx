import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { registerUser, updateUserProfile, signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (!hasCapital) {
      toast.error("Password must contain at least one uppercase letter");
      return false;
    }
    if (!hasSpecial) {
      toast.error("Password must contain at least one special character");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    if (!validatePassword(password)) return;

    try {
      // Register user with email/password
      const userCredential = await registerUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });

      // Save user to DB
      const newUser = { name, email, photoURL, role: "student", createdAt: new Date() };
      const response = await axiosSecure.post("/users", newUser);

      if (response.data.message === "user exists") {
        toast.error("User already exists!");
      } else {
        toast.success("Registration successful!");
        setFormData({ name: "", email: "", photoURL: "", password: "" });
        // navigate("/");
        navigate(location.state || '/');
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed! Try again.");
    }
  };

  // Google Sign-In with DB storage
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle(); // Firebase Google sign-in
      const googleUser = result.user;

      const newUser = {
        name: googleUser.displayName,
        email: googleUser.email,
        photoURL: googleUser.photoURL,
        role: "student",
        createdAt: new Date(),
      };

      // Post user to DB
      const response = await axiosSecure.post("/users", newUser);

      if (response.data.message === "user exists") {
        toast.success("Welcome back!");
      } else {
        toast.success("Registration successful via Google!");
      }

      navigate("/"); // Redirect after success
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
            Join Today!
          </p>
          <p className="text-gray-500 text-base font-normal leading-normal">
            Create your account to start your scholarship journey.
          </p>
        </div>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        {/* Full Name */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">Full Name</p>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input w-full rounded-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] text-base placeholder:text-gray-500 focus:border-primary outline-none"
            placeholder="Enter your full name"
            type="text"
            required
          />
        </label>

        {/* Email */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">Email</p>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input w-full rounded-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] text-base placeholder:text-gray-500 focus:border-primary outline-none"
            placeholder="Enter your email address"
            type="email"
            required
          />
        </label>

        {/* Photo URL */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">Photo URL</p>
          <input
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="form-input w-full rounded-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] text-base placeholder:text-gray-500 focus:border-primary outline-none"
            placeholder="Enter your profile photo URL"
            type="text"
            required
          />
        </label>

        {/* Password */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">Password</p>
          <div className="flex w-full items-stretch rounded-lg">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
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

        <button
          type="submit"
          className="flex items-center justify-center p-4 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary/90 h-14 mt-4"
        >
          Sign Up
        </button>
      </form>

      <div className="flex items-center gap-3 pt-4">
        <div className="h-px w-full bg-gray-300"></div>
        <p className="text-gray-500 text-sm">OR</p>
        <div className="h-px w-full bg-gray-300"></div>
      </div>

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

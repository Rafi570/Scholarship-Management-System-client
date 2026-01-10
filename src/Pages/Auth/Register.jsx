import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { registerUser, updateUserProfile, signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = (password) => {
    if (password.length < 6) { toast.error("At least 6 characters long"); return false; }
    if (!/[A-Z]/.test(password)) { toast.error("Need one uppercase letter"); return false; }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) { toast.error("Need one special character"); return false; }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;
    if (!validatePassword(password)) return;

    try {
      await registerUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      const newUser = { name, email, photoURL, role: "student", createdAt: new Date() };
      await axiosSecure.post("/users", newUser);
      toast.success("Registration successful!");
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();
      const googleUser = result.user;
      const newUser = { name: googleUser.displayName, email: googleUser.email, photoURL: googleUser.photoURL, role: "student", createdAt: new Date() };
      await axiosSecure.post("/users", newUser);
      toast.success("Welcome back!");
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Google Sign-In failed!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-wrap justify-between gap-3 pb-6">
        <div className="flex w-full flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
            Join Today!
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
            Create your account to start your scholarship journey.
          </p>
        </div>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        {["name", "email", "photoURL"].map((field) => (
          <label key={field} className="flex flex-col w-full">
            <p className="text-gray-900 dark:text-gray-200 text-base font-medium pb-2 capitalize">
              {field === "photoURL" ? "Photo URL" : field.replace(/([A-Z])/g, ' $1')}
            </p>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full rounded-lg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-14 p-[15px] focus:border-primary outline-none transition-colors"
              placeholder={`Enter your ${field}`}
              type={field === "email" ? "email" : "text"}
              required
            />
          </label>
        ))}

        <label className="flex flex-col w-full">
          <p className="text-gray-900 dark:text-gray-200 text-base font-medium pb-2">Password</p>
          <div className="flex w-full items-stretch">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-l-lg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-14 p-[15px] focus:border-primary outline-none transition-colors"
              placeholder="Create a password"
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

        <button type="submit" className="flex items-center justify-center p-4 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary/90 h-14 mt-4 transition-all">
          Sign Up
        </button>
      </form>

      <div className="flex items-center gap-3 pt-4">
        <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">OR</p>
        <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-14 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium mt-4 transition-all"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
        Continue with Google
      </button>

      <p className="text-center text-gray-500 dark:text-gray-400 text-sm font-normal pt-4">
        Already have an account?{" "}
        <Link className="font-semibold text-primary underline" to="/auth/login">Log In</Link>
      </p>
    </div>
  );
};

export default Register;
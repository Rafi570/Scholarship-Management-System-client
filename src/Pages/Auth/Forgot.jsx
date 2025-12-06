// src/pages/auth/Forgot.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Check your inbox/spam.");
      setEmail("");
      // অপশনাল: ৩ সেকেন্ড পর লগইন পেজে রিডাইরেক্ট
      setTimeout(() => navigate("/auth/login"), 3000);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else {
        toast.error("Failed to send reset email. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 pb-6">
        <div className="flex w-full flex-col gap-2">
          <p className="text-gray-900 text-3xl font-black leading-tight tracking-[-0.033em]">
            Forgot Password?
          </p>
          <p className="text-gray-500 text-base font-normal leading-normal">
            No worries! Enter your email and we’ll send you a password reset
            link.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Email Field */}
        <label className="flex flex-col w-full">
          <p className="text-gray-900 text-base font-medium pb-2">
            Email Address
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input w-full rounded-lg text-gray-900 border border-gray-200 bg-white h-14 p-[15px] text-base placeholder:text-gray-500 focus:border-primary outline-none"
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={
            loading
              ? "flex items-center justify-center p-4 text-base font-semibold text-white/70 bg-primary/70 rounded-lg h-14 cursor-not-allowed"
              : "flex items-center justify-center p-4 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary/90 h-14"
          }
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      {/* Back to Login */}
      <p className="text-center text-gray-500 text-sm font-normal pt-6">
        Remember your password?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-primary underline hover:text-primary/80"
        >
          Back to Log In
        </Link>
      </p>
    </div>
  );
};

export default Forgot;

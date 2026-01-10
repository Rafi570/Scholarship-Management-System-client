import React from "react";
import { useNavigate, useSearchParams } from "react-router";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get("trackingId");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-[2.5rem] p-8 md:p-12 max-w-md w-full text-center border-t-8 border-red-500 transition-all">

        {/* Cancel icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center text-5xl shadow-inner">
            ✕
          </div>
        </div>

        <h2 className="text-3xl font-black text-red-600 dark:text-red-500 mb-3 tracking-tight">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">
          Your payment was not completed. If this was a mistake, you can try again from your applications list.
        </p>

        {/* Optional tracking info */}
        {trackingId && (
          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/30 mb-8">
            <span className="text-[10px] uppercase font-black text-red-400 tracking-widest block mb-1">Tracking ID</span>
            <p className="text-gray-800 dark:text-gray-200 font-bold font-mono">
              {trackingId}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/dashboard/my-applicatioin")}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-lg shadow-red-600/20 transition-all active:scale-95"
          >
            Go to My Applications
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
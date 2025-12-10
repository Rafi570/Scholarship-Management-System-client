import React from "react";
import { useNavigate, useSearchParams } from "react-router";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get("trackingId"); // Optional if you passed trackingId in cancel URL

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center border-t-4 border-red-500">

        {/* Cancel icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-5xl">
            ✕
          </div>
        </div>

        <h2 className="text-3xl font-bold text-red-600 mb-2">
          Payment Cancelled
        </h2>

        <p className="text-gray-700 mb-4">
          Your payment was not completed. You can retry or return to your dashboard.
        </p>

        {/* Optional tracking info */}
        {trackingId && (
          <p className="text-gray-800 font-medium mb-4">
            <span className="font-semibold">Tracking ID:</span> {trackingId}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/dashboard/my-applicatioin")}
            className="px-6 py-3 w-full bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
          >
            Go to My Applications
          </button>
          {/* <button
            onClick={() => navigate("/dashboard/retry-payment")}
            className="px-6 py-3 w-full bg-gray-200 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-300 transition"
          >
            Retry Payment
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      const handlePaymentSuccess = async () => {
        try {
          const res = await axiosSecure.patch(
            `/payment-success?session_id=${sessionId}`
          );
          setSuccessData(res.data);
        } catch (err) {
          console.error("Payment Success Error:", err);
          setError("Failed to process payment status.");
        } finally {
          setLoading(false);
        }
      };
      handlePaymentSuccess();
    } else {
      setLoading(false);
      setError("No session ID found.");
    }
  }, [sessionId, axiosSecure, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Processing payment... Please do not refresh.
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow">
          ❌ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center border-t-4 border-green-500">

        {/* Success icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl">
            ✓
          </div>
        </div>

        <h2 className="text-3xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h2>

        <p className="text-gray-700 mb-4">
          Your payment has been successfully processed.
        </p>

        {/* Display transaction info */}
        {successData?.transactionId && (
          <p className="text-gray-800 font-medium mb-1">
            <span className="font-semibold">Transaction ID:</span>{" "}
            {successData.transactionId}
          </p>
        )}

        {successData?.trackingId && (
          <p className="text-gray-800 font-medium">
            <span className="font-semibold">Tracking ID:</span>{" "}
            {successData.trackingId}
          </p>
        )}

        {/* Button */}
        <button
          onClick={() => navigate("/dashboard/my-applicatioin")}
          className="mt-6 px-6 py-3 w-full btn-primary btn text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

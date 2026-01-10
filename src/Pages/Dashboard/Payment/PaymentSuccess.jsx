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
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Processing payment... Please do not refresh.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950 px-4">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-8 py-6 rounded-2xl shadow-lg border border-red-200 dark:border-red-800/50 max-w-md w-full text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <h2 className="text-xl font-bold mb-1">Payment Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate("/")}
            className="mt-4 text-sm font-semibold underline hover:text-red-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-[2.5rem] p-8 md:p-12 max-w-md w-full text-center border-t-8 border-green-500 transition-all transform hover:scale-[1.01]">

        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-5xl shadow-inner">
            ✓
          </div>
        </div>

        <h2 className="text-3xl font-black text-green-600 dark:text-green-500 mb-3 tracking-tight">
          Payment Successful!
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">
          Your payment has been successfully processed and your application is now active.
        </p>

        {/* Display transaction info */}
        <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 mb-8">
          {successData?.transactionId && (
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Transaction ID</span>
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm break-all">
                {successData.transactionId}
              </p>
            </div>
          )}

          {successData?.trackingId && (
            <div className="flex flex-col items-center pt-3 border-t dark:border-gray-700 w-full">
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Tracking ID</span>
              <p className="text-gray-800 dark:text-gray-200 font-bold">
                {successData.trackingId}
              </p>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/dashboard/my-applicatioin")}
          className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-lg shadow-green-500/20 transition-all active:scale-95"
        >
          View My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
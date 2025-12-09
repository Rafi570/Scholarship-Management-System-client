import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router"; // Use 'react-router-dom' for the hooks
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);
  
  // Get the session ID from the URL query
  const sessionId = searchParams.get("session_id"); 
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Only run the payment processing if we have a session ID
    if (sessionId) {
      const handlePaymentSuccess = async () => {
        try {
          // Call the server-side endpoint with the sessionId
          const res = await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
          
          if (res.data.success) {
              // 1. PAYMENT SUCCESSFUL (Server updated the database)
              setSuccessData(res.data);
              
          } else {
              // 2. PAYMENT FAILED/NOT PAID (Server returned success: false)
              console.warn("Payment status not paid or already processed. Redirecting to cancellation page.");
              
              // *** THE FIX: NAVIGATE TO THE CANCELLATION ROUTE ***
              // This is the client-side redirect command.
              navigate('/dashboard/payment-cancelled'); 
              
              // Set loading to false and return immediately as we are navigating away
              setLoading(false);
              return; 
          }

        } catch (err) {
          // 3. SERVER ERROR (e.g., 500 error from a crash)
          console.error("Payment Success Error:", err);
          setError("Failed to process payment status. Check server console for details.");
        } finally {
          // Only set loading to false here if we haven't already navigated away
          if (loading) {
              setLoading(false);
          }
        }
      };

      handlePaymentSuccess();
    } else {
      setLoading(false);
      setError("No session ID found.");
    }
  }, [sessionId, axiosSecure, navigate]); // Added 'navigate' to dependencies

  // --- RENDERING LOGIC ---

  if (loading) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl">Processing payment... Please do not refresh.</h2>
        <p className="text-sm text-gray-500 mt-2">Connecting to payment gateway for status confirmation.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-100 text-red-700 border border-red-400 rounded-lg">
        <h2 className="text-2xl font-bold">❌ Error: Payment Status Failed</h2>
        <p className="mt-2">{error}</p>
        <button 
          onClick={() => navigate('/dashboard/my-applications')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Go to My Applications
        </button>
      </div>
    );
  }
  
  // Display success message
  return (
    <div className="p-8 bg-green-50 border border-green-300 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        ✅ Payment Successful!
      </h2>
      <p className="text-lg mb-4">
        Your payment for the application has been processed successfully.
      </p>
      
      {successData?.transactionId && (
        <p className="font-semibold mt-2">
          **Transaction ID:** <span className="text-gray-800">{successData.transactionId}</span>
        </p>
      )}
      {successData?.trackingId && (
        <p className="font-semibold">
          **Tracking ID:** <span className="text-gray-800">{successData.trackingId}</span>
        </p>
      )}
      
      <button 
        onClick={() => navigate('/dashboard/my-applications')}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Go to My Applications
      </button>
    </div>
  );
};

export default PaymentSuccess;
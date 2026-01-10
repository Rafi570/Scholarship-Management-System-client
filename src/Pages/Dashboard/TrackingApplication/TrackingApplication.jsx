import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PRIMARY_COLOR = "#35AC86";

const statusLabels = {
  "apply_created": "Application Created",
  "apply-approved": "Application Approved",
  "paid": "Payment Completed",
};

const TrackingApplication = () => {
  const { trackingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        const res = await axiosSecure.get(`/trackings/${trackingId}`);
        setTimeline(res.data);
      } catch (err) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    loadTimeline();
  }, [trackingId]);

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center text-xl dark:text-gray-300">
        Loading...
      </div>
    );

  if (!timeline || timeline.length === 0)
    return (
      <div className="h-[60vh] flex items-center justify-center text-xl text-red-500">
        No Tracking Information Found
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-5 min-h-screen bg-transparent transition-colors duration-300">
      {/* Header - Design remains same, text stays white */}
      <div
        className="p-5 rounded-xl shadow-lg text-white mb-6"
        style={{ backgroundColor: PRIMARY_COLOR }}
      >
        <h1 className="text-2xl font-bold">Tracking Status</h1>
        <p className="opacity-90 text-sm mt-1">Tracking ID: {trackingId}</p>
      </div>

      {/* Timeline Section */}
      {/* Added dark:bg-gray-900 and dark:border-gray-800 */}
      <div className="bg-white dark:bg-gray-900 p-5 shadow-md rounded-xl border border-transparent dark:border-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Progress Timeline</h2>

        {/* Timeline Line - dark:border-gray-700 */}
        <div className="relative border-l-2 border-gray-300 dark:border-gray-700 ml-3">
          {timeline.map((item, index) => (
            <div key={index} className="mb-6 ml-6 relative">
              {/* Dot - Logic remains same, dark optimized */}
              <span
                className="w-4 h-4 absolute -left-[27px] top-1 rounded-full border-2"
                style={{
                  borderColor: PRIMARY_COLOR,
                  backgroundColor:
                    index === timeline.length - 1 ? PRIMARY_COLOR : 
                    (document.documentElement.classList.contains('dark') ? "#111827" : "white"),
                }}
              ></span>

              {/* Status Title */}
              <h3
                className="text-lg font-semibold"
                style={{ color: PRIMARY_COLOR }}
              >
                {statusLabels[item.status] || item.status}
              </h3>

              {/* Details Text - dark:text-gray-400 */}
              <p className="text-gray-600 dark:text-gray-400">{item.details}</p>

              {/* Date Text - dark:text-gray-500 */}
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                {new Date(item.createdAt || item.paidAt).toLocaleString()}
              </p>

              {/* Payment Card - Dark Optimized Colors */}
              {item.paymentStatus === "paid" && (
                <div className="mt-3 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 p-3 rounded-lg text-gray-800 dark:text-gray-200">
                  <p>
                    <strong>Amount:</strong> ${item.amount}
                  </p>
                  <p>
                    <strong>Transaction:</strong> {item.transactionId}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600 dark:text-green-400 font-semibold uppercase">
                      {item.paymentStatus}
                    </span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingApplication;
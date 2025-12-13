import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const PRIMARY_COLOR = "#35AC86";

const statusLabels = {
  "apply_created": "Application Created",
  "apply-approved": "Application Approved",
  "paid": "Payment Completed",
};

const TrackingApplication = () => {
  const { trackingId } = useParams();
  // console.log(trackingId)
  const axiosSecure = useAxiosSecure();

  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        const res = await axiosSecure.get(`/trackings/${trackingId}`);
        // console.log(res.data)
        setTimeline(res.data);
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadTimeline();
  }, [trackingId]);

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center text-xl">
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
    <div className="max-w-3xl mx-auto p-5">
      {/* Header */}
      <div
        className="p-5 rounded-xl shadow text-white mb-6"
        style={{ backgroundColor: PRIMARY_COLOR }}
      >
        <h1 className="text-2xl font-bold">Tracking Status</h1>
        <p className="opacity-90 text-sm mt-1">Tracking ID: {trackingId}</p>
      </div>

      {/* Timeline Section */}
      <div className="bg-white p-5 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Progress Timeline</h2>

        <div className="relative border-l-2 border-gray-300 ml-3">
          {timeline.map((item, index) => (
            <div key={index} className="mb-6 ml-6 relative">
              {/* Dot */}
              <span
                className="w-4 h-4 absolute -left-[27px] top-1 rounded-full border-2"
                style={{
                  borderColor: PRIMARY_COLOR,
                  backgroundColor:
                    index === timeline.length - 1 ? PRIMARY_COLOR : "white",
                }}
              ></span>

              {/* Content */}
              <h3
                className="text-lg font-semibold"
                style={{ color: PRIMARY_COLOR }}
              >
                {statusLabels[item.status] || item.status}
              </h3>

              <p className="text-gray-600">{item.details}</p>

              <p className="text-sm text-gray-400 mt-1">
                {new Date(item.createdAt || item.paidAt).toLocaleString()}
              </p>

              {/* Payment Card */}
              {item.paymentStatus === "paid" && (
                <div className="mt-3 bg-green-50 border border-green-300 p-3 rounded-lg">
                  <p>
                    <strong>Amount:</strong> ${item.amount}
                  </p>
                  <p>
                    <strong>Transaction:</strong> {item.transactionId}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600 font-semibold uppercase">
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

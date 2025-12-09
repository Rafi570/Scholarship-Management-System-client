import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";

const PRIMARY_COLOR = "#35AC86";

const ManagedStudentApplied = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // GET all pending applications
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPendingApps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application?status=pending");
      return res.data.data || [];
    },
  });

  const handleAction = async (id, action) => {
    try {
      const app = applications.find((a) => a._id === id);
      console.log(app)
      const res = await axiosSecure.patch(`/rolemoderator/${id}`, {
        action,
        feedback: "",
        trackingId: app.trackingId
      });

      toast.success(
        `Application ${action === "approved" ? "Approved" : "Cancelled"}`
      );
      refetch();
      console.log("Action Result:", res.data);
    } catch (error) {
      toast.error("Failed to update");
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Manage{" "}
        <span style={{ color: PRIMARY_COLOR }}>Applied Applications</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Applicant Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">University</th>
              <th className="px-4 py-2 text-left">Feedback</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{app.userName}</td>
                <td className="px-4 py-2">{app.userEmail}</td>
                <td className="px-4 py-2">{app.universityName}</td>
                <td className="px-4 py-2">{app.feedback || "No Feedback"}</td>
                <td className="px-4 py-2 capitalize">
                  {app.applicationStatus}
                </td>
                <td className="px-4 py-2 capitalize">{app.paymentStatus}</td>

                <td className="px-4 py-2">
                  <select
                    className="border p-1 rounded"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAction(app._id, e.target.value);
                      }
                    }}
                  >
                    <option value="">Select</option>
                    <option value="approved">Approve</option>
                    <option value="cancel">Cancel</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <p className="text-center py-8 text-gray-500">
            No pending applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManagedStudentApplied;

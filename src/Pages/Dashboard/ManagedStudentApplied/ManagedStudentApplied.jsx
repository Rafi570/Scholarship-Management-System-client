import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";

const PRIMARY_COLOR = "#35AC86";

// ================= CUSTOM MODAL =================
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-gray-900 dark:text-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative overflow-y-auto max-h-[90vh] border dark:border-gray-800">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-full transition"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

const ManageStudentApplied = () => {
  const axiosSecure = useAxiosSecure();
  const [modal, setModal] = useState({ feedback: false, details: false });
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["allPendingApps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application?status=pending");
      return res.data.data || [];
    },
  });

  const openDetailsModal = (app) => {
    setSelectedApp(app);
    setModal((prev) => ({ ...prev, details: true }));
  };

  const openFeedbackModal = (app) => {
    setSelectedApp(app);
    setFeedbackText(app.feedback || "");
    setModal((prev) => ({ ...prev, feedback: true }));
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) return toast.error("Feedback cannot be empty");
    try {
      await axiosSecure.patch(`/application/feedback/${selectedApp._id}`, { feedback: feedbackText });
      toast.success("Feedback submitted!");
      setModal((prev) => ({ ...prev, feedback: false }));
      refetch();
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };

  const handleAction = async (id, action) => {
    try {
      const app = applications.find((a) => a._id === id);
      await axiosSecure.patch(`/rolemoderator/${id}`, {
        action,
        feedback: app.feedback || "",
        trackingId: app.trackingId,
      });
      toast.success(`Application ${action === "approved" ? "Approved" : "Cancelled"}`);
      refetch();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        Manage <span style={{ color: PRIMARY_COLOR }}>Applications</span>
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg border dark:border-gray-800">
        <table className="min-w-full table-auto">
          {/* Table Head - Exactly like AllReview */}
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">Applicant</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">University</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">Status</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">Payment</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">Action</th>
            </tr>
          </thead>

          {/* Table Body - Exactly like AllReview */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400 dark:text-gray-500 text-lg">
                  No pending applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition duration-150">
                  <td className="px-6 py-4">
                    <div className="text-gray-800 dark:text-gray-200 font-medium">{app.userName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{app.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    {app.universityName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-yellow-600 dark:text-yellow-500 font-semibold capitalize">
                      {app.applicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold capitalize ${app.paymentStatus === 'unpaid' ? 'text-red-500' : 'text-green-600 dark:text-green-500'}`}>
                      {app.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => openDetailsModal(app)}
                      className="px-3 py-1 text-sm rounded shadow text-white bg-purple-600 hover:bg-purple-700 transition"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => openFeedbackModal(app)}
                      className="px-3 py-1 text-sm rounded shadow text-white bg-blue-500 hover:bg-blue-600 transition"
                    >
                      Feedback
                    </button>
                    <select
                      className="border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-1 rounded text-sm outline-none"
                      onChange={(e) => e.target.value && handleAction(app._id, e.target.value)}
                      value=""
                    >
                      <option value="" disabled>Action</option>
                      <option value="approved">Approve</option>
                      <option value="cancel">Cancel</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= DETAILS MODAL ================= */}
      {modal.details && selectedApp && (
        <Modal onClose={() => setModal({ ...modal, details: false })}>
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: PRIMARY_COLOR }}>
            Application Details
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-bold">Name:</span> {selectedApp.userName}</p>
            <p><span className="font-bold">Email:</span> {selectedApp.userEmail}</p>
            <p><span className="font-bold">University:</span> {selectedApp.universityName}</p>
            <p><span className="font-bold">Scholarship:</span> {selectedApp.scholarshipName}</p>
            <p><span className="font-bold">Status:</span> {selectedApp.applicationStatus}</p>
            <p><span className="font-bold">Payment:</span> {selectedApp.paymentStatus}</p>
            <p className="mt-4 pt-4 border-t dark:border-gray-700">
              <span className="font-bold">Feedback:</span> {selectedApp.feedback || "No feedback yet"}
            </p>
          </div>
        </Modal>
      )}

      {/* ================= FEEDBACK MODAL ================= */}
      {modal.feedback && selectedApp && (
        <Modal onClose={() => setModal({ ...modal, feedback: false })}>
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: PRIMARY_COLOR }}>
            Give Feedback
          </h3>
          <textarea
            rows="4"
            className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded mb-3 outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Enter feedback..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <button
            onClick={handleSubmitFeedback}
            className="w-full py-2 rounded text-white font-bold transition"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Submit Feedback
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ManageStudentApplied;
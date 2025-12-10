import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";

const PRIMARY_COLOR = "#35AC86";

// ================= CUSTOM MODAL =================
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-2xl relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:bg-gray-200 p-2 rounded-full transition"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

const ManageStudentApplied = () => {
  const axiosSecure = useAxiosSecure();

  const [modal, setModal] = useState({
    feedback: false,
    details: false,
  });

  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // ================= FETCH PENDING APPLICATIONS =================
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

  // =============== OPEN DETAILS MODAL ===============
  const openDetailsModal = (app) => {
    setSelectedApp(app);
    setModal((prev) => ({ ...prev, details: true }));
  };
  const closeDetailsModal = () =>
    setModal((prev) => ({ ...prev, details: false }));

  // ================= MODAL FEEDBACK =================
  const openFeedbackModal = (app) => {
    setSelectedApp(app);
    setFeedbackText(app.feedback || "");
    setModal((prev) => ({ ...prev, feedback: true }));
  };

  const closeFeedbackModal = () =>
    setModal((prev) => ({ ...prev, feedback: false }));

  // ================= FEEDBACK SUBMIT =================
  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) {
      toast.error("Feedback cannot be empty");
      return;
    }
    try {
      await axiosSecure.patch(`/application/feedback/${selectedApp._id}`, {
        feedback: feedbackText,
      });
      toast.success("Feedback submitted successfully!");
      closeFeedbackModal();
      refetch();
    } catch (error) {
      toast.error("Failed to submit feedback");
      console.error(error);
    }
  };

  // ================= APPROVE / CANCEL =================
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
      toast.error("Failed to update");
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Manage <span style={{ color: PRIMARY_COLOR }}>Applied Applications</span>
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
            {applications.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  No pending applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{app.userName}</td>
                  <td className="px-4 py-2">{app.userEmail}</td>
                  <td className="px-4 py-2">{app.universityName}</td>
                  <td className="px-4 py-2">
                    {app.feedback?.trim() ? app.feedback : "No Feedback"}
                  </td>
                  <td className="px-4 py-2 capitalize">{app.applicationStatus}</td>

                  {/* PAYMENT STATUS */}
                  <td className="px-4 py-2">
                    {app.paymentStatus}
                  </td>

                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    {/* DETAILS BUTTON */}
                    <button
                      className="px-3 py-1 rounded text-white bg-purple-600 hover:bg-purple-700"
                      onClick={() => openDetailsModal(app)}
                    >
                      Details
                    </button>

                    {/* Feedback */}
                    <button
                      className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600"
                      onClick={() => openFeedbackModal(app)}
                    >
                      Feedback
                    </button>

                    {/* Approve / Cancel */}
                    <select
                      className="border p-1 rounded"
                      onChange={(e) => {
                        if (e.target.value) handleAction(app._id, e.target.value);
                      }}
                    >
                      <option value="">Select</option>
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
        <Modal onClose={closeDetailsModal}>
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: PRIMARY_COLOR }}>
            Application Details
          </h3>

          <div className="space-y-2">
            <p><strong>Name:</strong> {selectedApp.userName}</p>
            <p><strong>Email:</strong> {selectedApp.userEmail}</p>
            <p><strong>University:</strong> {selectedApp.universityName}</p>
            <p><strong>Scholarship Name:</strong> {selectedApp.scholarshipName}</p>
            <p><strong>Application Status:</strong> {selectedApp.applicationStatus}</p>
            <p><strong>Payment Status:</strong> {selectedApp.paymentStatus ? "Paid" : "Unpaid"}</p>
            <p><strong>Feedback:</strong> {selectedApp.feedback || "No feedback yet"}</p>
          </div>
        </Modal>
      )}

      {/* ================= FEEDBACK MODAL ================= */}
      {modal.feedback && selectedApp && (
        <Modal onClose={closeFeedbackModal}>
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: PRIMARY_COLOR }}>
            Give Feedback
          </h3>
          <textarea
            rows="4"
            className="w-full border p-2 rounded mb-3"
            placeholder="Enter feedback..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <button
            onClick={handleSubmitFeedback}
            className="w-full py-2 rounded text-white"
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

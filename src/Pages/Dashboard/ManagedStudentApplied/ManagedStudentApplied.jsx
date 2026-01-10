import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import { FiEye, FiMessageSquare, FiMoreHorizontal } from "react-icons/fi";

const PRIMARY_COLOR = "#35AC86";

// ================= CUSTOM MODAL (Optimized for Dark Mode) =================
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-gray-900 dark:text-white w-full max-w-2xl rounded-[2rem] p-8 shadow-2xl relative animate-fade-in overflow-y-auto max-h-[90vh] border border-transparent dark:border-gray-800">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-gray-100 dark:bg-gray-800 p-2 rounded-full transition-all"
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
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
            Manage <span style={{ color: PRIMARY_COLOR }}>Applications</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Review and process student scholarship requests.</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-800/50">
           <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{applications.length} Pending Requests</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-sm rounded-[2rem] border border-gray-100 dark:border-gray-800">
        <table className="min-w-full">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50">
            <tr>
              {["Applicant", "University", "Status", "Payment", "Actions"].map((head) => (
                <th key={head} className="px-6 py-5 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-20 text-gray-400 text-lg">No pending applications found.</td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition duration-150 group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-800 dark:text-gray-100">{app.userName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{app.userEmail}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{app.universityName}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 text-[10px] font-black uppercase rounded-full">
                      {app.applicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-xs font-bold ${app.paymentStatus === 'unpaid' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {app.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openDetailsModal(app)} className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-600 hover:text-white transition-all shadow-sm" title="Details">
                        <FiEye size={18} />
                      </button>
                      <button onClick={() => openFeedbackModal(app)} className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm" title="Feedback">
                        <FiMessageSquare size={18} />
                      </button>
                      <select
                        className="bg-gray-50 dark:bg-gray-800 border-none text-xs font-bold rounded-xl px-2 py-2 outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 dark:text-gray-300 cursor-pointer shadow-sm"
                        onChange={(e) => e.target.value && handleAction(app._id, e.target.value)}
                        value=""
                      >
                        <option value="" disabled>Action</option>
                        <option value="approved">Approve</option>
                        <option value="cancel">Cancel</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {modal.details && selectedApp && (
        <Modal onClose={() => setModal({ ...modal, details: false })}>
          <h3 className="text-2xl font-black mb-6 text-gray-800 dark:text-white">Applicant Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl">
            {[
              { label: "Full Name", val: selectedApp.userName },
              { label: "Email Address", val: selectedApp.userEmail },
              { label: "University", val: selectedApp.universityName },
              { label: "Scholarship", val: selectedApp.scholarshipName },
              { label: "Status", val: selectedApp.applicationStatus },
              { label: "Payment", val: selectedApp.paymentStatus },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">{item.label}</p>
                <p className="font-bold text-gray-700 dark:text-gray-200">{item.val}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 rounded-r-2xl">
            <p className="text-[10px] uppercase font-black text-emerald-600 mb-1 tracking-widest">Feedback History</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{selectedApp.feedback || "No feedback recorded."}"</p>
          </div>
        </Modal>
      )}

      {modal.feedback && selectedApp && (
        <Modal onClose={() => setModal({ ...modal, feedback: false })}>
          <h3 className="text-2xl font-black mb-2 text-gray-800 dark:text-white">Response Feedback</h3>
          <p className="text-gray-500 text-sm mb-6">Inform the student about their application status.</p>
          <textarea
            rows="5"
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] p-4 outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 dark:text-gray-200 transition-all shadow-inner"
            placeholder="Type your feedback here..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <button
            onClick={handleSubmitFeedback}
            className="w-full mt-6 py-4 rounded-[1.5rem] text-white font-black uppercase tracking-widest text-sm shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Submit Response
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ManageStudentApplied;
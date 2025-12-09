import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const PRIMARY_COLOR = "#35AC86";

// ================= CUSTOM MODAL =================
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-2xl relative animate-fade-in overflow-y-auto max-h-[90vh]">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:bg-gray-200 p-2 rounded-full transition duration-150"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedApp, setSelectedApp] = useState(null);
  const [modal, setModal] = useState({
    details: false,
    edit: false,
    // Note: Delete modal is not needed as Swal is used for confirmation, but
    // I'll keep the delete logic for now, though it's not strictly a modal.
    pay: false,
    review: false,
  });
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [editDegree, setEditDegree] = useState("");
  const [editCategory, setEditCategory] = useState("");

  // ================= FETCH APPLICATIONS =================
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/application?email=${user.email}`);
      return res.data.data || [];
    },
  });

  const openModal = (type, app) => {
    setSelectedApp(app);
    if (type === "edit") {
      setEditDegree(app.degree || "");
      setEditCategory(app.scholarshipCategory || "");
    }
    setModal((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => setModal((prev) => ({ ...prev, [type]: false }));

  // Moved delete logic to a confirmation function
  const handleDeleteConfirmation = (app) => {
    setSelectedApp(app);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: PRIMARY_COLOR,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(app._id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/application/${id}`);
      toast.success("Application deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handlePayment = async () => {
    try {
      const res = await axiosSecure.post("/payment-checkout-session", {
        _id: selectedApp._id,
        scholarshipId: selectedApp.scholarshipId,
        scholarshipName: selectedApp.scholarshipName,
        universityName: selectedApp.universityName,
        postedUserEmail: user.email,
        userName: user.displayName,
        userEmail: user.email,
        degree: selectedApp.degree,
        scholarshipCategory: selectedApp.scholarshipCategory,
        applicationFees: selectedApp.applicationFees,
        serviceCharge: selectedApp.serviceCharge,
        trackingId: selectedApp.trackingId,
      });

      window.location.assign(res.data.url);
    } catch (error) {
      toast.error("Payment initialization failed");
    }
  };

  const handleEdit = async () => {
    try {
      await axiosSecure.patch(`/application/${selectedApp._id}`, {
        degree: editDegree,
        scholarshipCategory: editCategory,
      });
      toast.success("Updated successfully");
      closeModal("edit");
      refetch();
    } catch {
      toast.error("Failed to update");
    }
  };
  const handleAddReview = async () => {
    if (!reviewText.trim()) {
      toast.error("Review text cannot be empty.");
      return;
    }

    try {
      await axiosSecure.post("/review", {
        scholarshipId: selectedApp.scholarshipId,
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL || "",
        universityName: selectedApp.universityName,
        scholarshipName: selectedApp.scholarshipName,
        rating,
        reviewText,
      });
      // Optionally update the application status to 'reviewed' or similar if the backend supports it,
      // but for now, we only post the review.
      toast.success("Review posted 🎉");
      closeModal("review");
      setRating(5);
      setReviewText("");
    } catch {
      toast.error("Failed to post review");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My <span style={{ color: PRIMARY_COLOR }}>Applications</span>
      </h2>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                University
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Tracking ID
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Payment
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-400 text-lg"
                >
                  No applications yet.
                </td>
              </tr>
            ) : (
              applications.map((app, index) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{app.universityName}</td>
                  <Link to='#'>
                    <td className="px-4 py-2">{app.trackingId}</td>
                  </Link>
                  <td
                    className={`px-4 py-2 font-semibold capitalize ${
                      app.applicationStatus === "pending"
                        ? "text-yellow-600"
                        : app.applicationStatus === "cancelled"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {app.applicationStatus}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold capitalize ${
                      app.paymentStatus === "unpaid"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {app.paymentStatus}
                  </td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    {/* Always show Details */}
                    <button
                      className="px-3 py-1 rounded text-white"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                      onClick={() => openModal("details", app)}
                    >
                      Details
                    </button>

                    {/* Pending: Edit & Delete */}
                    {app.applicationStatus === "pending" && (
                      <>
                        <button
                          className="px-3 py-1 rounded text-white bg-yellow-500 hover:bg-yellow-600"
                          onClick={() => openModal("edit", app)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600"
                          onClick={() => handleDeleteConfirmation(app)} // Using confirmation
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {/* Apply Approved: Show Pay button */}
                    {app.applicationStatus === "approved" &&
                      app.paymentStatus === "unpaid" && (
                        <button
                          className="px-3 py-1 rounded text-white bg-green-500 hover:bg-green-600"
                          onClick={() => openModal("pay", app)}
                        >
                          Pay Now
                        </button>
                      )}

                    {/* Apply Cancelled: Show Cancelled/Re-apply info button */}
                    {app.applicationStatus === "rejected" && (
                      <button
                        className="px-3 py-1 rounded text-white bg-red-600"
                        onClick={() =>
                          Swal.fire({
                            title: "Application Cancelled",
                            text: "You can reapply in the application section.",
                            icon: "info",
                            confirmButtonText: "Go to Apply",
                          }).then(() => {
                            window.location.href = "/scholarships";
                          })
                        }
                      >
                        Cancelled
                      </button>
                    )}

                    {/* Completed: Add Review */}
                    {app.applicationStatus === "completed" && (
                      <button
                        className="px-3 py-1 rounded text-white"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        onClick={() => openModal("review", app)}
                      >
                        Add Review
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODALS (Keep existing modals) ================= */}
      {modal.details && selectedApp && (
        <Modal onClose={() => closeModal("details")}>
          <h3
            className="text-xl font-bold mb-4 text-center"
            style={{ color: PRIMARY_COLOR }}
          >
            {selectedApp.scholarshipName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-gray-700">
            <p>
              <strong>University:</strong> {selectedApp.universityName}
            </p>
            <p>
              <strong>Tracking ID:</strong> {selectedApp.trackingId || "N/A"}
            </p>
            <p>
              <strong>Category:</strong> {selectedApp.scholarshipCategory}
            </p>
            <p>
              <strong>Degree:</strong> {selectedApp.degree}
            </p>
            <p>
              <strong>Application Fee:</strong> ${selectedApp.applicationFees}
            </p>
            <p>
              <strong>Service Charge:</strong> ${selectedApp.serviceCharge}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize font-semibold">
                {selectedApp.applicationStatus}
              </span>
            </p>
            <p>
              <strong>Payment:</strong>{" "}
              <span className="capitalize font-semibold">
                {selectedApp.paymentStatus}
              </span>
            </p>
          </div>
        </Modal>
      )}

      {modal.edit && selectedApp && (
        <Modal onClose={() => closeModal("edit")}>
          <h3 className="text-xl font-bold mb-4 text-center text-yellow-600">
            Edit Application
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label>Degree</label>
              <input
                key="edit-degree"
                value={editDegree}
                onChange={(e) => setEditDegree(e.target.value)}
                className="border p-2 rounded focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex flex-col">
              <label>Category</label>
              <input
                key="edit-category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="border p-2 rounded focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="md:col-span-2">
              <button
                onClick={handleEdit}
                className="w-full py-2 rounded text-white"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {modal.pay && selectedApp && (
        <Modal onClose={() => closeModal("pay")}>
          <h3 className="text-xl font-bold mb-4 text-center text-green-600">
            Payment
          </h3>
          <p className="text-center mb-4">
            Total:{" "}
            <span className="font-bold">
              ${selectedApp.applicationFees + selectedApp.serviceCharge}
            </span>
          </p>
          <button
            onClick={handlePayment}
            className="w-full py-2 text-white rounded"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Pay Now
          </button>
        </Modal>
      )}

      {modal.review && selectedApp && (
        <Modal onClose={() => closeModal("review")}>
          <h3
            className="text-xl font-bold mb-4 text-center"
            style={{ color: PRIMARY_COLOR }}
          >
            Add Review
          </h3>
          <textarea
            rows="4"
            className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-green-500"
            placeholder="Share your experience..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <select
            className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-green-500"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} {r > 1 ? "Stars" : "Star"}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddReview}
            className="w-full py-2 rounded text-white"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Submit Review
          </button>
        </Modal>
      )}
    </div>
  );
};

export default MyApplication;

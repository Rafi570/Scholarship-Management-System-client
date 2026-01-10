import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PRIMARY_COLOR = "#35AC86";

const MyReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0);

  // Helper to check dark mode status
  const isDarkMode = () => document.documentElement.classList.contains("dark");

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["my-Review", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/review?email=${user.email}`);
      return res.data;
    },
  });

  const handleEdit = (review) => {
    setCurrentReview(review);
    setUpdatedText(review.reviewText);
    setUpdatedRating(review.rating);
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axiosSecure.patch(`/review/${currentReview._id}`, {
        reviewText: updatedText,
        rating: updatedRating,
      });

      // Dark mode optimized alert
      Swal.fire({
        title: "Updated!",
        text: "Your review has been updated.",
        icon: "success",
        background: isDarkMode() ? "#111827" : "#fff",
        color: isDarkMode() ? "#fff" : "#000",
        confirmButtonColor: PRIMARY_COLOR,
      });

      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update review.",
        icon: "error",
        background: isDarkMode() ? "#111827" : "#fff",
        color: isDarkMode() ? "#fff" : "#000",
      });
    }
  };

  const handleDelete = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_COLOR,
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      // Dark mode optimized alert
      background: isDarkMode() ? "#111827" : "#fff",
      color: isDarkMode() ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/review/${reviewId}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
            background: isDarkMode() ? "#111827" : "#fff",
            color: isDarkMode() ? "#fff" : "#000",
            confirmButtonColor: PRIMARY_COLOR,
          });
          refetch();
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete review.",
            icon: "error",
            background: isDarkMode() ? "#111827" : "#fff",
            color: isDarkMode() ? "#fff" : "#000",
          });
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-transparent">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        My <span style={{ color: PRIMARY_COLOR }}>Reviews</span>
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg border border-transparent dark:border-gray-800">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">#</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">University Name</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">Review Comment</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">Review Date</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">Rating</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400 dark:text-gray-500 text-lg">
                  You haven't written any reviews yet.
                </td>
              </tr>
            ) : (
              reviews.map((review, index) => (
                <tr key={review._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition duration-150">
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{review.universityName}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{review.reviewText}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{new Date(review.postedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{review.rating}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="px-3 py-1 text-sm rounded shadow text-white transition transform hover:scale-105"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="px-3 py-1 text-sm rounded shadow text-white bg-red-500 hover:bg-red-600 transition transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-fade-in transform transition-all scale-95 duration-300 ease-out">
            <h3 className="text-xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
              Edit Your Review
            </h3>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none transition"
              rows={4}
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <input
              type="number"
              min="1"
              max="5"
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={updatedRating}
              onChange={(e) => setUpdatedRating(Number(e.target.value))}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2 rounded-lg text-white transition transform hover:scale-105"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReview;
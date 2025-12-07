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
      Swal.fire("Updated!", "Your review has been updated.", "success");
      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update review.", "error");
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/review/${reviewId}`);
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
          refetch();
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete review.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2
        className="text-2xl font-bold mb-6 text-center"
        
      >
        My  <span style={{ color: PRIMARY_COLOR }} >Reviews</span>
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">#</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Scholarship Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">University Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Review Comment</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Review Date</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Rating</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400 text-lg">
                  You haven't written any reviews yet.
                </td>
              </tr>
            ) : (
              reviews.map((review, index) => (
                <tr key={review._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800">{review.scholarshipName}</td>
                  <td className="px-6 py-4 text-gray-800">{review.universityName}</td>
                  <td className="px-6 py-4 text-gray-800">{review.reviewText}</td>
                  <td className="px-6 py-4 text-gray-800">{new Date(review.postedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-800">{review.rating}</td>
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

      {/* Modern Animated Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-fade-in transform transition-all scale-95 duration-300 ease-out">
            <h3 className="text-xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
              Edit Your Review
            </h3>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none transition"
              rows={4}
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <input
              type="number"
              min="1"
              max="5"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={updatedRating}
              onChange={(e) => setUpdatedRating(Number(e.target.value))}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition transform hover:scale-105"
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

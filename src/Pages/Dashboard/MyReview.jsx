import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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

  // Open modal for edit
  const handleEdit = (review) => {
    setCurrentReview(review);
    setUpdatedText(review.reviewText);
    setUpdatedRating(review.rating);
    setModalOpen(true);
  };

  // Submit updated review
  const handleUpdate = async () => {
    try {
      await axiosSecure.put(`/review/${currentReview._id}`, {
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

  // Delete review
  const handleDelete = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Reviews</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Scholarship Name</th>
              <th className="px-4 py-2 border">University Name</th>
              <th className="px-4 py-2 border">Review Comment</th>
              <th className="px-4 py-2 border">Review Date</th>
              <th className="px-4 py-2 border">Rating</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No reviews found.
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{review.scholarshipName}</td>
                  <td className="px-4 py-2 border">{review.universityName}</td>
                  <td className="px-4 py-2 border">{review.reviewText}</td>
                  <td className="px-4 py-2 border">
                    {new Date(review.postedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{review.rating}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
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

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Review</h3>
            <textarea
              className="w-full border p-2 rounded mb-3"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <input
              type="number"
              min="1"
              max="5"
              className="w-full border p-2 rounded mb-3"
              value={updatedRating}
              onChange={(e) => setUpdatedRating(Number(e.target.value))}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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

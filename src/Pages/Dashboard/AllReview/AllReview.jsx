import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PRIMARY_COLOR = "#35AC86";

const AllReview = () => {
  const axiosSecure = useAxiosSecure();

  // Helper function to check for dark mode
  const isDarkMode = () => document.documentElement.classList.contains("dark");

  // FETCH ALL REVIEW
  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/review/role/modaretor");
      return res.data;
    },
  });

  // DELETE HANDLER
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_COLOR,
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      // Dark Alert Support
      background: isDarkMode() ? "#111827" : "#fff",
      color: isDarkMode() ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/role/modaretor/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Review has been deleted.",
            icon: "success",
            background: isDarkMode() ? "#111827" : "#fff",
            color: isDarkMode() ? "#fff" : "#000",
          });
          refetch();
        } catch (error) {
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

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        All <span style={{ color: PRIMARY_COLOR }}>Reviews</span>
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg border border-transparent dark:border-gray-800">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {[
                "#",
                "User Name",
                "University",
                "Review",
                "Rating",
                "Posted At",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {reviews.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-400 dark:text-gray-500 text-lg"
                >
                  No reviews available.
                </td>
              </tr>
            ) : (
              reviews.map((review, index) => (
                <tr
                  key={review._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition duration-150"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">
                    {review.userName}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    {review.universityName}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-400 text-sm max-w-xs truncate">
                    {review.reviewText}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-yellow-500 font-bold">
                      {review.rating} ★
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-400 text-sm">
                    {new Date(review.postedAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
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
    </div>
  );
};

export default AllReview;